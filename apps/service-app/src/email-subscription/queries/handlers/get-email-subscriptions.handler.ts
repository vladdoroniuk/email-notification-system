import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from '@app/prisma/prisma.service';
import { GetEmailSubscriptionsQuery } from '..';
import { Subscription } from '@prisma/client';
import { PartialSubscription } from '../../types';

@QueryHandler(GetEmailSubscriptionsQuery)
export class GetEmailSubscriptionsHandler
  implements IQueryHandler<GetEmailSubscriptionsQuery>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(): Promise<PartialSubscription[]> {
    const existingSubscriptions = await this.prisma.subscription.findMany();
    const formattedSubscriptions = this.formatExistingSubscriptions(
      existingSubscriptions,
    );
    return formattedSubscriptions;
  }

  private formatExistingSubscriptions(
    existingSubscriptions: Subscription[],
  ): PartialSubscription[] {
    const formattedSubscriptions: PartialSubscription[] = [];

    for (const subscription of existingSubscriptions) {
      const { email, status, createdAt, deletedAt } = subscription;

      const formattedSubscription = {
        email,
        status,
        createdAt,
        deletedAt,
      };

      formattedSubscriptions.push(formattedSubscription);
    }

    return formattedSubscriptions;
  }
}
