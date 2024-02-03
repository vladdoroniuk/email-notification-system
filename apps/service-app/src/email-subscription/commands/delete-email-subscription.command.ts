import { DeleteEmailSubscription } from '../interfaces';

export class DeleteEmailSubscriptionCommand {
  constructor(public readonly data: DeleteEmailSubscription) {}
}
