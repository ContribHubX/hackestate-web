import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { uuid } from "uuidv4";

export const user = pgTable("user", {
    id: varchar("id").notNull().primaryKey().$defaultFn(uuid),
    email: varchar("email").notNull().unique(),
    password: varchar("password").notNull(),
    name: varchar("name").notNull(),
    createdAt: timestamp("created_at").defaultNow()
})

export type User = typeof user.$inferSelect;