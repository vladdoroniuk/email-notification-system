import { $Enums } from '@prisma/client';

export class PartialSubscription {
  email: string;
  status: $Enums.SubscriptionStatus;
  createdAt: Date;
  deletedAt: Date | null;
}
