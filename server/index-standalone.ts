import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Basic logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
  });
  next();
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    message: "FUJI Global Korea API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

// Basic API endpoints
app.get("/api/products", (req, res) => {
  res.json([
    {
      id: 1,
      name: "FCA-9000 Series Control Panel",
      category: "control",
      model: "FCA-9000",
      image: "/images/fca-9000.jpg",
      specifications: { voltage: "220V", frequency: "50Hz" },
      features: ["Advanced Control", "Energy Efficient"],
      descriptionKo: "고급 엘리베이터 제어판",
      descriptionEn: "Advanced elevator control panel"
    }
  ]);
});

const server = createServer(app);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  const publicPath = path.join(process.cwd(), "dist", "public");
  app.use(express.static(publicPath));
  
  // Catch-all handler for client-side routing
  app.get("*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
  });
}

// Error handling
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  console.error("Error:", err);
  res.status(status).json({ message });
});

const port = parseInt(process.env.PORT || '5000', 10);
server.listen({
  port,
  host: "0.0.0.0",
  reusePort: true,
}, () => {
  console.log(`FUJI Global Korea server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Health check: http://localhost:${port}/api/health`);
});