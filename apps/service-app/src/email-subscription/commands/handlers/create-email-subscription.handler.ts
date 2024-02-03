import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateEmailSubscriptionCommand } from '../create-email-subscription.command';
import { PrometheusService } from '@app/prometheus/prometheus.service';

@CommandHandler(CreateEmailSubscriptionCommand)
export class CreateEmailSubscriptionHandler
  implements ICommandHandler<CreateEmailSubscriptionCommand>
{
  constructor(private readonly prometheusService: PrometheusService) {}

  async execute(command: CreateEmailSubscriptionCommand): Promise<void> {
    const { data } = command;

    // prisma repo

    this.prometheusService.increaseSubscribeEmailCounter();
  }
}
