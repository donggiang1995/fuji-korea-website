import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
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

  const httpServer = createServer(app);

  return httpServer;
}
