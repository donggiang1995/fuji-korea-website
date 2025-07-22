import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Cpu, Settings, Zap } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';

interface ProductCardProps {
  product: any; // Database product type
  onViewDetails?: (product: any) => void;
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { language, t } = useLanguage();

  const parseFeatures = (features: string) => {
    try {
      return JSON.parse(features);
    } catch {
      return [];
    }
  };

  const parseSpecifications = (specs: string) => {
    try {
      return JSON.parse(specs);
    } catch {
      return {};
    }
  };

  const productFeatures = parseFeatures(product.features);
  const productSpecs = parseSpecifications(product.specifications);

  return (
    <Card className="group hover:shadow-xl transition-shadow duration-300 industrial-card">
      <CardContent className="p-6">
        <div className="text-center mb-6 relative">
          <div className="w-full h-48 bg-gradient-to-br from-[hsl(var(--industrial-light))] to-[hsl(var(--fuji-silver))] rounded-xl flex items-center justify-center mb-4">
            {product.category === 'control' ? (
              <Cpu className="w-16 h-16 text-[hsl(var(--fuji-blue))]" />
            ) : (
              <Settings className="w-16 h-16 text-[hsl(var(--fuji-orange))]" />
            )}
          </div>
          <div className="absolute top-2 right-2">
            <Zap className="w-5 h-5 text-[hsl(var(--fuji-gold))]" />
          </div>
        </div>
        
        <div className="mb-4">
          <Badge variant="secondary" className="mb-2 font-semibold">
            {product.category === 'control' ? 
              (language === 'ko' ? '제어 시스템' : 'Control System') : 
              (language === 'ko' ? '트랙션 머신' : 'Traction Machine')
            }
          </Badge>
          <h3 className="text-xl font-bold text-[hsl(var(--industrial-dark))] mb-2">{product.name}</h3>
          <p className="text-sm font-medium text-[hsl(var(--fuji-steel))] mb-2">
            {language === 'ko' ? '모델: ' : 'Model: '}{product.model}
          </p>
          <p className="text-[hsl(var(--fuji-steel))] text-sm">
            {language === 'ko' ? product.descriptionKo : product.descriptionEn}
          </p>
        </div>

        {/* Features */}
        {productFeatures.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold text-[hsl(var(--industrial-dark))] text-sm mb-3">
              {language === 'ko' ? '주요 기능' : 'Key Features'}
            </h4>
            <ul className="space-y-2">
              {productFeatures.slice(0, 4).map((feature: string, index: number) => (
                <li key={index} className="flex items-start text-sm">
                  <Check className="h-4 w-4 text-[hsl(var(--fuji-blue))] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-[hsl(var(--fuji-steel))]">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Specifications */}
        {Object.keys(productSpecs).length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold text-[hsl(var(--industrial-dark))] text-sm mb-3">
              {language === 'ko' ? '주요 사양' : 'Specifications'}
            </h4>
            <div className="space-y-2">
              {Object.entries(productSpecs).slice(0, 3).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="font-medium text-[hsl(var(--fuji-steel))] capitalize">{key}:</span>
                  <span className="text-[hsl(var(--industrial-dark))] font-medium">{value as string}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button
          className="w-full industrial-button text-white font-semibold"
          onClick={() => onViewDetails?.(product)}
        >
          {language === 'ko' ? '상세 정보' : 'View Details'}
        </Button>
      </CardContent>
    </Card>
  );
}
