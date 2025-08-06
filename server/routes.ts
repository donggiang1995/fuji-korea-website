import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import cookieParser from "cookie-parser";

// Extend Request type to include admin property
declare global {
  namespace Express {
    interface Request {
      admin?: { id: number; username: string; email: string; role: string };
    }
  }
}
import { storage } from "./storage";
import { adminLoginSchema, insertProductSchema, insertSerialNumberSchema, changePasswordSchema } from "@shared/schema";
import { AdminAuthService, requireAdminAuth } from "./adminAuth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Add cookie parser middleware
  app.use(cookieParser());
  
  // Health check endpoint for Railway
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "unknown"
    });
  });

  // Root health check
  app.get("/", (req, res) => {
    res.json({ 
      message: "FUJI Global Korea API Server",
      status: "running",
      timestamp: new Date().toISOString()
    });
  });
  
  // put application routes here
  // prefix all routes with /api

  // Products API
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // Serial number search API
  app.get("/api/search-serial/:serialNumber", async (req, res) => {
    try {
      const { serialNumber } = req.params;
      const result = await storage.searchSerialNumber(serialNumber);
      
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ error: "Serial number not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to search serial number" });
    }
  });

  // Inquiries API
  app.post("/api/inquiries", async (req, res) => {
    try {
      const inquiry = await storage.createInquiry(req.body);
      res.status(201).json(inquiry);
    } catch (error) {
      res.status(500).json({ error: "Failed to create inquiry" });
    }
  });

  // ===== ADMIN AUTHENTICATION ROUTES =====
  
  // Change admin password
  app.post("/api/admin/change-password", requireAdminAuth, async (req, res) => {
    try {
      // Validate request body (includes security code validation)
      const { securityCode, currentPassword, newPassword } = changePasswordSchema.parse(req.body);
      const adminId = req.admin?.id;
      
      if (!adminId) {
        return res.status(401).json({ error: "Admin not found" });
      }

      // Get current admin user
      const admin = await storage.getAdminUser(adminId);
      if (!admin) {
        return res.status(404).json({ error: "Admin user not found" });
      }

      // Verify current password
      const isValidPassword = await AdminAuthService.verifyPassword(currentPassword, admin.password);
      if (!isValidPassword) {
        return res.status(400).json({ error: "Current password is incorrect" });
      }

      // Hash new password
      const hashedNewPassword = await AdminAuthService.hashPassword(newPassword);
      
      // Update password in database
      const success = await storage.updateAdminPassword(adminId, hashedNewPassword);
      if (!success) {
        return res.status(500).json({ error: "Failed to update password" });
      }

      // Invalidate all sessions for this admin
      await AdminAuthService.invalidateAllSessions(adminId);

      res.json({ message: "Password changed successfully" });

    } catch (error) {
      console.error('Change password error:', error);
      res.status(500).json({ error: "Failed to change password" });
    }
  });

  // Export database
  app.get("/api/admin/export-database", requireAdminAuth, async (req, res) => {
    try {
      const format = req.query.format as string;
      
      if (format !== 'json' && format !== 'sql') {
        return res.status(400).json({ error: "Invalid format. Use 'json' or 'sql'" });
      }

      // Fetch all data
      const [productsData, serialNumbersData, inquiriesData] = await Promise.all([
        storage.getProducts(),
        storage.getSerialNumbers(),
        storage.getInquiries()
      ]);

      const timestamp = new Date().toISOString().split('T')[0];
      
      if (format === 'json') {
        const exportData = {
          metadata: {
            exportedAt: new Date().toISOString(),
            version: "1.0.0",
            source: "FUJI Global Korea Database"
          },
          tables: {
            products: productsData,
            serialNumbers: serialNumbersData,
            inquiries: inquiriesData
          },
          statistics: {
            totalProducts: productsData.length,
            totalSerialNumbers: serialNumbersData.length,
            totalInquiries: inquiriesData.length
          }
        };

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', `attachment; filename="fuji-database-export-${timestamp}.json"`);
        res.json(exportData);
        
      } else if (format === 'sql') {
        let sql = `-- FUJI Global Korea Database Export
-- Exported on: ${new Date().toISOString()}

-- Table: products
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
          const productValues = productsData.map((p: any) => 
            `(${p.id}, ${escapeSQL(p.name)}, ${escapeSQL(p.category)}, ${escapeSQL(p.model)}, ${escapeSQL(p.image)}, '${JSON.stringify(p.specifications)}'::jsonb, '${JSON.stringify(p.features)}'::jsonb, ${escapeSQL(p.descriptionKo)}, ${escapeSQL(p.descriptionEn)})`
          );
          sql += productValues.join(',\n') + ';\n\n';
        }

        // Serial Numbers table
        sql += `-- Table: serial_numbers
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
          const serialValues = serialNumbersData.map((s: any) => 
            `(${s.id}, ${escapeSQL(s.serialNumber)}, ${s.productId || 'NULL'}, ${escapeSQL(s.installationDate)}, ${escapeSQL(s.location)}, ${escapeSQL(s.status)}, ${escapeSQL(s.createdAt)})`
          );
          sql += serialValues.join(',\n') + ';\n\n';
        }

        // Reset sequences
        sql += `-- Reset sequences
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
SELECT setval('serial_numbers_id_seq', (SELECT MAX(id) FROM serial_numbers));
`;

        res.setHeader('Content-Type', 'application/sql');
        res.setHeader('Content-Disposition', `attachment; filename="fuji-database-export-${timestamp}.sql"`);
        res.send(sql);
      }
      
    } catch (error) {
      console.error('Export error:', error);
      res.status(500).json({ error: "Failed to export database" });
    }
  });

  function escapeSQL(value: string | null): string {
    if (value === null || value === undefined) return 'NULL';
    return `'${value.replace(/'/g, "''")}'`;
  }
  
  // Admin login
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = adminLoginSchema.parse(req.body);
      
      const result = await AdminAuthService.loginAdmin(username, password);
      if (!result) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const { admin, sessionId } = result;
      
      // Set session cookie (httpOnly for security)
      res.cookie('adminSession', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      });

      res.json({
        admin: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
        },
        sessionId,
      });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  // Admin logout
  app.post("/api/admin/logout", requireAdminAuth, async (req: any, res) => {
    try {
      const sessionId = req.cookies?.adminSession;
      if (sessionId) {
        await AdminAuthService.logout(sessionId);
      }
      
      res.clearCookie('adminSession');
      res.json({ message: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({ error: "Logout failed" });
    }
  });

  // Get current admin user
  app.get("/api/admin/me", requireAdminAuth, async (req: any, res) => {
    res.json({
      admin: {
        id: req.admin.id,
        username: req.admin.username,
        email: req.admin.email,
        role: req.admin.role,
      },
    });
  });

  // ===== ADMIN PRODUCT MANAGEMENT ROUTES =====
  
  // Get all products (admin)
  app.get("/api/admin/products", requireAdminAuth, async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // Create product
  app.post("/api/admin/products", requireAdminAuth, async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to create product" });
    }
  });

  // Update product
  app.put("/api/admin/products/:id", requireAdminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.updateProduct(id, productData);
      
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to update product" });
    }
  });

  // Delete product
  app.delete("/api/admin/products/:id", requireAdminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteProduct(id);
      
      if (!success) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  // ===== ADMIN SERIAL NUMBER MANAGEMENT ROUTES =====
  
  // Get all serial numbers (admin)
  app.get("/api/admin/serial-numbers", requireAdminAuth, async (req, res) => {
    try {
      const serialNumbers = await storage.getSerialNumbers();
      res.json(serialNumbers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch serial numbers" });
    }
  });

  // Create serial number
  app.post("/api/admin/serial-numbers", requireAdminAuth, async (req, res) => {
    try {
      const serialData = insertSerialNumberSchema.parse(req.body);
      const serialNumber = await storage.createSerialNumber(serialData);
      res.status(201).json(serialNumber);
    } catch (error) {
      res.status(500).json({ error: "Failed to create serial number" });
    }
  });

  // Update serial number
  app.put("/api/admin/serial-numbers/:id", requireAdminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const serialData = insertSerialNumberSchema.parse(req.body);
      const serialNumber = await storage.updateSerialNumber(id, serialData);
      
      if (!serialNumber) {
        return res.status(404).json({ error: "Serial number not found" });
      }
      
      res.json(serialNumber);
    } catch (error) {
      res.status(500).json({ error: "Failed to update serial number" });
    }
  });

  // Delete serial number
  app.delete("/api/admin/serial-numbers/:id", requireAdminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteSerialNumber(id);
      
      if (!success) {
        return res.status(404).json({ error: "Serial number not found" });
      }
      
      res.json({ message: "Serial number deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete serial number" });
    }
  });

  // Excel Integration APIs
  // Batch import serial numbers from Excel
  app.post("/api/admin/excel/import-serials", requireAdminAuth, async (req, res) => {
    try {
      const { data } = req.body;
      
      if (!Array.isArray(data)) {
        return res.status(400).json({ error: "Invalid data format. Expected array." });
      }

      const results = [];
      const errors = [];

      for (let i = 0; i < data.length; i++) {
        const row = data[i];
        try {
          console.log('Processing row:', row);
          
          // Prepare and validate each row
          const serialData = {
            serialNumber: String(row.serialNumber || '').trim(),
            productId: parseInt(row.productId) || 1,
            location: String(row.location || '').trim(),
            status: String(row.status || 'active').trim(),
            installationDate: row.installationDate ? String(row.installationDate).trim() : null
          };
          
          // Validate with schema
          const validatedData = insertSerialNumberSchema.parse(serialData);
          
          console.log('Validated data:', validatedData);

          // Check if serial number already exists
          const existing = await storage.getSerialNumbers();
          const duplicate = existing.find(s => s.serialNumber === validatedData.serialNumber);
          
          if (duplicate) {
            errors.push({
              row: i + 1,
              serialNumber: validatedData.serialNumber,
              error: "Serial number already exists"
            });
            continue;
          }

          // Create serial number
          const created = await storage.createSerialNumber(validatedData);
          results.push(created);
          
        } catch (error) {
          console.error('Error processing row:', error);
          errors.push({
            row: i + 1,
            serialNumber: row.serialNumber || 'unknown',
            error: error instanceof Error ? error.message : "Invalid data format"
          });
        }
      }

      res.json({
        success: true,
        imported: results.length,
        errors: errors.length,
        details: {
          imported: results,
          errors: errors
        }
      });

    } catch (error) {
      console.error('Excel import error:', error);
      res.status(500).json({ error: "Failed to import Excel data" });
    }
  });

  // Export current serial numbers to Excel format
  app.get("/api/admin/excel/export-serials", requireAdminAuth, async (req, res) => {
    try {
      const serialNumbers = await storage.getSerialNumbers();
      const products = await storage.getProducts();
      
      // Transform data for Excel export
      const exportData = serialNumbers.map(serial => {
        const product = products.find(p => p.id === serial.productId);
        return {
          'Serial Number': serial.serialNumber,
          'Product ID': serial.productId,
          'Product Name': product?.name || 'Unknown Product',
          'Location': serial.location || '',
          'Status': serial.status || 'active',
          'Installation Date': serial.installationDate || '',
          'Created At': serial.createdAt || ''
        };
      });

      res.json({
        success: true,
        data: exportData,
        count: exportData.length
      });

    } catch (error) {
      console.error('Excel export error:', error);
      res.status(500).json({ error: "Failed to export Excel data" });
    }
  });

  // Get all inquiries (admin)
  app.get("/api/admin/inquiries", requireAdminAuth, async (req, res) => {
    try {
      const inquiries = await storage.getInquiries();
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch inquiries" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
