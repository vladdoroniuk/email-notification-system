import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { DeleteEmailSubscription } from '../interfaces';

const DeleteEmailSubscriptionSchema = z
  .object({
    email: z.string().email(),
  })
  .required() satisfies z.ZodType<DeleteEmailSubscription>;

export class DeleteEmailSubscriptionDto extends createZodDto(
  DeleteEmailSubscriptionSchema,
) {}
