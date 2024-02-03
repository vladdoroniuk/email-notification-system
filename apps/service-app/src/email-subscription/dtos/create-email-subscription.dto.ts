import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { CreateEmailSubscription } from '../interfaces';

const CreateEmailSubscriptionSchema = z
  .object({
    email: z.string().email(),
  })
  .required() satisfies z.ZodType<CreateEmailSubscription>;

export class CreateEmailSubscriptionDto extends createZodDto(
  CreateEmailSubscriptionSchema,
) {}
