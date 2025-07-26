// FUJI Global Korea - Drizzle Config for MySQL (Spaceship Hosting)
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './shared/schema-mysql.ts',
  out: './migrations-mysql',
  dialect: 'mysql',
  dbCredentials: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fuji_korea_db',
  },
  verbose: true,
  strict: true,
});