import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  price: integer("price").notNull(),
  status: text("status").notNull(),
  area_sqm: integer("area_sqm").notNull(),
  amenities: text("amenities").array().notNull(),
  image: text("image").notNull(),
  link: text("link"),
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
});

export const savedProperties = pgTable("saved_properties", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  propertyId: integer("property_id").notNull(),
});

export const insertSavedPropertySchema = createInsertSchema(savedProperties).omit({
  id: true,
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  timestamp: text("timestamp").notNull(),
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
});

// Define types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

// export type Property = typeof properties.$inferSelect;
export type Property = {
  id: number;
  category: string | null;
  image: string;
  location: string;
  postedOn: string;
  price: string;
  status: string;
  title: string;
  type: string | null;
  area_sqm: number | null;
  amenities: string;
  url: string | null;
}

export type InsertProperty = z.infer<typeof insertPropertySchema>;

export type SavedProperty = typeof savedProperties.$inferSelect;
export type InsertSavedProperty = z.infer<typeof insertSavedPropertySchema>;

export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

// Chat message structure for frontend
export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
};

// Structure for property comparison analysis
export type PropertyAnalysis = {
  propertyId: number;
  pros: string[];
  cons: string[];
  recommendation: string;
};

