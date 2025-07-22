import { products, inquiries, serialNumbers, type Product, type Inquiry, type InsertProduct, type InsertInquiry, type SerialNumber } from "@shared/schema";
import { db } from "./db";
import { eq, ilike } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  getInquiries(): Promise<Inquiry[]>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  searchSerialNumber(serialNumber: string): Promise<{ serialNumber: SerialNumber; product: Product } | undefined>;
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

  async getInquiries(): Promise<Inquiry[]> {
    return await db.select().from(inquiries);
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const [inquiry] = await db
      .insert(inquiries)
      .values({
        ...insertInquiry,
        createdAt: new Date().toISOString()
      })
      .returning();
    return inquiry;
  }

  async searchSerialNumber(serialNumber: string): Promise<{ serialNumber: SerialNumber; product: Product } | undefined> {
    const result = await db
      .select({
        serialNumber: serialNumbers,
        product: products
      })
      .from(serialNumbers)
      .innerJoin(products, eq(serialNumbers.productId, products.id))
      .where(ilike(serialNumbers.serialNumber, `%${serialNumber}%`))
      .limit(1);
    
    return result[0] || undefined;
  }
}

export const storage = new DatabaseStorage();
