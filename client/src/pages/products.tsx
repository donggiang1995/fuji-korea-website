import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from '@/components/product-card';
import { ProductDetailDialog } from '@/components/product-detail-dialog';
import { useLanguage } from '@/components/language-provider';
import { useQuery } from '@tanstack/react-query';
import { Loader2, Cpu, Settings } from 'lucide-react';

export default function Products() {
  const { t, language } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['/api/products'],
  });

  const productList = products as any[];
  const controlProducts = productList.filter((p) => p.category === 'control');
  const tractionProducts = productList.filter((p) => p.category === 'traction');

  const handleViewDetails = (product: any) => {
    setSelectedProduct(product);
    setIsDetailDialogOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailDialogOpen(false);
    setSelectedProduct(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[hsl(var(--fuji-blue))] mx-auto mb-4" />
          <p className="text-[hsl(var(--fuji-steel))]">
            {language === 'ko' ? '제품 정보를 불러오는 중...' : 'Loading products...'}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            {language === 'ko' ? '제품 정보를 불러올 수 없습니다.' : 'Failed to load products.'}
          </p>
          <Button onClick={() => window.location.reload()}>
            {language === 'ko' ? '다시 시도' : 'Retry'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4 flex items-center justify-center gap-3">
            <Settings className="w-8 h-8 text-[hsl(var(--fuji-blue))]" />
            {t.products.title}
          </h1>
          <p className="text-xl text-slate-600">{t.products.subtitle}</p>
        </div>

        {/* Product Categories */}
        <Tabs defaultValue="control" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="control" className="flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              {t.products.control}
            </TabsTrigger>
            <TabsTrigger value="traction" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              {t.products.traction}
            </TabsTrigger>
          </TabsList>

          {/* Control Systems */}
          <TabsContent value="control">
            <div className="grid lg:grid-cols-2 gap-8">
              {controlProducts.map((product: any) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </TabsContent>

          {/* Traction Machines */}
          <TabsContent value="traction">
            <div className="grid lg:grid-cols-3 gap-8 mb-8">
              {tractionProducts.slice(0, 3).map((product: any) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
            
            {/* Additional Models */}
            <div className="grid lg:grid-cols-2 gap-8">
              {tractionProducts.slice(3).map((product: any) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-slate-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              {language === 'ko' ? '더 자세한 정보가 필요하신가요?' : 'Need more detailed information?'}
            </h2>
            <p className="text-slate-600 mb-6">
              {language === 'ko'
                ? '저희 전문가들이 귀하의 프로젝트에 최적화된 솔루션을 제안해 드립니다.'
                : 'Our experts can propose solutions optimized for your project.'}
            </p>
            <Button size="lg" className="bg-[hsl(var(--fuji-blue))] hover:bg-blue-700">
              {language === 'ko' ? '전문가와 상담하기' : 'Consult with Expert'}
            </Button>
          </div>
        </div>
      </div>

      {/* Product Detail Dialog */}
      <ProductDetailDialog 
        product={selectedProduct}
        isOpen={isDetailDialogOpen}
        onClose={handleCloseDetail}
      />
    </div>
  );
}
