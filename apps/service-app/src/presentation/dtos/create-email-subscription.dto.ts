import { CreateEmailSubscription } from 'libs/contracts';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateEmailSubscriptionSchema = z
  .object({
    email: z.string().email(),
  })
  .required() satisfies z.ZodType<CreateEmailSubscription>;

export class CreateEmailSubscriptionDto extends createZodDto(
  CreateEmailSubscriptionSchema,
) {}
