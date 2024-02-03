import { Body, Controller, Delete, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateEmailSubscriptionDto, DeleteEmailSubscriptionDto } from './dtos';
import {
  CreateEmailSubscriptionCommand,
  DeleteEmailSubscriptionCommand,
} from './commands';

@Controller('emails')
export class EmailSubscriptionController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createEmailSubscription(@Body() data: CreateEmailSubscriptionDto) {
    await this.commandBus.execute(new CreateEmailSubscriptionCommand(data));
  }

  @Delete()
  async deleteEmailSubscription(@Body() data: DeleteEmailSubscriptionDto) {
    await this.commandBus.execute(new DeleteEmailSubscriptionCommand(data));
  }
}
