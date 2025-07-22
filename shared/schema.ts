import { pgTable, text, serial, integer, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // 'control' or 'traction'
  model: text("model").notNull(),
  image: text("image").notNull(),
  specifications: json("specifications").$type<Record<string, string>>().notNull(),
  features: json("features").$type<string[]>().notNull(),
  descriptionKo: text("description_ko").notNull(),
  descriptionEn: text("description_en").notNull(),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
});

export const serialNumbers = pgTable("serial_numbers", {
  id: serial("id").primaryKey(),
  serialNumber: text("serial_number").notNull().unique(),
  productId: integer("product_id").references(() => products.id),
  installationDate: text("installation_date"),
  location: text("location"),
  status: text("status").default("active"), // 'active', 'maintenance', 'retired'
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
});

export const insertProductSchema = createInsertSchema(products);
export const insertInquirySchema = createInsertSchema(inquiries).pick({
  name: true,
  email: true,
  company: true,
  message: true,
});
export const insertSerialNumberSchema = createInsertSchema(serialNumbers).pick({
  serialNumber: true,
  productId: true,
  installationDate: true,
  location: true,
  status: true,
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertSerialNumber = z.infer<typeof insertSerialNumberSchema>;
export type SerialNumber = typeof serialNumbers.$inferSelect;
