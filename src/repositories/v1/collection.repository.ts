import { collections } from '@/db/schema/v1/collection.schema';
import { db } from '@/db/db.connection';
import { eq } from 'drizzle-orm';
import { ConflictError } from '@/utils/app-error.utils';
import { CreateCollectionModel, CollectionModel } from '@/types/models/v1/collection.types';

class CollectionRepository {
  async findById(id: number): Promise<CollectionModel | null> {
    const collection = await db
      .select()
      .from(collections)
      .where(eq(collections.id, id))
      .limit(1);

    return collection[0] || null;
  }

  async findAll(): Promise<CollectionModel[]> {
    return await db.select().from(collections);
  }

  async create(collectionData: CreateCollectionModel): Promise<CollectionModel> {
    try {
      const [newCollection] = await db
        .insert(collections)
        .values(collectionData)
        .returning();

      return newCollection;
    } catch (error: unknown) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        'detail' in error
      ) {
        const dbError = error as { code: string; detail: string };

        if (dbError.code === '23505') {
          throw new ConflictError('Recurso já existe');
        }
      }

      throw error;
    }
  }

  async update(
    id: number,
    collectionData: Partial<CreateCollectionModel>
  ): Promise<CollectionModel | null> {
    const [updatedCollection] = await db
      .update(collections)
      .set({
        ...collectionData,
        updatedAt: new Date(),
      })
      .where(eq(collections.id, id))
      .returning();

    return updatedCollection || null;
  }

  async delete(id: number): Promise<boolean> {
    const [deletedCollection] = await db
      .delete(collections)
      .where(eq(collections.id, id))
      .returning();

    return !!deletedCollection;
  }
}

export default new CollectionRepository(); 