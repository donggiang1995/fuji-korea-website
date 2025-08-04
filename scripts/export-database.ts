#!/usr/bin/env tsx

import { db } from "../server/db";
import { products, serialNumbers, inquiries, adminUsers } from "../shared/schema";
import { writeFileSync } from "fs";
import { join } from "path";

async function exportDatabase() {
  try {
    console.log('🔄 Exporting database...');
    
    // Fetch all data
    const [productsData, serialNumbersData, inquiriesData, adminUsersData] = await Promise.all([
      db.select().from(products),
      db.select().from(serialNumbers),
      db.select().from(inquiries),
      db.select().from(adminUsers)
    ]);

    // Create export object
    const exportData = {
      metadata: {
        exportedAt: new Date().toISOString(),
        version: "1.0.0",
        source: "FUJI Global Korea Database"
      },
      tables: {
        products: productsData,
        serialNumbers: serialNumbersData,
        inquiries: inquiriesData,
        adminUsers: adminUsersData.map(user => ({
          ...user,
          password: "[ENCRYPTED]" // Don't export actual passwords
        }))
      },
      statistics: {
        totalProducts: productsData.length,
        totalSerialNumbers: serialNumbersData.length,
        totalInquiries: inquiriesData.length,
        totalAdminUsers: adminUsersData.length
      }
    };

    // Save to JSON file
    const fileName = `fuji-database-export-${new Date().toISOString().split('T')[0]}.json`;
    const filePath = join(process.cwd(), fileName);
    
    writeFileSync(filePath, JSON.stringify(exportData, null, 2), 'utf8');
    
    console.log('✅ Database exported successfully!');
    console.log(`📁 File saved: ${fileName}`);
    console.log('\n📊 Export summary:');
    console.log(`- Products: ${exportData.statistics.totalProducts}`);
    console.log(`- Serial Numbers: ${exportData.statistics.totalSerialNumbers}`);
    console.log(`- Inquiries: ${exportData.statistics.totalInquiries}`);
    console.log(`- Admin Users: ${exportData.statistics.totalAdminUsers}`);
    
  } catch (error: any) {
    console.error('❌ Export failed:', error.message);
    process.exit(1);
  }
}

exportDatabase();