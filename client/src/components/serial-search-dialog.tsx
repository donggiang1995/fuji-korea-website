import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Calendar, Wrench, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';

interface SerialSearchResult {
  serialNumber: {
    id: number;
    serialNumber: string;
    productId: number;
    installationDate: string | null;
    location: string | null;
    status: string;
    createdAt: string;
  };
  product: {
    id: number;
    name: string;
    category: string;
    model: string;
    image: string;
    specifications: string;
    features: string;
    descriptionKo: string;
    descriptionEn: string;
  };
}

interface SerialSearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  result: SerialSearchResult | null;
  isLoading: boolean;
  error: string | null;
  searchValue: string;
}

export function SerialSearchDialog({ 
  isOpen, 
  onClose, 
  result, 
  isLoading, 
  error, 
  searchValue 
}: SerialSearchDialogProps) {
  const { language } = useLanguage();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'maintenance':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'retired':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    if (language === 'ko') {
      switch (status) {
        case 'active': return '정상 운행';
        case 'maintenance': return '정비 중';
        case 'retired': return '운행 중단';
        default: return '알 수 없음';
      }
    } else {
      switch (status) {
        case 'active': return 'Original';
        case 'maintenance': return 'Under Maintenance';
        case 'retired': return 'Retired';
        default: return 'Unknown';
      }
    }
  };

  const parseSpecifications = (specs: string) => {
    try {
      return JSON.parse(specs);
    } catch {
      return {};
    }
  };

  const parseFeatures = (features: string) => {
    try {
      return JSON.parse(features);
    } catch {
      return [];
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[hsl(var(--industrial-dark))]">
            {language === 'ko' ? '시리얼 번호 검색 결과' : 'Serial Number Search Result'}
          </DialogTitle>
          <DialogDescription>
            {language === 'ko' 
              ? '입력하신 시리얼 번호에 대한 상세 정보를 확인하세요.' 
              : 'View detailed information for the searched serial number.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {isLoading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[hsl(var(--fuji-blue))] mx-auto"></div>
              <p className="mt-2 text-[hsl(var(--fuji-steel))]">
                {language === 'ko' ? '검색 중...' : 'Searching...'}
              </p>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
              <p className="text-red-600 font-medium">
                {language === 'ko' ? '검색에 실패했습니다' : 'Search failed'}
              </p>
              <p className="text-sm text-[hsl(var(--fuji-steel))] mt-1">{error}</p>
            </div>
          )}

          {!isLoading && !error && !result && searchValue && (
            <div className="text-center py-8">
              <XCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-[hsl(var(--fuji-steel))] font-medium">
                {language === 'ko' ? 
                  `시리얼 번호 "${searchValue}"를 찾을 수 없습니다` : 
                  `Serial number "${searchValue}" not found`
                }
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              {/* Serial Number Info */}
              <div className="industrial-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[hsl(var(--industrial-dark))]">
                    {language === 'ko' ? '시리얼 번호 정보' : 'Serial Number Information'}
                  </h3>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(result.serialNumber.status)}
                    <Badge variant={result.serialNumber.status === 'active' ? 'default' : 'secondary'}>
                      {getStatusText(result.serialNumber.status)}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[hsl(var(--fuji-blue))] rounded-full"></div>
                    <span className="font-semibold text-[hsl(var(--industrial-dark))]">
                      {result.serialNumber.serialNumber}
                    </span>
                  </div>
                  
                  {result.serialNumber.location && (
                    <div className="flex items-center space-x-3 text-[hsl(var(--fuji-steel))]">
                      <MapPin className="w-4 h-4" />
                      <span>{result.serialNumber.location}</span>
                    </div>
                  )}
                  
                  {result.serialNumber.installationDate && (
                    <div className="flex items-center space-x-3 text-[hsl(var(--fuji-steel))]">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {language === 'ko' ? '설치일: ' : 'Installation Date: '}
                        {result.serialNumber.installationDate}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Product Info */}
              <div className="industrial-card p-6 relative">
                <h3 className="text-lg font-bold text-[hsl(var(--industrial-dark))] mb-4">
                  {language === 'ko' ? '제품 정보' : 'Product Information'}
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-[hsl(var(--industrial-dark))] mb-2">
                        {result.product.name}
                      </h4>
                      <p className="text-sm text-[hsl(var(--fuji-steel))]">
                        {language === 'ko' ? result.product.descriptionKo : result.product.descriptionEn}
                      </p>
                    </div>
                    
                    <div>
                      <Badge variant="outline" className="mb-2">
                        {result.product.category === 'control' ? 
                          (language === 'ko' ? '제어 시스템' : 'Control System') :
                          (language === 'ko' ? '트랙션 머신' : 'Traction Machine')
                        }
                      </Badge>
                      <p className="text-sm text-[hsl(var(--fuji-steel))]">
                        {language === 'ko' ? '모델: ' : 'Model: '}{result.product.model}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-[hsl(var(--industrial-dark))] mb-2">
                        {language === 'ko' ? '주요 사양' : 'Specifications'}
                      </h5>
                      <div className="space-y-1">
                        {Object.entries(parseSpecifications(result.product.specifications)).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-sm">
                            <span className="text-[hsl(var(--fuji-steel))] capitalize">{key}:</span>
                            <span className="text-[hsl(var(--industrial-dark))] font-medium">{value as string}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-[hsl(var(--industrial-dark))] mb-2">
                        {language === 'ko' ? '주요 기능' : 'Key Features'}
                      </h5>
                      <div className="space-y-1">
                        {parseFeatures(result.product.features).map((feature: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-1 h-1 bg-[hsl(var(--fuji-orange))] rounded-full"></div>
                            <span className="text-sm text-[hsl(var(--fuji-steel))]">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Image - Small corner image */}
                <div className="absolute bottom-4 right-4">
                  <div className="w-40 h-40 rounded-lg overflow-hidden border-2 border-white shadow-lg">
                    <img 
                      src={result.product.image} 
                      alt={result.product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = '<div class="w-full h-full bg-gray-100 flex items-center justify-center"><svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>';
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button onClick={onClose} variant="outline">
              {language === 'ko' ? '닫기' : 'Close'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}