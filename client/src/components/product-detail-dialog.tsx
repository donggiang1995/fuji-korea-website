import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/components/language-provider';
import { MapPin, Calendar, Check, Cpu, Settings } from 'lucide-react';

interface ProductDetailDialogProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetailDialog({ product, isOpen, onClose }: ProductDetailDialogProps) {
  const { language } = useLanguage();

  if (!product) return null;

  const parseFeatures = (features: string | any[]) => {
    if (Array.isArray(features)) return features;
    try {
      return JSON.parse(features);
    } catch {
      return [];
    }
  };

  const parseSpecifications = (specs: string | Record<string, any>) => {
    if (typeof specs === 'object' && specs !== null) return specs;
    try {
      return JSON.parse(specs);
    } catch {
      return {};
    }
  };

  const productFeatures = parseFeatures(product.features);
  const productSpecs = parseSpecifications(product.specifications);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[hsl(var(--industrial-dark))]">
            {product.name}
          </DialogTitle>
          <DialogDescription>
            {language === 'ko' ? '제품 상세 정보를 확인하세요' : 'View detailed product information'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Image and Basic Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="w-full h-64 rounded-xl overflow-hidden bg-gradient-to-br from-[hsl(var(--industrial-light))] to-[hsl(var(--fuji-silver))]">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
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
            </div>

            <div className="space-y-4">
              <div>
                <Badge variant="outline" className="mb-2">
                  {product.category === 'control' ? 
                    (language === 'ko' ? '제어 시스템' : 'Control System') :
                    (language === 'ko' ? '트랙션 머신' : 'Traction Machine')
                  }
                </Badge>
                <p className="text-sm font-medium text-[hsl(var(--fuji-steel))] mb-3">
                  {language === 'ko' ? '모델: ' : 'Model: '}{product.model}
                </p>
                <p className="text-[hsl(var(--fuji-steel))] leading-relaxed">
                  {language === 'ko' ? product.descriptionKo : product.descriptionEn}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Specifications and Features */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Specifications */}
            {Object.keys(productSpecs).length > 0 && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-[hsl(var(--industrial-dark))]">
                  {language === 'ko' ? '주요 사양' : 'Specifications'}
                </h4>
                <div className="industrial-card p-4">
                  <div className="space-y-3">
                    {Object.entries(productSpecs).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="font-medium text-[hsl(var(--fuji-steel))] capitalize">{key}:</span>
                        <span className="text-[hsl(var(--industrial-dark))] font-medium">{value as string}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Features */}
            {productFeatures.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-[hsl(var(--industrial-dark))]">
                  {language === 'ko' ? '주요 기능' : 'Key Features'}
                </h4>
                <div className="industrial-card p-4">
                  <ul className="space-y-3">
                    {productFeatures.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-[hsl(var(--fuji-blue))] mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-[hsl(var(--fuji-steel))]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <Button onClick={onClose} variant="outline">
              {language === 'ko' ? '닫기' : 'Close'}
            </Button>
            <Button className="industrial-button text-white">
              {language === 'ko' ? '문의하기' : 'Contact Us'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}