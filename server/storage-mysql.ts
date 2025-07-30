import { 
  products, 
  inquiries, 
  serialNumbers,
  adminUsers
} from "@shared/schema-mysql";

// Import types from MySQL schema
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
    const productData = {
      ...insertProduct,
      features: Array.isArray(insertProduct.features) ? insertProduct.features : [],
      specifications: typeof insertProduct.specifications === 'object' ? insertProduct.specifications : {}
    };
    
    const result = await db.insert(products).values(productData);
    const [product] = await db.select().from(products).where(eq(products.id, result.insertId));
    return product;
  }

  async updateProduct(id: number, data: InsertProduct): Promise<Product | null> {
    const productData = {
      ...data,
      features: Array.isArray(data.features) ? data.features : [],
      specifications: typeof data.specifications === 'object' ? data.specifications : {}
    };
    
    await db.update(products).set(productData).where(eq(products.id, id));
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || null;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id));
    return result.affectedRows > 0;
  }

  async getInquiries(): Promise<Inquiry[]> {
    return await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const inquiryData = {
      ...insertInquiry,
      createdAt: new Date()
    };
    
    const result = await db.insert(inquiries).values(inquiryData);
    const [inquiry] = await db.select().from(inquiries).where(eq(inquiries.id, result.insertId));
    return inquiry;
  }

  async searchSerialNumber(serialNumber: string): Promise<{ serialNumber: SerialNumber; product: Product } | undefined> {
    const results = await db
      .select()
      .from(serialNumbers)
      .innerJoin(products, eq(serialNumbers.productId, products.id))
      .where(eq(serialNumbers.serialNumber, serialNumber));

    if (results.length > 0) {
      return {
        serialNumber: results[0].serial_numbers,
        product: results[0].products
      };
    }
    return undefined;
  }

  async getSerialNumbers(): Promise<SerialNumber[]> {
    return await db.select().from(serialNumbers).orderBy(desc(serialNumbers.createdAt));
  }

  async createSerialNumber(data: InsertSerialNumber): Promise<SerialNumber> {
    const serialData = {
      ...data,
      createdAt: new Date()
    };
    
    const result = await db.insert(serialNumbers).values(serialData);
    const [serial] = await db.select().from(serialNumbers).where(eq(serialNumbers.id, result.insertId));
    return serial;
  }

  async updateSerialNumber(id: number, data: InsertSerialNumber): Promise<SerialNumber | null> {
    await db.update(serialNumbers).set(data).where(eq(serialNumbers.id, id));
    const [serial] = await db.select().from(serialNumbers).where(eq(serialNumbers.id, id));
    return serial || null;
  }

  async deleteSerialNumber(id: number): Promise<boolean> {
    const result = await db.delete(serialNumbers).where(eq(serialNumbers.id, id));
    return result.affectedRows > 0;
  }

  async getAdminUser(id: number): Promise<AdminUser | undefined> {
    const [user] = await db.select().from(adminUsers).where(eq(adminUsers.id, id));
    return user || undefined;
  }

  async updateAdminPassword(id: number, hashedPassword: string): Promise<boolean> {
    const result = await db.update(adminUsers).set({ password: hashedPassword }).where(eq(adminUsers.id, id));
    return result.affectedRows > 0;
  }
}

// Export storage instance
export const storage = new DatabaseStorage();