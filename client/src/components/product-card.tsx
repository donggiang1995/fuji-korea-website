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
          <div className="w-full aspect-square rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-[hsl(var(--industrial-light))] to-[hsl(var(--fuji-silver))]">
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 bg-white p-4"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="w-full h-full bg-gradient-to-br from-[hsl(var(--industrial-light))] to-[hsl(var(--fuji-silver))] flex items-center justify-center">
                        ${product.category === 'control' ? 
                          '<svg class="w-16 h-16 text-[hsl(var(--fuji-blue))]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>' : 
                          '<svg class="w-16 h-16 text-[hsl(var(--fuji-orange))]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>'
                        }
                      </div>
                    `;
                  }
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[hsl(var(--industrial-light))] to-[hsl(var(--fuji-silver))] flex items-center justify-center">
                {product.category === 'control' ? (
                  <Cpu className="w-16 h-16 text-[hsl(var(--fuji-blue))]" />
                ) : (
                  <Settings className="w-16 h-16 text-[hsl(var(--fuji-orange))]" />
                )}
              </div>
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
