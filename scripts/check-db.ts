#!/usr/bin/env tsx

import { db } from "../server/db";
import { products } from "@shared/schema";

async function checkDatabase() {
  try {
    console.log('🔍 Checking database connection...');
    
    // Test basic connection
    const result = await db.select().from(products).limit(1);
    
    console.log('✅ Database connection successful!');
    console.log(`Found ${result.length} products in database`);
    
    // Test environment
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Database URL set: ${!!process.env.DATABASE_URL}`);
    
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Database connection failed:');
    console.error(error.message);
    
    if (error.message.includes('DATABASE_URL')) {
      console.log('\n📋 To fix this on Railway:');
      console.log('1. Add PostgreSQL service to your Railway project');
      console.log('2. Connect it to your main service');
      console.log('3. The DATABASE_URL will be automatically set');
      console.log('4. Redeploy your application');
    }
    
    process.exit(1);
  }
}

checkDatabase();