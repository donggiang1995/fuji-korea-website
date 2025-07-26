// FUJI Global Korea - Database Export Script
// Export PostgreSQL data để migrate sang MySQL trên Spaceship

const { db } = require('./server/db');
const fs = require('fs');

async function exportDatabase() {
  try {
    console.log('🚀 Starting database export...');
    
    // Export Products
    console.log('📦 Exporting products...');
    const products = await db.query('SELECT * FROM products ORDER BY id');
    
    // Export Inquiries  
    console.log('📝 Exporting inquiries...');
    const inquiries = await db.query('SELECT * FROM inquiries ORDER BY id');
    
    // Export Serial Numbers
    console.log('🏷️ Exporting serial numbers...');
    const serialNumbers = await db.query('SELECT * FROM serial_numbers ORDER BY id');
    
    // Export Admin Users (without passwords for security)
    console.log('👤 Exporting admin users...');
    const adminUsers = await db.query('SELECT id, username, email, role, created_at, last_login FROM admin_users ORDER BY id');
    
    // Create export data
    const exportData = {
      timestamp: new Date().toISOString(),
      products: products.rows || products,
      inquiries: inquiries.rows || inquiries,
      serialNumbers: serialNumbers.rows || serialNumbers,
      adminUsers: adminUsers.rows || adminUsers
    };
    
    // Save to JSON file
    fs.writeFileSync('database-export.json', JSON.stringify(exportData, null, 2));
    console.log('✅ Database exported to database-export.json');
    
    // Generate MySQL INSERT statements
    await generateMySQLInserts(exportData);
    
    console.log('🎉 Export completed successfully!');
    
  } catch (error) {
    console.error('❌ Export failed:', error);
  }
}

async function generateMySQLInserts(data) {
  let sql = '-- FUJI Global Korea - MySQL Import Data\n';
  sql += '-- Generated: ' + new Date().toISOString() + '\n\n';
  
  sql += 'USE fuji_korea_db;\n\n';
  
  // Products
  if (data.products.length > 0) {
    sql += '-- Insert Products\n';
    sql += 'INSERT INTO products (id, name, category, model, image, specifications, features, description_ko, description_en) VALUES\n';
    
    const productValues = data.products.map(p => {
      return `(${p.id}, ${mysql_escape(p.name)}, ${mysql_escape(p.category)}, ${mysql_escape(p.model)}, ${mysql_escape(p.image)}, '${JSON.stringify(p.specifications)}', '${JSON.stringify(p.features)}', ${mysql_escape(p.descriptionKo || p.description_ko)}, ${mysql_escape(p.descriptionEn || p.description_en)})`;
    });
    
    sql += productValues.join(',\n') + ';\n\n';
  }
  
  // Serial Numbers
  if (data.serialNumbers.length > 0) {
    sql += '-- Insert Serial Numbers\n';
    sql += 'INSERT INTO serial_numbers (id, serial_number, product_id, installation_date, location, status, created_at) VALUES\n';
    
    const serialValues = data.serialNumbers.map(s => {
      return `(${s.id}, ${mysql_escape(s.serialNumber || s.serial_number)}, ${s.productId || s.product_id || 'NULL'}, ${s.installationDate ? mysql_escape(s.installationDate) : 'NULL'}, ${s.location ? mysql_escape(s.location) : 'NULL'}, ${mysql_escape(s.status || 'active')}, ${mysql_escape(s.createdAt || s.created_at)})`;
    });
    
    sql += serialValues.join(',\n') + ';\n\n';
  }
  
  // Inquiries
  if (data.inquiries.length > 0) {
    sql += '-- Insert Inquiries\n';
    sql += 'INSERT INTO inquiries (id, name, email, company, message, created_at) VALUES\n';
    
    const inquiryValues = data.inquiries.map(i => {
      return `(${i.id}, ${mysql_escape(i.name)}, ${mysql_escape(i.email)}, ${i.company ? mysql_escape(i.company) : 'NULL'}, ${mysql_escape(i.message)}, ${mysql_escape(i.createdAt || i.created_at)})`;
    });
    
    sql += inquiryValues.join(',\n') + ';\n\n';
  }
  
  // Reset AUTO_INCREMENT
  sql += '-- Reset AUTO_INCREMENT values\n';
  sql += `ALTER TABLE products AUTO_INCREMENT = ${Math.max(...data.products.map(p => p.id)) + 1};\n`;
  sql += `ALTER TABLE serial_numbers AUTO_INCREMENT = ${Math.max(...data.serialNumbers.map(s => s.id)) + 1};\n`;
  sql += `ALTER TABLE inquiries AUTO_INCREMENT = ${Math.max(...data.inquiries.map(i => i.id)) + 1};\n`;
  
  fs.writeFileSync('mysql-import-data.sql', sql);
  console.log('✅ MySQL import script generated: mysql-import-data.sql');
}

function mysql_escape(str) {
  if (str === null || str === undefined) return 'NULL';
  return "'" + str.toString().replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\r/g, '\\r') + "'";
}

// Run export
exportDatabase();

module.exports = { exportDatabase };