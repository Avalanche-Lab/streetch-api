import { pgTable, serial, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { collections } from "@/db/schema/v1/collection.schema";
import { seasons } from "@/db/schema/v1/season.schema";
import { relations } from "drizzle-orm";

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 100 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  collectionId: integer('collection_id').references(() => collections.id),
  seasonId: integer('season_id').references(() => seasons.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const postRelations = relations(posts, ({ one }) => ({
  collection: one(collections, {
    fields: [posts.collectionId],
    references: [collections.id],
  }),

  season: one(seasons, {
    fields: [posts.seasonId],
    references: [seasons.id],
  }),
}));

