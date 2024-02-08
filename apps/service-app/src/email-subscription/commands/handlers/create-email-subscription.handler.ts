import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrometheusService } from '@app/prometheus/prometheus.service';
import { PrismaService } from '@app/prisma/prisma.service';
import { ConflictException } from '@nestjs/common';
import { CreateEmailSubscriptionCommand } from '..';

@CommandHandler(CreateEmailSubscriptionCommand)
export class CreateEmailSubscriptionHandler
  implements ICommandHandler<CreateEmailSubscriptionCommand>
{
  constructor(
    private readonly prometheusService: PrometheusService,
    private readonly prisma: PrismaService,
  ) {}

  async execute(command: CreateEmailSubscriptionCommand) {
    const { data: _data } = command;

    const existingSubscription = await this.prisma.subscription.findUnique({
      where: {
        email: _data.email,
      },
    });

    if (existingSubscription) {
      throw new ConflictException('Email already exists');
    }

    await this.prisma.subscription.create({
      data: {
        email: _data.email,
      },
    });

    this.prometheusService.increaseSubscribeEmailCounter();
  }
}
