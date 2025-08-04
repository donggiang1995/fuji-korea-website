#!/usr/bin/env tsx

import { db } from "../server/db";
import { products, serialNumbers, inquiries, adminUsers } from "../shared/schema";
import { writeFileSync } from "fs";
import { join } from "path";

async function exportToSQL() {
  try {
    console.log('🔄 Exporting database to SQL...');
    
    // Fetch all data
    const [productsData, serialNumbersData, inquiriesData, adminUsersData] = await Promise.all([
      db.select().from(products),
      db.select().from(serialNumbers),
      db.select().from(inquiries),
      db.select().from(adminUsers)
    ]);

    let sql = `-- FUJI Global Korea Database Export
-- Exported on: ${new Date().toISOString()}
-- 
-- This file contains the complete database structure and data
-- for the FUJI Global Korea corporate website.

-- ================================
-- Table: products
-- ================================

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
);

`;

    // Export products data
    if (productsData.length > 0) {
      sql += `INSERT INTO products (id, name, category, model, image, specifications, features, description_ko, description_en) VALUES\n`;
      const productValues = productsData.map(p => 
        `(${p.id}, ${escapeSQL(p.name)}, ${escapeSQL(p.category)}, ${escapeSQL(p.model)}, ${escapeSQL(p.image)}, '${JSON.stringify(p.specifications)}'::jsonb, '${JSON.stringify(p.features)}'::jsonb, ${escapeSQL(p.descriptionKo)}, ${escapeSQL(p.descriptionEn)})`
      );
      sql += productValues.join(',\n') + ';\n\n';
    }

    // Serial Numbers table
    sql += `-- ================================
-- Table: serial_numbers
-- ================================

CREATE TABLE IF NOT EXISTS serial_numbers (
    id SERIAL PRIMARY KEY,
    serial_number TEXT NOT NULL UNIQUE,
    product_id INTEGER REFERENCES products(id),
    installation_date TEXT,
    location TEXT,
    status TEXT DEFAULT 'active',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

`;

    // Export serial numbers data
    if (serialNumbersData.length > 0) {
      sql += `INSERT INTO serial_numbers (id, serial_number, product_id, installation_date, location, status, created_at) VALUES\n`;
      const serialValues = serialNumbersData.map(s => 
        `(${s.id}, ${escapeSQL(s.serialNumber)}, ${s.productId || 'NULL'}, ${escapeSQL(s.installationDate)}, ${escapeSQL(s.location)}, ${escapeSQL(s.status)}, ${escapeSQL(s.createdAt)})`
      );
      sql += serialValues.join(',\n') + ';\n\n';
    }

    // Inquiries table
    sql += `-- ================================
-- Table: inquiries
-- ================================

CREATE TABLE IF NOT EXISTS inquiries (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

`;

    // Export inquiries data
    if (inquiriesData.length > 0) {
      sql += `INSERT INTO inquiries (id, name, email, company, message, created_at) VALUES\n`;
      const inquiryValues = inquiriesData.map(i => 
        `(${i.id}, ${escapeSQL(i.name)}, ${escapeSQL(i.email)}, ${escapeSQL(i.company)}, ${escapeSQL(i.message)}, ${escapeSQL(i.createdAt)})`
      );
      sql += inquiryValues.join(',\n') + ';\n\n';
    }

    // Admin Users table (structure only, no data for security)
    sql += `-- ================================
-- Table: admin_users (structure only)
-- ================================

CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- Note: Admin user data not exported for security reasons
-- You'll need to create admin users manually in the new system

-- ================================
-- Table: admin_sessions (structure only)
-- ================================

CREATE TABLE IF NOT EXISTS admin_sessions (
    id TEXT PRIMARY KEY,
    user_id INTEGER REFERENCES admin_users(id) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reset sequences to correct values
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
SELECT setval('serial_numbers_id_seq', (SELECT MAX(id) FROM serial_numbers));
SELECT setval('inquiries_id_seq', (SELECT MAX(id) FROM inquiries));
SELECT setval('admin_users_id_seq', 1);

-- Export completed successfully!
`;

    // Save to SQL file
    const fileName = `fuji-database-export-${new Date().toISOString().split('T')[0]}.sql`;
    const filePath = join(process.cwd(), fileName);
    
    writeFileSync(filePath, sql, 'utf8');
    
    console.log('✅ SQL export completed successfully!');
    console.log(`📁 File saved: ${fileName}`);
    console.log('\n📊 Export summary:');
    console.log(`- Products: ${productsData.length}`);
    console.log(`- Serial Numbers: ${serialNumbersData.length}`);
    console.log(`- Inquiries: ${inquiriesData.length}`);
    console.log(`- Admin Users: ${adminUsersData.length} (structure only)`);
    
  } catch (error: any) {
    console.error('❌ SQL export failed:', error.message);
    process.exit(1);
  }
}

function escapeSQL(value: string | null): string {
  if (value === null || value === undefined) return 'NULL';
  return `'${value.replace(/'/g, "''")}'`;
}

exportToSQL();