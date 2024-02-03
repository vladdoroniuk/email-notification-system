import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { CreateSubscription } from '../../shared/abstractions/create-subscription.interface';

const CreateSubscriptionSchema = z
  .object({
    email: z.string().email(),
  })
  .required() satisfies z.ZodType<CreateSubscription>;

export class CreateSubscriptionDto extends createZodDto(
  CreateSubscriptionSchema,
) {}
