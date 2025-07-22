import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, Award, Globe, Target, Lightbulb, Zap, Shield, Cpu, TrendingUp, Calendar, MapPin } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';

export default function About() {
  const { language } = useLanguage();

  const content = {
    ko: {
      title: '회사소개',
      subtitle: 'FUJI Global Korea에 대해 알아보세요',
      description: '후지글로벌(주)는 서울특별시 광진구 광나루로에 위치하고 있습니다. 일본의 선진 기술과 우수한 장비, 용기와 야망의 힘을 계승하여 클래식 엘리베이터 브랜드 정신을 창조하고 끊임없는 추구와 끊임없이 탐구합니다.',
      foundedYear: '1995',
      employees: '500+',
      locations: '15',
      projects: '2000+',
      vision: {
        title: '비전',
        description: '전 세계 엘리베이터 산업의 혁신을 주도하는 글로벌 리더가 되겠습니다. 지속 가능한 기술 혁신과 고객 중심의 서비스로 더 안전하고 스마트한 도시 환경을 만들어갑니다.'
      },
      mission: {
        title: '사명',
        description: '최첨단 기술과 품질을 통해 고객에게 안전하고 편리한 수직 교통 솔루션을 제공합니다. IoT, AI, 빅데이터 기술을 활용하여 엘리베이터 산업의 디지털 전환을 선도합니다.'
      },
      history: {
        title: '연혁',
        events: [
          { year: '1995', event: '후지글로벌 코리아 설립' },
          { year: '2005', event: '스마트 엘리베이터 제어 시스템 개발' },
          { year: '2015', event: 'IoT 기반 원격 모니터링 시스템 도입' },
          { year: '2020', event: 'AI 예측 유지보수 시스템 출시' },
          { year: '2024', event: '차세대 그린 엘리베이터 기술 특허 취득' }
        ]
      },
      technologies: [
        { icon: Zap, title: 'IoT 통합', description: '실시간 모니터링 및 원격 제어 시스템' },
        { icon: Cpu, title: 'AI 예측 분석', description: '고장 예측 및 예방적 유지보수' },
        { icon: Shield, title: '안전 시스템', description: '다중 안전 장치 및 비상 대응 시스템' },
        { icon: TrendingUp, title: '에너지 효율', description: '친환경 저전력 드라이브 시스템' }
      ],
      values: [
        { icon: Building2, title: '혁신', description: '지속적인 기술 혁신을 통해 업계를 선도합니다.' },
        { icon: Users, title: '고객 중심', description: '고객의 요구를 최우선으로 생각하며 서비스를 제공합니다.' },
        { icon: Award, title: '품질', description: '최고 품질의 제품과 서비스를 보장합니다.' },
        { icon: Globe, title: '글로벌', description: '전 세계 시장에서 경쟁력 있는 솔루션을 제공합니다.' }
      ]
    },
    en: {
      title: 'About Us',
      subtitle: 'Learn about FUJI Global Korea',
      description: 'FUJI Global Co., Ltd. is located in Gwangjin-gu, Seoul. Inheriting the power of Japan\'s advanced technology, excellent equipment, courage and ambition, we create the classic elevator brand spirit and continuously pursue and explore.',
      foundedYear: '1995',
      employees: '500+',
      locations: '15',
      projects: '2000+',
      vision: {
        title: 'Vision',
        description: 'To become a global leader driving innovation in the elevator industry worldwide. Creating safer and smarter urban environments through sustainable technological innovation and customer-centric services.'
      },
      mission: {
        title: 'Mission',
        description: 'To provide safe and convenient vertical transportation solutions to customers through cutting-edge technology and quality. Leading the digital transformation of the elevator industry using IoT, AI, and big data technologies.'
      },
      history: {
        title: 'History',
        events: [
          { year: '1995', event: 'FUJI Global Korea established' },
          { year: '2005', event: 'Smart elevator control system development' },
          { year: '2015', event: 'IoT-based remote monitoring system introduction' },
          { year: '2020', event: 'AI predictive maintenance system launch' },
          { year: '2024', event: 'Next-generation green elevator technology patent acquisition' }
        ]
      },
      technologies: [
        { icon: Zap, title: 'IoT Integration', description: 'Real-time monitoring and remote control systems' },
        { icon: Cpu, title: 'AI Predictive Analytics', description: 'Failure prediction and preventive maintenance' },
        { icon: Shield, title: 'Safety Systems', description: 'Multiple safety devices and emergency response systems' },
        { icon: TrendingUp, title: 'Energy Efficiency', description: 'Eco-friendly low-power drive systems' }
      ],
      values: [
        { icon: Building2, title: 'Innovation', description: 'Leading the industry through continuous technological innovation.' },
        { icon: Users, title: 'Customer Focus', description: 'Prioritizing customer needs in all our services.' },
        { icon: Award, title: 'Quality', description: 'Ensuring the highest quality products and services.' },
        { icon: Globe, title: 'Global', description: 'Providing competitive solutions in global markets.' }
      ]
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">{t.title}</h1>
          <p className="text-xl text-slate-600">{t.subtitle}</p>
        </div>

        {/* Company Introduction */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">FUJI Global Korea</h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-8">
              {t.description}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{t.vision.title}</h3>
                  <p className="text-slate-600">{t.vision.description}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{t.mission.title}</h3>
                  <p className="text-slate-600">{t.mission.description}</p>
                </CardContent>
              </Card>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1577495508048-b635879837f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="FUJI Global Korea Office"
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            {language === 'ko' ? '핵심 가치' : 'Core Values'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.values.map((value) => {
              const Icon = value.icon;
              return (
                <Card key={value.title} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8">
                    <div className="bg-[hsl(var(--fuji-blue))]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-[hsl(var(--fuji-blue))]" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                    <p className="text-slate-600">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Company Timeline */}
        <div className="bg-slate-50 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            {language === 'ko' ? '회사 연혁' : 'Company History'}
          </h2>
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="bg-[hsl(var(--fuji-blue))] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold mr-6 flex-shrink-0">
                2020
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {language === 'ko' ? '회사 설립' : 'Company Establishment'}
                </h3>
                <p className="text-slate-600">
                  {language === 'ko'
                    ? '서울특별시 광진구에 후지글로벌(주) 설립'
                    : 'FUJI Global Co., Ltd. established in Gwangjin-gu, Seoul'}
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-[hsl(var(--fuji-sky))] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold mr-6 flex-shrink-0">
                2022
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {language === 'ko' ? '기술 혁신' : 'Technology Innovation'}
                </h3>
                <p className="text-slate-600">
                  {language === 'ko'
                    ? 'FJE1, FJE2 스마트 엘리베이터 시스템 개발 완료'
                    : 'Completed development of FJE1, FJE2 smart elevator systems'}
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-[hsl(var(--fuji-orange))] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold mr-6 flex-shrink-0">
                2024
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {language === 'ko' ? '글로벌 확장' : 'Global Expansion'}
                </h3>
                <p className="text-slate-600">
                  {language === 'ko'
                    ? '다수의 특허 획득 및 국제 시장 진출'
                    : 'Multiple patents acquired and international market expansion'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
