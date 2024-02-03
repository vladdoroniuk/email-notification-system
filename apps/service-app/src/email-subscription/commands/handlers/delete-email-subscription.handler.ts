import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrometheusService } from '@app/prometheus/prometheus.service';
import { PrismaService } from '@app/prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';
import { DeleteEmailSubscriptionCommand } from '..';

@CommandHandler(DeleteEmailSubscriptionCommand)
export class DeleteEmailSubscriptionHandler
  implements ICommandHandler<DeleteEmailSubscriptionCommand>
{
  constructor(
    private readonly prometheusService: PrometheusService,
    private readonly prisma: PrismaService,
  ) {}

  async execute(command: DeleteEmailSubscriptionCommand): Promise<void> {
    const { data: _data } = command;

    const existingSubscription = await this.prisma.subscription.findUnique({
      where: {
        email: _data.email,
      },
    });

    if (!existingSubscription) {
      throw new BadRequestException('E-mail not found');
    }

    await this.prisma.subscription.update({
      where: {
        email: _data.email,
      },
      data: {
        status: 'unsubscribed',
        deletedAt: new Date().toISOString(),
      },
    });

    this.prometheusService.increaseUnsubscribeEmailCounter();
    console.log(await this.prometheusService.getMetrics());
  }
}
