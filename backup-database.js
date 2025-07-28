// FUJI Global Korea - Simple Database Backup
// Backup PostgreSQL data cho việc migration

import { createConnection } from '@neondatabase/serverless';
import fs from 'fs';

const DATABASE_URL = process.env.DATABASE_URL;

async function backupDatabase() {
  if (!DATABASE_URL) {
    console.log('❌ DATABASE_URL not found');
    return;
  }

  try {
    console.log('🚀 Starting database backup...');
    
    const sql = createConnection(DATABASE_URL);
    
    // Backup Products
    console.log('📦 Backing up products...');
    const products = await sql('SELECT * FROM products ORDER BY id');
    
    // Backup Inquiries  
    console.log('📝 Backing up inquiries...');
    const inquiries = await sql('SELECT * FROM inquiries ORDER BY id');
    
    // Backup Serial Numbers
    console.log('🏷️ Backing up serial_numbers...');
    const serialNumbers = await sql('SELECT * FROM serial_numbers ORDER BY id');
    
    // Backup Admin Users (without sensitive data)
    console.log('👤 Backing up admin_users...');
    const adminUsers = await sql('SELECT id, username, email, role, created_at, last_login FROM admin_users ORDER BY id');
    
    // Create backup data
    const backupData = {
      timestamp: new Date().toISOString(),
      products: products,
      inquiries: inquiries,
      serialNumbers: serialNumbers,
      adminUsers: adminUsers
    };
    
    // Save backup
    fs.writeFileSync('database-backup.json', JSON.stringify(backupData, null, 2));
    console.log('✅ Database backup saved to database-backup.json');
    
    // Generate MySQL import script
    console.log('🔄 Generating MySQL import script...');
    await generateMySQLImport(backupData);
    
    console.log('🎉 Backup completed successfully!');
    
    // Show summary
    console.log('\n📊 Backup Summary:');
    console.log(`- Products: ${products.length} records`);
    console.log(`- Serial Numbers: ${serialNumbers.length} records`);
    console.log(`- Inquiries: ${inquiries.length} records`);
    console.log(`- Admin Users: ${adminUsers.length} records`);
    
  } catch (error) {
    console.error('❌ Backup failed:', error.message);
  }
}

async function generateMySQLImport(data) {
  let sql = '-- FUJI Global Korea - MySQL Import Data\n';
  sql += `-- Generated: ${new Date().toISOString()}\n\n`;
  
  sql += 'USE fuji_korea_db;\n\n';
  
  // Products
  if (data.products.length > 0) {
    sql += '-- Insert Products\n';
    sql += 'INSERT INTO products (name, category, model, image, specifications, features, description_ko, description_en) VALUES\n';
    
    const productValues = data.products.map(p => {
      const specs = JSON.stringify(p.specifications || {});
      const features = JSON.stringify(p.features || []);
      return `(${escape(p.name)}, ${escape(p.category)}, ${escape(p.model)}, ${escape(p.image)}, '${specs}', '${features}', ${escape(p.descriptionKo || p.description_ko || '')}, ${escape(p.descriptionEn || p.description_en || '')})`;
    });
    
    sql += productValues.join(',\n') + ';\n\n';
  }
  
  // Serial Numbers
  if (data.serialNumbers.length > 0) {
    sql += '-- Insert Serial Numbers\n';
    sql += 'INSERT INTO serial_numbers (serial_number, product_id, installation_date, location, status) VALUES\n';
    
    const serialValues = data.serialNumbers.map(s => {
      const productId = s.productId || s.product_id || 'NULL';
      const installDate = s.installationDate || s.installation_date ? `${escape(s.installationDate || s.installation_date)}` : 'NULL';
      const location = s.location ? escape(s.location) : 'NULL';
      return `(${escape(s.serialNumber || s.serial_number)}, ${productId}, ${installDate}, ${location}, ${escape(s.status || 'active')})`;
    });
    
    sql += serialValues.join(',\n') + ';\n\n';
  }
  
  // Admin Users (will need password reset)
  sql += '-- Admin Users (reset password after import)\n';
  sql += '-- Default password: admin123 (hashed)\n';
  sql += "INSERT INTO admin_users (username, email, password, role) VALUES\n";
  sql += "('admin', 'admin@fuji-global-korea.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewE0BXnTSJpBGpL6', 'super_admin');\n\n";
  
  fs.writeFileSync('mysql-import-data.sql', sql);
  console.log('✅ MySQL import script: mysql-import-data.sql');
}

function escape(value) {
  if (value === null || value === undefined) return 'NULL';
  return "'" + value.toString().replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\r/g, '\\r') + "'";
}

// Run backup
backupDatabase().catch(console.error);