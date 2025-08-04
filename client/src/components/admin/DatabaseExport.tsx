import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Database, FileText, Loader2 } from 'lucide-react';
import { useAdminQuery } from '@/hooks/useAdmin';
import { useToast } from '@/hooks/use-toast';

export default function DatabaseExport() {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState<'json' | 'sql' | null>(null);

  const { data: products } = useAdminQuery('/api/admin/products');
  const { data: serialNumbers } = useAdminQuery('/api/admin/serial-numbers');
  const { data: inquiries } = useAdminQuery('/api/admin/inquiries');

  const handleExport = async (type: 'json' | 'sql') => {
    setIsExporting(true);
    setExportType(type);
    
    try {
      const response = await fetch(`/api/admin/export-database?format=${type}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminSession')}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Export failed');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `fuji-database-export-${new Date().toISOString().split('T')[0]}.${type}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Export thành công",
        description: `Database đã được export thành file ${type.toUpperCase()}`,
      });
      
    } catch (error) {
      toast({
        title: "Export thất bại",
        description: "Có lỗi xảy ra khi export database",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  const totalRecords = (products?.length || 0) + (serialNumbers?.length || 0) + (inquiries?.length || 0);

  return (
    <Card className="industrial-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5" />
          Database Export
        </CardTitle>
        <p className="text-slate-600">Xuất toàn bộ database để import vào project khác</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Database Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{products?.length || 0}</div>
            <div className="text-sm text-slate-600">Products</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{serialNumbers?.length || 0}</div>
            <div className="text-sm text-slate-600">Serial Numbers</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{inquiries?.length || 0}</div>
            <div className="text-sm text-slate-600">Inquiries</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{totalRecords}</div>
            <div className="text-sm text-slate-600">Total Records</div>
          </div>
        </div>

        {/* Export Options */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900">Export Formats</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            {/* JSON Export */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <div>
                  <h4 className="font-medium text-slate-900">JSON Format</h4>
                  <p className="text-sm text-slate-600">Dễ đọc, import vào JavaScript/Node.js</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="text-xs">Structured Data</Badge>
                <Badge variant="outline" className="text-xs">Easy Parse</Badge>
              </div>
              <Button 
                onClick={() => handleExport('json')}
                disabled={isExporting}
                className="w-full"
                variant="outline"
              >
                {isExporting && exportType === 'json' ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download JSON
                  </>
                )}
              </Button>
            </div>

            {/* SQL Export */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Database className="w-5 h-5 text-green-600" />
                <div>
                  <h4 className="font-medium text-slate-900">SQL Format</h4>
                  <p className="text-sm text-slate-600">Import trực tiếp vào PostgreSQL</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="text-xs">Ready to Import</Badge>
                <Badge variant="outline" className="text-xs">Complete Schema</Badge>
              </div>
              <Button 
                onClick={() => handleExport('sql')}
                disabled={isExporting}
                className="w-full"
                variant="outline"
              >
                {isExporting && exportType === 'sql' ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download SQL
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <h4 className="font-medium text-slate-900 mb-2">Hướng dẫn sử dụng:</h4>
          <ul className="text-sm text-slate-600 space-y-1">
            <li><strong>JSON:</strong> Import vào ứng dụng Node.js, seed data, hoặc xử lý với JavaScript</li>
            <li><strong>SQL:</strong> Chạy lệnh <code className="bg-slate-200 px-1 rounded">psql -d database_name &lt; file.sql</code></li>
            <li>Files bao gồm toàn bộ cấu trúc bảng và dữ liệu (trừ mật khẩu admin)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}