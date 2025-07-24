import { Router } from 'express';
import { requireAdminAuth } from '../middleware.js';
import { insertSerialNumberSchema } from '@shared/schema.js';
import { storage } from '../storage.js';

const router = Router();

// Batch import serial numbers from Excel
router.post("/api/admin/excel/import-serials", requireAdminAuth, async (req, res) => {
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
        // Validate each row
        const serialData = insertSerialNumberSchema.parse({
          serialNumber: row.serialNumber,
          productId: row.productId || 1,
          location: row.location || '',
          status: row.status || 'active',
          installationDate: row.installationDate || null
        });

        // Check if serial number already exists
        const existing = await storage.getSerialNumbers();
        const duplicate = existing.find(s => s.serialNumber === serialData.serialNumber);
        
        if (duplicate) {
          errors.push({
            row: i + 1,
            serialNumber: serialData.serialNumber,
            error: "Serial number already exists"
          });
          continue;
        }

        // Create serial number
        const created = await storage.createSerialNumber(serialData);
        results.push(created);
        
      } catch (error) {
        errors.push({
          row: i + 1,
          serialNumber: row.serialNumber,
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
router.get("/api/admin/excel/export-serials", requireAdminAuth, async (req, res) => {
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

export default router;