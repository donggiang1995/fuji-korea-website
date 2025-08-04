#!/usr/bin/env tsx

import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import { join } from 'path';

interface ExportedData {
  metadata: {
    exportedAt: string;
    version: string;
    source: string;
  };
  tables: {
    products: any[];
    serialNumbers: any[];
    inquiries: any[];
  };
  statistics: {
    totalProducts: number;
    totalSerialNumbers: number;
    totalInquiries: number;
  };
}

async function importToRailway() {
  try {
    // Get DATABASE_URL from environment
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      console.error('❌ DATABASE_URL environment variable not found');
      console.log('Please set DATABASE_URL to your Railway PostgreSQL connection string');
      process.exit(1);
    }

    console.log('🔌 Connecting to Railway PostgreSQL...');
    const sql = neon(databaseUrl);

    // Read exported JSON data
    const jsonPath = join(process.cwd(), 'fuji-database-export-2025-08-04.json');
    console.log('📁 Reading export file:', jsonPath);
    
    const exportData: ExportedData = JSON.parse(readFileSync(jsonPath, 'utf8'));
    console.log('📊 Export metadata:', exportData.metadata);

    // Create tables with proper structure
    console.log('🏗️  Creating database tables...');
    
    // Create products table
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        model TEXT NOT NULL,
        image TEXT NOT NULL,
        specifications JSONB NOT NULL,
        features JSONB NOT NULL,
        description_ko TEXT NOT NULL,
        description_en TEXT NOT NULL
      )
    `;

    // Create serial_numbers table
    await sql`
      CREATE TABLE IF NOT EXISTS serial_numbers (
        id SERIAL PRIMARY KEY,
        serial_number TEXT NOT NULL UNIQUE,
        product_id INTEGER REFERENCES products(id),
        installation_date TEXT,
        location TEXT,
        status TEXT DEFAULT 'active',
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create inquiries table
    await sql`
      CREATE TABLE IF NOT EXISTS inquiries (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        company TEXT,
        message TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create admin tables
    await sql`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        role TEXT DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS admin_sessions (
        id TEXT PRIMARY KEY,
        user_id INTEGER REFERENCES admin_users(id) NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('✅ Tables created successfully');

    // Clear existing data to avoid conflicts
    console.log('🧹 Clearing existing data...');
    await sql`TRUNCATE TABLE serial_numbers CASCADE`;
    await sql`TRUNCATE TABLE products CASCADE`;
    await sql`TRUNCATE TABLE inquiries CASCADE`;

    // Import products
    console.log('📦 Importing products...');
    for (const product of exportData.tables.products) {
      await sql`
        INSERT INTO products (
          id, name, category, model, image, specifications, features, description_ko, description_en
        ) VALUES (
          ${product.id},
          ${product.name},
          ${product.category},
          ${product.model},
          ${product.image},
          ${JSON.stringify(product.specifications)},
          ${JSON.stringify(product.features)},
          ${product.descriptionKo},
          ${product.descriptionEn}
        )
      `;
    }

    // Import serial numbers
    console.log('🔢 Importing serial numbers...');
    for (const serial of exportData.tables.serialNumbers) {
      await sql`
        INSERT INTO serial_numbers (
          id, serial_number, product_id, installation_date, location, status, created_at
        ) VALUES (
          ${serial.id},
          ${serial.serialNumber},
          ${serial.productId},
          ${serial.installationDate || null},
          ${serial.location || null},
          ${serial.status || 'active'},
          ${serial.createdAt}
        )
      `;
    }

    // Import inquiries (if any)
    if (exportData.tables.inquiries.length > 0) {
      console.log('📝 Importing inquiries...');
      for (const inquiry of exportData.tables.inquiries) {
        await sql`
          INSERT INTO inquiries (
            id, name, email, company, message, created_at
          ) VALUES (
            ${inquiry.id},
            ${inquiry.name},
            ${inquiry.email},
            ${inquiry.company || null},
            ${inquiry.message},
            ${inquiry.createdAt}
          )
        `;
      }
    }

    // Create default admin user
    console.log('👤 Creating default admin user...');
    const bcrypt = await import('bcryptjs');
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    await sql`
      INSERT INTO admin_users (username, password, email, role)
      VALUES ('admin', ${hashedPassword}, 'admin@fuji-korea.com', 'admin')
      ON CONFLICT (username) DO NOTHING
    `;

    // Reset sequences to correct values
    console.log('🔄 Resetting sequences...');
    await sql`SELECT setval('products_id_seq', (SELECT MAX(id) FROM products))`;
    await sql`SELECT setval('serial_numbers_id_seq', (SELECT MAX(id) FROM serial_numbers))`;
    await sql`SELECT setval('inquiries_id_seq', COALESCE((SELECT MAX(id) FROM inquiries), 0) + 1)`;
    await sql`SELECT setval('admin_users_id_seq', (SELECT MAX(id) FROM admin_users))`;

    console.log('✅ Import completed successfully!');
    console.log('\n📊 Import summary:');
    console.log(`- Products: ${exportData.statistics.totalProducts}`);
    console.log(`- Serial Numbers: ${exportData.statistics.totalSerialNumbers}`);
    console.log(`- Inquiries: ${exportData.statistics.totalInquiries}`);
    console.log(`- Admin User: 1 (username: admin, password: admin123)`);
    
    console.log('\n🚀 Your Railway database is ready!');
    console.log('You can now deploy your application to Railway.');
    
  } catch (error: any) {
    console.error('❌ Import failed:', error.message);
    if (error.message.includes('does not exist')) {
      console.log('\n💡 Tip: Make sure your Railway PostgreSQL service is running and DATABASE_URL is correct');
    }
    process.exit(1);
  }
}

importToRailway();