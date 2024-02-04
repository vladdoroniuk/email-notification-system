import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateEmailSubscriptionDto, DeleteEmailSubscriptionDto } from './dtos';
import {
  CreateEmailSubscriptionCommand,
  DeleteEmailSubscriptionCommand,
} from './commands';
import { GetEmailSubscriptionsQuery } from './queries';

@Controller('emails')
export class EmailSubscriptionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBys: QueryBus,
  ) {}

  @Get()
  async getEmailSubscriptions() {
    return this.queryBys.execute(new GetEmailSubscriptionsQuery());
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async createEmailSubscription(@Body() data: CreateEmailSubscriptionDto) {
    await this.commandBus.execute(new CreateEmailSubscriptionCommand(data));
  }

  @Delete()
  async deleteEmailSubscription(@Body() data: DeleteEmailSubscriptionDto) {
    await this.commandBus.execute(new DeleteEmailSubscriptionCommand(data));
  }
}
