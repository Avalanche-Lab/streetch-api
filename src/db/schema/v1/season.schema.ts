import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { collections } from "@/db/schema/v1/collection.schema";
import { relations } from "drizzle-orm";

export const seasons = pgTable('seasons', {
  id: serial('id').primaryKey(),
  number: integer('number').notNull(),
  collectionId: integer('collection_id').references(() => collections.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const seasonRelations = relations(seasons, ({ one }) => ({
  collection: one(collections, {
    fields: [seasons.collectionId],
    references: [collections.id],
  }),
}));

