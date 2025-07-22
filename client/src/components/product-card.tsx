import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { ProductData } from '@/data/products';
import { useLanguage } from '@/components/language-provider';

interface ProductCardProps {
  product: ProductData;
  onViewDetails?: (product: ProductData) => void;
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { language, t } = useLanguage();

  return (
    <Card className="group hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-sm mx-auto h-auto object-contain"
          />
        </div>
        
        <div className="mb-4">
          <Badge variant="secondary" className="mb-2">
            {product.category === 'control' ? t.products.control : t.products.traction}
          </Badge>
          <h3 className="text-xl font-bold text-slate-900 mb-2">{product.name}</h3>
          <p className="text-slate-600 text-sm">
            {language === 'ko' ? product.descriptionKo : product.descriptionEn}
          </p>
        </div>

        {/* Features */}
        {product.features.length > 0 && (
          <div className="mb-6">
            <ul className="space-y-2">
              {product.features.slice(0, 4).map((feature, index) => (
                <li key={index} className="flex items-start text-sm">
                  <Check className="h-4 w-4 text-[hsl(var(--fuji-blue))] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Specifications */}
        {Object.keys(product.specifications).length > 0 && (
          <div className="mb-6">
            <div className="space-y-2">
              {Object.entries(product.specifications).slice(0, 3).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="font-medium text-slate-700">{key}:</span>
                  <span className="text-slate-600">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button
          className="w-full"
          onClick={() => onViewDetails?.(product)}
        >
          {t.products.viewDetails}
        </Button>
      </CardContent>
    </Card>
  );
}
