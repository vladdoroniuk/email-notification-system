import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from '@app/prisma/prisma.service';
import { GetEmailSubscriptionsQuery } from '..';
import { PartialSubscription } from '../../interfaces';

@QueryHandler(GetEmailSubscriptionsQuery)
export class GetEmailSubscriptionsHandler
  implements IQueryHandler<GetEmailSubscriptionsQuery>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(): Promise<PartialSubscription[]> {
    const existingSubscriptions = await this.prisma.subscription.findMany();
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
