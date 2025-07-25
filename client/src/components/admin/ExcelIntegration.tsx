import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  Upload, 
  Download, 
  FileSpreadsheet, 
  Link, 
  RotateCcw, 
  CheckCircle, 
  AlertTriangle,
  Globe,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

interface ExcelRow {
  serialNumber: string;
  productId: number;
  location: string;
  status: string;
  installationDate: string;
}

interface ExcelIntegrationProps {
  onDataImported: (data: ExcelRow[]) => void;
  currentData: any[];
}

export default function ExcelIntegration({ onDataImported, currentData }: ExcelIntegrationProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [excelUrl, setExcelUrl] = useState('');
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');

  // Handle Excel data import via API
  const handleImportToDatabase = async (excelData: any[]) => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/admin/excel/import-serials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
        body: JSON.stringify({ data: excelData })
      });

      if (!response.ok) throw new Error('Import failed');
      
      const result = await response.json();
      
      toast({
        title: "Excel import completed",
        description: `Successfully imported ${result.imported} records. ${result.errors} errors.`,
      });
      
      onDataImported(excelData);
      
    } catch (error) {
      toast({
        title: "Import failed",
        description: "Failed to import data to database. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Upload và parse Excel file
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];

      // Validate và transform data
      const validatedData = validateExcelData(jsonData);
      await handleImportToDatabase(validatedData);
      
      toast({
        title: "Excel file uploaded successfully",
        description: `Imported ${validatedData.length} serial numbers from Excel file.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process Excel file. Please check the format.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Sync với Excel online (Google Sheets, OneDrive, etc.)
  const handleUrlSync = async () => {
    if (!excelUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid Excel file URL.",
        variant: "destructive",
      });
      return;
    }

    setSyncStatus('syncing');
    try {
      let data: ArrayBuffer;
      
      // Nếu URL là Google Sheets, convert sang export format
      let processedUrl = excelUrl;
      if (excelUrl.includes('docs.google.com/spreadsheets')) {
        processedUrl = excelUrl.replace('/edit#gid=', '/export?format=xlsx&gid=').replace('/edit', '/export?format=xlsx');
      }
      
      // Thử download file từ URL với CORS handling
      const response = await fetch(processedUrl, {
        mode: 'cors',
        headers: {
          'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, */*'
        }
      });
      
      if (!response.ok) {
        // Nếu CORS bị block, suggest alternative
        throw new Error(`CORS blocked or file inaccessible. Try: 1) Make file public 2) Use direct download link 3) Upload file instead`);
      }
      
      const blob = await response.blob();
      data = await blob.arrayBuffer();
      
      // Parse Excel data
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];
      
      const validatedData = validateExcelData(jsonData);
      await handleImportToDatabase(validatedData);
      
      setLastSync(new Date().toLocaleString());
      setSyncStatus('success');
      
      toast({
        title: "Sync completed",
        description: `Successfully synced ${validatedData.length} records from Excel online.`,
      });
    } catch (error) {
      setSyncStatus('error');
      toast({
        title: "Sync failed",
        description: error instanceof Error ? error.message : "Unable to sync with Excel file. Please ensure the URL is publicly accessible and supports CORS.",
        variant: "destructive",
      });
    }
  };

  // Export dữ liệu hiện tại ra Excel
  const handleExport = async () => {
    try {
      // Fetch export data from API
      const response = await fetch('/api/admin/excel/export-serials', {
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Export failed');
      
      const result = await response.json();
      const exportData = result.data;

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Serial Numbers');
      
      const fileName = `serial-numbers-${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(workbook, fileName);
      
      toast({
        title: "Export successful",
        description: `${result.count} serial numbers exported to ${fileName}`,
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Failed to export data to Excel file.",
        variant: "destructive",
      });
    }
  };

  // Validate Excel data format
  const validateExcelData = (data: any[]): ExcelRow[] => {
    return data.map(row => ({
      serialNumber: row['Serial Number'] || row['serialNumber'] || '',
      productId: parseInt(row['Product ID'] || row['productId']) || 1,
      location: row['Location'] || row['location'] || '',
      status: row['Status'] || row['status'] || 'active',
      installationDate: row['Installation Date'] || row['installationDate'] || ''
    })).filter(row => row.serialNumber.trim() !== '');
  };

  return (
    <Card className="industrial-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5 text-[hsl(var(--fuji-blue))]" />
          Excel Integration
        </CardTitle>
        <p className="text-sm text-slate-500">
          Import/export serial numbers from Excel files or sync with online Excel sheets
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        
        {/* File Upload Section */}
        <div>
          <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload Excel File
          </h4>
          <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileUpload}
              className="hidden"
            />
            <FileSpreadsheet className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-sm text-slate-500 mb-3">
              Drag and drop your Excel file here, or click to browse
            </p>
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </>
              )}
            </Button>
          </div>
        </div>

        <Separator />

        {/* Online Excel Sync */}
        <div>
          <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Online Excel Sync
          </h4>
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="https://docs.google.com/spreadsheets/d/.../export?format=xlsx"
                value={excelUrl}
                onChange={(e) => setExcelUrl(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleUrlSync}
                disabled={syncStatus === 'syncing'}
                className="bg-[hsl(var(--fuji-blue))] hover:bg-[hsl(var(--fuji-navy))]"
              >
                {syncStatus === 'syncing' ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Syncing...
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Sync Now
                  </>
                )}
              </Button>
            </div>
            
            {lastSync && (
              <div className="flex items-center gap-2 text-sm">
                {syncStatus === 'success' && <CheckCircle className="w-4 h-4 text-green-600" />}
                {syncStatus === 'error' && <AlertTriangle className="w-4 h-4 text-red-600" />}
                <span className="text-slate-500">
                  Last sync: {lastSync}
                </span>
                <Badge variant={syncStatus === 'success' ? 'default' : 'destructive'}>
                  {syncStatus === 'success' ? 'Success' : 'Failed'}
                </Badge>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Export Section */}
        <div>
          <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Current Data
          </h4>
          <p className="text-sm text-slate-500 mb-3">
            Export all current serial numbers to Excel file
          </p>
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Download Excel File
          </Button>
        </div>

        {/* Instructions */}
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            <strong>Excel Format Requirements:</strong>
            <br />
            Your Excel file should contain columns: Serial Number, Product ID, Location, Status, Installation Date
            <br />
            <strong>For Google Sheets:</strong> Use File → Download → Microsoft Excel (.xlsx) or use sharing link with export format
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}