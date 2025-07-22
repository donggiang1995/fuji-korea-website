import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LogOut, 
  Package, 
  Hash, 
  MessageSquare, 
  Settings,
  Plus,
  Edit,
  Trash2,
  Shield,
  BarChart3
} from 'lucide-react';
import { useAdmin, useAdminQuery } from '@/hooks/useAdmin';
import { useToast } from '@/hooks/use-toast';
import AdminProductManager from '@/components/admin/AdminProductManager';
import AdminSerialManager from '@/components/admin/AdminSerialManager';
import AdminInquiries from '@/components/admin/AdminInquiries';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const { admin, logout, isLoggingOut } = useAdmin();
  const { toast } = useToast();
  
  // Fetch admin data
  const { data: products } = useAdminQuery('/api/admin/products');
  const { data: serialNumbers } = useAdminQuery('/api/admin/serial-numbers');
  const { data: inquiries } = useAdminQuery('/api/admin/inquiries');

  const handleLogout = () => {
    logout();
    onLogout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[hsl(var(--fuji-blue))] rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
                <p className="text-slate-500">FUJI Global Korea Management System</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900">{admin?.username}</p>
                <Badge className="bg-[hsl(var(--fuji-blue))]/10 text-[hsl(var(--fuji-blue))] border-0">
                  {admin?.role}
                </Badge>
              </div>
              
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex items-center gap-2"
                disabled={isLoggingOut}
              >
                <LogOut className="w-4 h-4" />
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="industrial-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Products</p>
                  <p className="text-3xl font-bold text-slate-900">{products?.length || 0}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="industrial-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Serial Numbers</p>
                  <p className="text-3xl font-bold text-slate-900">{serialNumbers?.length || 0}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Hash className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="industrial-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Inquiries</p>
                  <p className="text-3xl font-bold text-slate-900">{inquiries?.length || 0}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="industrial-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Active Systems</p>
                  <p className="text-3xl font-bold text-slate-900">
                    {serialNumbers?.filter(s => s.status === 'active')?.length || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="serials" className="flex items-center gap-2">
              <Hash className="w-4 h-4" />
              Serial Numbers
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Inquiries
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <AdminProductManager />
          </TabsContent>

          <TabsContent value="serials">
            <AdminSerialManager />
          </TabsContent>

          <TabsContent value="inquiries">
            <AdminInquiries />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}