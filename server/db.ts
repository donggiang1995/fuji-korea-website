import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Configure websocket for Neon serverless - only in Node.js environment
if (typeof window === 'undefined') {
  neonConfig.webSocketConstructor = ws;
}

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ DATABASE_URL environment variable is not set!');
  console.error('Please set DATABASE_URL in your Railway environment variables.');
  console.error('You can add a PostgreSQL database service in Railway and connect it to your app.');
  
  throw new Error(
    "DATABASE_URL must be set. Please add a PostgreSQL database service in Railway and configure the DATABASE_URL environment variable.",
  );
}

// Log connection info (without sensitive data)
console.log('🔌 Connecting to database...');
console.log(`Database host: ${new URL(databaseUrl).hostname}`);

export const pool = new Pool({ 
  connectionString: databaseUrl,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export const db = drizzle({ client: pool, schema });