import { pgTable, serial, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { posts } from "@/db/schema/v1/post.schema";

export const media = pgTable('media', {
  id: serial('id').primaryKey(),
  mediaUrl: varchar('media_url', { length: 255 }).notNull(),
  mediaType: varchar('media_type', { length: 1 }).notNull(),
  postId: integer('post_id').references(() => posts.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

