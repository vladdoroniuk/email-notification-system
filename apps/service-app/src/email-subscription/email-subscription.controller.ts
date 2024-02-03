import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateEmailSubscriptionDto } from './dtos';
import { EmailSubscriptonService } from './email-subscription.service';

@Controller('emails')
export class EmailSubscriptionController {
  constructor(
    private readonly emailSubscriptonService: EmailSubscriptonService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async createEmailSubscription(@Body() data: CreateEmailSubscriptionDto) {
    await this.emailSubscriptonService.createEmailSubscription(data);
  }
}
