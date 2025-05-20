import { z } from 'zod';
import { extendZodWithOpenApi } from 'zod-openapi';

extendZodWithOpenApi(z);

export const createCollectionSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(100),
    description: z.string().min(1).max(255),
    typeCollection: z.string().min(1).max(1),
    profileIcon: z.string().min(1).max(1024),
  }),
});

export type CreateCollectionInput = z.infer<typeof createCollectionSchema>['body'];