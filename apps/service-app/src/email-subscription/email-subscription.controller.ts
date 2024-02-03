import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateEmailSubscriptionDto } from './dtos/create-email-subscription.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateEmailSubscriptionCommand } from './commands/create-email-subscription.command';

@Controller('emails')
export class EmailSubscriptionController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async createEmailSubscription(@Body() data: CreateEmailSubscriptionDto) {
    await this.commandBus.execute(new CreateEmailSubscriptionCommand(data));
  }
}
