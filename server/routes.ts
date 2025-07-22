import type { Express } from "express";
import { createServer, type Server } from "http";
import cookieParser from "cookie-parser";
import { storage } from "./storage";
import { adminLoginSchema, insertProductSchema, insertSerialNumberSchema } from "@shared/schema";
import { AdminAuthService, requireAdminAuth } from "./adminAuth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Add cookie parser middleware
  app.use(cookieParser());
  
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
