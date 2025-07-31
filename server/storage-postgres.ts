import { 
  products, 
  inquiries, 
  serialNumbers,
  adminUsers
} from "@shared/schema";

// Import types from PostgreSQL schema
type Product = typeof products.$inferSelect;
type InsertProduct = typeof products.$inferInsert;
type Inquiry = typeof inquiries.$inferSelect;
type InsertInquiry = typeof inquiries.$inferInsert;
type SerialNumber = typeof serialNumbers.$inferSelect;
type InsertSerialNumber = typeof serialNumbers.$inferInsert;
type AdminUser = typeof adminUsers.$inferSelect;
type InsertAdminUser = typeof adminUsers.$inferInsert;
import { db } from "./db";
import { eq, ilike, desc } from "drizzle-orm";

// Storage interface for PostgreSQL
export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, data: InsertProduct): Promise<Product | null>;
  deleteProduct(id: number): Promise<boolean>;
  getInquiries(): Promise<Inquiry[]>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  searchSerialNumber(serialNumber: string): Promise<{ serialNumber: SerialNumber; product: Product } | undefined>;
  getSerialNumbers(): Promise<SerialNumber[]>;
  createSerialNumber(data: InsertSerialNumber): Promise<SerialNumber>;
  updateSerialNumber(id: number, data: InsertSerialNumber): Promise<SerialNumber | null>;
  deleteSerialNumber(id: number): Promise<boolean>;
  getAdminUser(id: number): Promise<AdminUser | undefined>;
  updateAdminPassword(id: number, hashedPassword: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db
      .insert(products)
      .values(insertProduct)
      .returning();
    return product;
  }

  async updateProduct(id: number, data: InsertProduct): Promise<Product | null> {
    const [product] = await db
      .update(products)
      .set(data)
      .where(eq(products.id, id))
      .returning();
    return product || null;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id));
    return (result as any).rowsAffected > 0;
  }

  async getInquiries(): Promise<Inquiry[]> {
    return await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const [inquiry] = await db
      .insert(inquiries)
      .values(insertInquiry)
      .returning();
    return inquiry;
  }

  async searchSerialNumber(serialNumber: string): Promise<{ serialNumber: SerialNumber; product: Product } | undefined> {
    const result = await db
      .select({
        serialNumber: serialNumbers,
        product: products,
      })
      .from(serialNumbers)
      .leftJoin(products, eq(serialNumbers.productId, products.id))
      .where(eq(serialNumbers.serialNumber, serialNumber));

    if (result.length > 0 && result[0].product) {
      return {
        serialNumber: result[0].serialNumber,
        product: result[0].product,
      };
    }
    return undefined;
  }

  async getSerialNumbers(): Promise<SerialNumber[]> {
    return await db.select().from(serialNumbers).orderBy(desc(serialNumbers.createdAt));
  }

  async createSerialNumber(data: InsertSerialNumber): Promise<SerialNumber> {
    const [serialNumber] = await db
      .insert(serialNumbers)
      .values(data)
      .returning();
    return serialNumber;
  }

  async updateSerialNumber(id: number, data: InsertSerialNumber): Promise<SerialNumber | null> {
    const [serialNumber] = await db
      .update(serialNumbers)
      .set(data)
      .where(eq(serialNumbers.id, id))
      .returning();
    return serialNumber || null;
  }

  async deleteSerialNumber(id: number): Promise<boolean> {
    const result = await db.delete(serialNumbers).where(eq(serialNumbers.id, id));
    return (result as any).rowsAffected > 0;
  }

  async getAdminUser(id: number): Promise<AdminUser | undefined> {
    const [user] = await db.select().from(adminUsers).where(eq(adminUsers.id, id));
    return user || undefined;
  }

  async updateAdminPassword(id: number, hashedPassword: string): Promise<boolean> {
    const result = await db
      .update(adminUsers)
      .set({ password: hashedPassword })
      .where(eq(adminUsers.id, id));
    return (result as any).rowsAffected > 0;
  }
}

export const storage = new DatabaseStorage();