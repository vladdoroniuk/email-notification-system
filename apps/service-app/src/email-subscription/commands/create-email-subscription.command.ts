import { CreateEmailSubscription } from '../interfaces/create-email-subscription.interface';

export class CreateEmailSubscriptionCommand {
  constructor(public readonly data: CreateEmailSubscription) {}
}
