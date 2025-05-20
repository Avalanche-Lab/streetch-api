import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { seasons } from "@/db/schema/v1/season.schema";
import { posts } from "@/db/schema/v1/post.schema";

export const collections = pgTable('collections', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 100 }).notNull(),
  profileIcon: varchar('profile_icon', { length: 1024 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  typeCollection: varchar('type_collection', { length: 1 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const collectionRelations = relations(collections, ({ many }) => ({
  seasons: many(seasons),
  posts: many(posts),
}));

