import { CreateEmailSubscription } from '../interfaces';

export class CreateEmailSubscriptionCommand {
  constructor(public readonly data: CreateEmailSubscription) {}
}
