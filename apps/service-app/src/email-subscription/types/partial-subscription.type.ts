import { $Enums } from '@prisma/client';

export type PartialSubscription = {
  email: string;
  status: $Enums.SubscriptionStatus;
  createdAt: Date;
  deletedAt: Date | null;
};
