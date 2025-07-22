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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-[hsl(var(--industrial-light))] to-white overflow-hidden">
        <div className="absolute inset-0 tech-pattern opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-[hsl(var(--fuji-blue))]/10 text-[hsl(var(--fuji-blue))] border-[hsl(var(--fuji-blue))]/20 font-semibold tracking-wide">
              {language === 'ko' ? '기업 정보' : 'Company Information'}
            </Badge>
            <h1 className="text-[hsl(var(--industrial-dark))] mb-6">{t.title}</h1>
            <p className="text-xl text-[hsl(var(--fuji-steel))] max-w-3xl mx-auto">{t.subtitle}</p>
          </div>

          {/* Company Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <Card className="industrial-card border-0 text-center group hover:scale-105 transition-all duration-300">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--fuji-blue))] to-[hsl(var(--fuji-navy))] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="metric-display text-3xl font-black mb-2">{t.foundedYear}</h3>
                <p className="text-[hsl(var(--fuji-steel))] font-medium">{language === 'ko' ? '설립년도' : 'Founded'}</p>
              </CardContent>
            </Card>
            
            <Card className="industrial-card border-0 text-center group hover:scale-105 transition-all duration-300">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--fuji-sky))] to-[hsl(var(--fuji-blue))] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="metric-display text-3xl font-black mb-2">{t.employees}</h3>
                <p className="text-[hsl(var(--fuji-steel))] font-medium">{language === 'ko' ? '직원 수' : 'Employees'}</p>
              </CardContent>
            </Card>
            
            <Card className="industrial-card border-0 text-center group hover:scale-105 transition-all duration-300">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--fuji-orange))] to-[hsl(var(--fuji-gold))] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-orange-500/25 transition-all duration-300">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="metric-display text-3xl font-black mb-2">{t.locations}</h3>
                <p className="text-[hsl(var(--fuji-steel))] font-medium">{language === 'ko' ? '지역' : 'Locations'}</p>
              </CardContent>
            </Card>
            
            <Card className="industrial-card border-0 text-center group hover:scale-105 transition-all duration-300">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--fuji-gold))] to-[hsl(var(--fuji-orange))] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-yellow-500/25 transition-all duration-300">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="metric-display text-3xl font-black mb-2">{t.projects}</h3>
                <p className="text-[hsl(var(--fuji-steel))] font-medium">{language === 'ko' ? '프로젝트' : 'Projects'}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-8">
              <div>
                <h2 className="text-[hsl(var(--industrial-dark))] mb-6">FUJI Global Korea</h2>
                <p className="text-lg text-[hsl(var(--fuji-steel))] leading-relaxed">
                  {t.description}
                </p>
              </div>
              
              <div className="grid gap-6">
                <Card className="industrial-card border-0">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--fuji-blue))] to-[hsl(var(--fuji-navy))] rounded-xl flex items-center justify-center">
                        <Target className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[hsl(var(--industrial-dark))] mb-3">{t.vision.title}</h3>
                        <p className="text-[hsl(var(--fuji-steel))] leading-relaxed">{t.vision.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="industrial-card border-0">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--fuji-orange))] to-[hsl(var(--fuji-gold))] rounded-xl flex items-center justify-center">
                        <Lightbulb className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[hsl(var(--industrial-dark))] mb-3">{t.mission.title}</h3>
                        <p className="text-[hsl(var(--fuji-steel))] leading-relaxed">{t.mission.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://fuji-global-korea.com/wp-content/uploads/2024/05/hinh-1.jpg"
                alt="FUJI Global Korea"
                className="rounded-2xl shadow-2xl w-full h-auto industrial-card"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--industrial-dark))]/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-24 bg-[hsl(var(--industrial-light))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-[hsl(var(--fuji-orange))]/10 text-[hsl(var(--fuji-orange))] border-[hsl(var(--fuji-orange))]/20 font-semibold tracking-wide">
              {language === 'ko' ? '핵심 기술' : 'Core Technologies'}
            </Badge>
            <h2 className="text-[hsl(var(--industrial-dark))] mb-6">
              {language === 'ko' ? '최첨단 기술 혁신' : 'Cutting-Edge Technology Innovation'}
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {t.technologies.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <Card key={index} className="industrial-card border-0 group hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--fuji-blue))] to-[hsl(var(--fuji-navy))] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/25">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[hsl(var(--industrial-dark))] mb-3">{tech.title}</h3>
                        <p className="text-[hsl(var(--fuji-steel))] leading-relaxed">{tech.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company History */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-[hsl(var(--fuji-blue))]/10 text-[hsl(var(--fuji-blue))] border-[hsl(var(--fuji-blue))]/20 font-semibold tracking-wide">
              {language === 'ko' ? '회사 연혁' : 'Company Timeline'}
            </Badge>
            <h2 className="text-[hsl(var(--industrial-dark))] mb-6">{t.history.title}</h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[hsl(var(--fuji-blue))] to-[hsl(var(--fuji-navy))]"></div>
            <div className="space-y-12">
              {t.history.events.map((event, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <Card className="industrial-card border-0 group hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="metric-display text-2xl font-black mb-2">{event.year}</div>
                        <p className="text-[hsl(var(--fuji-steel))] font-medium">{event.event}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[hsl(var(--fuji-orange))] rounded-full border-4 border-white shadow-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-[hsl(var(--industrial-light))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-[hsl(var(--fuji-gold))]/10 text-[hsl(var(--fuji-gold))] border-[hsl(var(--fuji-gold))]/20 font-semibold tracking-wide">
              {language === 'ko' ? '핵심 가치' : 'Core Values'}
            </Badge>
            <h2 className="text-[hsl(var(--industrial-dark))] mb-6">
              {language === 'ko' ? '우리의 가치와 원칙' : 'Our Values & Principles'}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="industrial-card border-0 text-center group hover:scale-105 transition-all duration-300">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-[hsl(var(--fuji-blue))] to-[hsl(var(--fuji-navy))] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-xl group-hover:shadow-blue-500/25 transition-all duration-300">
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-[hsl(var(--industrial-dark))] mb-4">{value.title}</h3>
                    <p className="text-[hsl(var(--fuji-steel))] leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}