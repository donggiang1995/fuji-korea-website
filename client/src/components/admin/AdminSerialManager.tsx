import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Hash, MapPin, Calendar, Activity, FileSpreadsheet } from 'lucide-react';
import { useAdminQuery, useAdminMutation } from '@/hooks/useAdmin';
import { useToast } from '@/hooks/use-toast';
import { insertSerialNumberSchema, type SerialNumber, type Product } from '@shared/schema';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ExcelIntegration from './ExcelIntegration';

type SerialForm = {
  serialNumber: string;
  productId: number;
  installationDate: string;
  location: string;
  status: string;
};

const defaultFormValues: SerialForm = {
  serialNumber: '',
  productId: 0,
  installationDate: '',
  location: '',
  status: 'active',
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>;
    case 'maintenance':
      return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Maintenance</Badge>;
    case 'inactive':
      return <Badge className="bg-gray-100 text-gray-700 border-gray-200">Inactive</Badge>;
    default:
      return <Badge className="bg-blue-100 text-blue-700 border-blue-200">{status}</Badge>;
  }
};

export default function AdminSerialManager() {
  const { toast } = useToast();
  const [editingSerial, setEditingSerial] = useState<SerialNumber | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showExcelIntegration, setShowExcelIntegration] = useState(false);

  const { data: serialNumbers, isLoading } = useAdminQuery('/api/admin/serial-numbers');
  const { data: products } = useAdminQuery('/api/admin/products');

  const createMutation = useAdminMutation('/api/admin/serial-numbers', 'POST');

  const form = useForm<SerialForm>({
    resolver: zodResolver(insertSerialNumberSchema),
    defaultValues: defaultFormValues,
  });

  const onSubmit = async (data: SerialForm) => {
    try {
      if (editingSerial) {
        const response = await fetch(`/api/admin/serial-numbers/${editingSerial.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminSession')}`,
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to update serial number');
        
        toast({
          title: "Serial number updated",
          description: `${data.serialNumber} has been updated successfully.`,
        });
      } else {
        await createMutation.mutateAsync(data);
        toast({
          title: "Serial number created",
          description: `${data.serialNumber} has been created successfully.`,
        });
      }
      
      setShowForm(false);
      setEditingSerial(null);
      form.reset(defaultFormValues);
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save serial number. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (serial: SerialNumber) => {
    setEditingSerial(serial);
    form.reset({
      serialNumber: serial.serialNumber,
      productId: serial.productId || 0,
      installationDate: serial.installationDate || '',
      location: serial.location || '',
      status: serial.status || 'active',
    });
    setShowForm(true);
  };

  const handleDelete = async (serial: SerialNumber) => {
    if (!confirm(`Are you sure you want to delete serial number ${serial.serialNumber}?`)) return;
    
    try {
      const response = await fetch(`/api/admin/serial-numbers/${serial.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminSession')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to delete serial number');
      
      toast({
        title: "Serial number deleted",
        description: `${serial.serialNumber} has been deleted successfully.`,
      });
      
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete serial number. Please try again.",
        variant: "destructive",
      });
    }
  };

  const startNewSerial = () => {
    setEditingSerial(null);
    form.reset(defaultFormValues);
    setShowForm(true);
  };

  const getProductName = (productId: number | null) => {
    if (!productId) return 'No Product Assigned';
    const product = products?.find((p: Product) => p.id === productId);
    return product?.name || 'Unknown Product';
  };

  // Handle Excel data import
  const handleExcelImport = async (excelData: any[]) => {
    try {
      // Batch create serial numbers from Excel data
      for (const row of excelData) {
        const serialData = {
          serialNumber: row.serialNumber,
          productId: row.productId,
          location: row.location,
          status: row.status,
          installationDate: row.installationDate || null
        };
        
        await createMutation.mutateAsync(serialData);
      }
      
      toast({
        title: "Excel import completed",
        description: `Successfully imported ${excelData.length} serial numbers from Excel.`,
      });
      
      // Refresh data
      window.location.reload();
    } catch (error) {
      toast({
        title: "Import failed",
        description: "Some records failed to import. Please check the data format.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading serial numbers...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Serial Number Management</h2>
          <p className="text-slate-500">Manage elevator serial numbers and tracking</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => setShowExcelIntegration(!showExcelIntegration)}
            className="border-[hsl(var(--fuji-blue))] text-[hsl(var(--fuji-blue))] hover:bg-[hsl(var(--fuji-blue))]/10"
          >
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Excel Integration
          </Button>
          <Button onClick={startNewSerial} className="bg-[hsl(var(--fuji-blue))] hover:bg-[hsl(var(--fuji-navy))]">
            <Plus className="w-4 h-4 mr-2" />
            Add Serial Number
          </Button>
        </div>
      </div>

      {/* Excel Integration Panel */}
      {showExcelIntegration && (
        <ExcelIntegration 
          onDataImported={handleExcelImport}
          currentData={serialNumbers || []}
        />
      )}

      {/* Serial Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>
              {editingSerial ? 'Edit Serial Number' : 'Add New Serial Number'}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="serialNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Serial Number</FormLabel>
                    <FormControl>
                      <Input placeholder="FCA-9000-2024-001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="productId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product</FormLabel>
                    <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {products?.map((product: Product) => (
                          <SelectItem key={product.id} value={product.id.toString()}>
                            {product.name} ({product.model})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="installationDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Installation Date</FormLabel>
                      <FormControl>
                        <Input 
                          type="text" 
                          placeholder="YYYY (e.g. 2024)"
                          pattern="[0-9]{4}"
                          maxLength={4}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Installation Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Seoul, South Korea" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={createMutation.isPending}
                  className="bg-[hsl(var(--fuji-blue))] hover:bg-[hsl(var(--fuji-navy))]"
                >
                  {createMutation.isPending 
                    ? 'Saving...' 
                    : editingSerial ? 'Update Serial Number' : 'Create Serial Number'
                  }
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Serial Numbers List */}
      <div className="grid gap-4">
        {serialNumbers?.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Hash className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-lg mb-4">No serial numbers found</p>
              <Button onClick={startNewSerial} className="text-[#ffffff] bg-[#0079f2]">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Serial Number
              </Button>
            </CardContent>
          </Card>
        ) : (
          serialNumbers?.map((serial: SerialNumber) => (
            <Card key={serial.id} className="industrial-card">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                      <Hash className="w-8 h-8 text-slate-600" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-900">{serial.serialNumber}</h3>
                        {getStatusBadge(serial.status || 'active')}
                      </div>
                      
                      <p className="text-slate-600 mb-2">{getProductName(serial.productId)}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        {serial.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {serial.location}
                          </div>
                        )}
                        {serial.installationDate && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {serial.installationDate}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleEdit(serial)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleDelete(serial)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}