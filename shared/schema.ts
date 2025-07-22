import { pgTable, text, serial, integer, boolean, json, timestamp } from "drizzle-orm/pg-core";
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

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(), // hashed password
  email: text("email").notNull().unique(),
  role: text("role").default("admin"), // 'admin', 'super_admin'
  createdAt: timestamp("created_at").defaultNow(),
  lastLogin: timestamp("last_login"),
});

export const adminSessions = pgTable("admin_sessions", {
  id: text("id").primaryKey(),
  userId: integer("user_id").references(() => adminUsers.id).notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
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

export const insertAdminUserSchema = createInsertSchema(adminUsers).pick({
  username: true,
  password: true,
  email: true,
  role: true,
});

export const adminLoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertSerialNumber = z.infer<typeof insertSerialNumberSchema>;
export type SerialNumber = typeof serialNumbers.$inferSelect;
export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type AdminLogin = z.infer<typeof adminLoginSchema>;
export type AdminSession = typeof adminSessions.$inferSelect;
