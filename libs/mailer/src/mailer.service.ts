import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private readonly transporter;

  constructor(private readonly configService: ConfigService) {
    const mailerOptions = {
      host: process.env.SMTP_HOST,
      port: +process.env.SMTP_PORT!,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    };

    this.transporter = nodemailer.createTransport(mailerOptions);
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: this.configService.get<string>('SMTP_USER'),
      to,
      subject,
      text,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
