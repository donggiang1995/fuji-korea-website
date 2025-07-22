import { 
  products, 
  inquiries, 
  serialNumbers, 
  type Product, 
  type Inquiry, 
  type InsertProduct, 
  type InsertInquiry, 
  type SerialNumber,
  type InsertSerialNumber
} from "@shared/schema";
import { db } from "./db";
import { eq, ilike, desc } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

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
    return result.rowCount ? result.rowCount > 0 : false;
  }

  async getInquiries(): Promise<Inquiry[]> {
    return await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
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

  // Serial number management
  async getSerialNumbers(): Promise<SerialNumber[]> {
    return db.select().from(serialNumbers).orderBy(desc(serialNumbers.createdAt));
  }

  async createSerialNumber(data: InsertSerialNumber): Promise<SerialNumber> {
    const serialData = {
      ...data,
      createdAt: new Date().toISOString()
    };
    const [serialNumber] = await db.insert(serialNumbers).values(serialData).returning();
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
    return result.rowCount ? result.rowCount > 0 : false;
  }
}

export const storage = new DatabaseStorage();
