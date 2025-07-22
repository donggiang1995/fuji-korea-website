import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from '@/components/product-card';
import { useLanguage } from '@/components/language-provider';
import { productsData, ProductData } from '@/data/products';

export default function Products() {
  const { t, language } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);

  const controlProducts = productsData.filter(p => p.category === 'control');
  const tractionProducts = productsData.filter(p => p.category === 'traction');

  const handleViewDetails = (product: ProductData) => {
    setSelectedProduct(product);
    // In a real app, this would navigate to a product detail page
    alert(`Viewing details for ${product.name}`);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">{t.products.title}</h1>
          <p className="text-xl text-slate-600">{t.products.subtitle}</p>
        </div>

        {/* Product Categories */}
        <Tabs defaultValue="control" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="control">{t.products.control}</TabsTrigger>
            <TabsTrigger value="traction">{t.products.traction}</TabsTrigger>
          </TabsList>

          {/* Control Systems */}
          <TabsContent value="control">
            <div className="grid lg:grid-cols-2 gap-8">
              {controlProducts.map((product) => (
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
              {tractionProducts.slice(0, 3).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
            
            {/* Additional FJK2 Models */}
            <div className="grid lg:grid-cols-2 gap-8">
              {tractionProducts.slice(3).map((product) => (
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
    </div>
  );
}
