// FUJI Global Korea - MySQL Schema for Spaceship Hosting
import { mysqlTable, text, int, json, datetime, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = mysqlTable("products", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(), // 'control' or 'traction'
  model: varchar("model", { length: 255 }).notNull(),
  image: text("image").notNull(),
  specifications: json("specifications").$type<Record<string, string>>().notNull(),
  features: json("features").$type<string[]>().notNull(),
  descriptionKo: text("description_ko").notNull(),
  descriptionEn: text("description_en").notNull(),
});

export const inquiries = mysqlTable("inquiries", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }),
  message: text("message").notNull(),
  createdAt: datetime("created_at").notNull().default(new Date()),
});

export const serialNumbers = mysqlTable("serial_numbers", {
  id: int("id").primaryKey().autoincrement(),
  serialNumber: varchar("serial_number", { length: 255 }).notNull().unique(),
  productId: int("product_id").references(() => products.id),
  installationDate: datetime("installation_date"),
  location: varchar("location", { length: 255 }),
  status: varchar("status", { length: 50 }).default("active"), // 'active', 'maintenance', 'retired'
  createdAt: datetime("created_at").notNull().default(new Date()),
});

export const adminUsers = mysqlTable("admin_users", {
  id: int("id").primaryKey().autoincrement(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(), // hashed password
  email: varchar("email", { length: 255 }).notNull().unique(),
  role: varchar("role", { length: 50 }).default("admin"), // 'admin', 'super_admin'
  createdAt: datetime("created_at").notNull().default(new Date()),
  lastLogin: datetime("last_login"),
});

export const adminSessions = mysqlTable("admin_sessions", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: int("user_id").references(() => adminUsers.id).notNull(),
  expiresAt: datetime("expires_at").notNull(),
  createdAt: datetime("created_at").notNull().default(new Date()),
});

// Zod schemas
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

export const changePasswordSchema = z.object({
  securityCode: z.string().min(1, "Security code is required"),
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Please confirm your new password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
}).refine((data) => data.securityCode === "1995", {
  message: "Invalid security code",
  path: ["securityCode"],
});

// Types
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertSerialNumber = z.infer<typeof insertSerialNumberSchema>;
export type SerialNumber = typeof serialNumbers.$inferSelect;
export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type AdminLogin = z.infer<typeof adminLoginSchema>;
export type ChangePassword = z.infer<typeof changePasswordSchema>;
export type AdminSession = typeof adminSessions.$inferSelect;