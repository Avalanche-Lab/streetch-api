import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { collections } from '@/db/schema/v1/collection.schema';

export type CollectionModel = InferSelectModel<typeof collections>;
export type CreateCollectionModel = InferInsertModel<typeof collections>;


