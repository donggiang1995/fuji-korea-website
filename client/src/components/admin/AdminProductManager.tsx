import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Package, Cpu, Settings, Zap } from 'lucide-react';
import { useAdminQuery, useAdminMutation } from '@/hooks/useAdmin';
import { useToast } from '@/hooks/use-toast';
import { insertProductSchema, type Product } from '@shared/schema';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

type ProductForm = {
  name: string;
  category: string;
  model: string;
  image: string;
  specifications: Record<string, string>;
  features: string[];
  descriptionKo: string;
  descriptionEn: string;
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'control':
      return <Cpu className="w-5 h-5" />;
    case 'traction':
      return <Settings className="w-5 h-5" />;
    default:
      return <Zap className="w-5 h-5" />;
  }
};

const defaultFormValues: ProductForm = {
  name: '',
  category: '',
  model: '',
  image: '',
  specifications: {},
  features: [],
  descriptionKo: '',
  descriptionEn: '',
};

export default function AdminProductManager() {
  const { toast } = useToast();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { data: products, isLoading } = useAdminQuery('/api/admin/products');

  const createMutation = useAdminMutation('/api/admin/products', 'POST');
  const updateMutation = useAdminMutation('', 'PUT'); // We'll set the URL dynamically
  const deleteMutation = useAdminMutation('', 'DELETE'); // We'll set the URL dynamically

  const form = useForm<ProductForm>({
    resolver: zodResolver(insertProductSchema),
    defaultValues: defaultFormValues,
  });

  const onSubmit = async (data: ProductForm) => {
    try {
      if (editingProduct) {
        await updateMutation.mutateAsync(data, {
          mutationFn: async (formData) => {
            const response = await fetch(`/api/admin/products/${editingProduct.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('adminSession')}`,
              },
              body: JSON.stringify(formData),
            });
            if (!response.ok) throw new Error('Failed to update product');
            return response.json();
          },
        });
        toast({
          title: "Product updated",
          description: `${data.name} has been updated successfully.`,
        });
      } else {
        await createMutation.mutateAsync(data);
        toast({
          title: "Product created",
          description: `${data.name} has been created successfully.`,
        });
      }
      
      setShowForm(false);
      setEditingProduct(null);
      form.reset(defaultFormValues);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save product. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    form.reset({
      name: product.name,
      category: product.category,
      model: product.model,
      image: product.image,
      specifications: product.specifications as Record<string, string> || {},
      features: product.features as string[] || [],
      descriptionKo: product.descriptionKo || '',
      descriptionEn: product.descriptionEn || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (product: Product) => {
    if (!confirm(`Are you sure you want to delete ${product.name}?`)) return;
    
    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminSession')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to delete product');
      
      toast({
        title: "Product deleted",
        description: `${product.name} has been deleted successfully.`,
      });
      
      // Refetch products
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      });
    }
  };

  const startNewProduct = () => {
    setEditingProduct(null);
    form.reset(defaultFormValues);
    setShowForm(true);
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Product Management</h2>
          <p className="text-slate-500">Manage elevator products and specifications</p>
        </div>
        <Button onClick={startNewProduct} className="bg-[hsl(var(--fuji-blue))] hover:bg-[hsl(var(--fuji-navy))]">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Product Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="FCA-9000 Series" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="control">Control System</SelectItem>
                          <SelectItem value="traction">Traction Machine</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model</FormLabel>
                      <FormControl>
                        <Input placeholder="FCA-9000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/image.jpg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="descriptionKo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Korean Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="한국어 제품 설명을 입력하세요..."
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="descriptionEn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>English Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter product description in English..."
                        className="min-h-[100px]"
                        {...field} 
                      />
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
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="bg-[hsl(var(--fuji-blue))] hover:bg-[hsl(var(--fuji-navy))]"
                >
                  {createMutation.isPending || updateMutation.isPending 
                    ? 'Saving...' 
                    : editingProduct ? 'Update Product' : 'Create Product'
                  }
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Products List */}
      <div className="grid gap-4">
        {products?.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-lg mb-4">No products found</p>
              <Button onClick={startNewProduct} className="bg-[hsl(var(--fuji-blue))] hover:bg-[hsl(var(--fuji-navy))]">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Product
              </Button>
            </CardContent>
          </Card>
        ) : (
          products?.map((product: Product) => (
            <Card key={product.id} className="industrial-card">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                      {getCategoryIcon(product.category)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
                        <Badge 
                          className={
                            product.category === 'control' 
                              ? "bg-blue-100 text-blue-700 border-blue-200" 
                              : "bg-green-100 text-green-700 border-green-200"
                          }
                        >
                          {product.category === 'control' ? 'Control System' : 'Traction Machine'}
                        </Badge>
                      </div>
                      
                      <p className="text-slate-600 mb-2">{product.model}</p>
                      <p className="text-sm text-slate-500 line-clamp-2">
                        {product.descriptionEn || product.descriptionKo || 'No description available'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleEdit(product)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleDelete(product)}
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