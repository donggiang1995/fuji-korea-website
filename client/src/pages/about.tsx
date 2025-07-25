import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, Award, Globe, Target, Lightbulb, Zap, Shield, Cpu, TrendingUp, Calendar, MapPin, Factory, Cog, Settings, Users2, FlaskConical, HardHat } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { WEBSITE_IMAGES } from '@/config/images';

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
                <div className="w-16 h-16 from-[hsl(var(--fuji-blue))] to-[hsl(var(--fuji-navy))] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 bg-[#2a2c37]">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="metric-display text-3xl font-black mb-2">{t.foundedYear}</h3>
                <p className="text-[hsl(var(--fuji-steel))] font-medium">{language === 'ko' ? '설립년도' : 'Founded'}</p>
              </CardContent>
            </Card>
            
            <Card className="industrial-card border-0 text-center group hover:scale-105 transition-all duration-300">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 from-[hsl(var(--fuji-sky))] to-[hsl(var(--fuji-blue))] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 bg-[#2a2c37]">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="metric-display text-3xl font-black mb-2">{t.employees}</h3>
                <p className="text-[hsl(var(--fuji-steel))] font-medium">{language === 'ko' ? '직원 수' : 'Employees'}</p>
              </CardContent>
            </Card>
            
            <Card className="industrial-card border-0 text-center group hover:scale-105 transition-all duration-300">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 from-[hsl(var(--fuji-orange))] to-[hsl(var(--fuji-gold))] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-orange-500/25 transition-all duration-300 bg-[#2a2c37]">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="metric-display text-3xl font-black mb-2">{t.locations}</h3>
                <p className="text-[hsl(var(--fuji-steel))] font-medium">{language === 'ko' ? '지역' : 'Locations'}</p>
              </CardContent>
            </Card>
            
            <Card className="industrial-card border-0 text-center group hover:scale-105 transition-all duration-300">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 from-[hsl(var(--fuji-gold))] to-[hsl(var(--fuji-orange))] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-yellow-500/25 transition-all duration-300 bg-[#2a2c37]">
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
                src={WEBSITE_IMAGES.awards.achievements}
                alt="FUJI Global Korea"
                className="rounded-2xl shadow-2xl w-full h-auto industrial-card"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = WEBSITE_IMAGES.fallback.industrial;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--industrial-dark))]/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing & Facilities Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-[hsl(var(--fuji-orange))]/10 text-[hsl(var(--fuji-orange))] border-[hsl(var(--fuji-orange))]/20 font-semibold tracking-wide">
              {language === 'ko' ? '제조 시설' : 'Manufacturing Facilities'}
            </Badge>
            <h2 className="text-[hsl(var(--industrial-dark))] mb-6">
              {language === 'ko' ? '최첨단 생산 시설과 기술력' : 'State-of-the-Art Production Facilities'}
            </h2>
            <p className="text-lg text-[hsl(var(--fuji-steel))] max-w-3xl mx-auto">
              {language === 'ko' 
                ? '현대적인 제조 시설과 첨단 장비를 통해 최고 품질의 엘리베이터 시스템을 생산합니다.'
                : 'We produce the highest quality elevator systems through modern manufacturing facilities and advanced equipment.'
              }
            </p>
          </div>

          {/* Facilities Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Factory Overview */}
            <Card className="lg:col-span-2 industrial-card border-0 overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1565891741441-64926e441838?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="FUJI Global Korea Factory"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = WEBSITE_IMAGES.fallback.industrial;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-[hsl(var(--fuji-blue))] rounded-xl flex items-center justify-center">
                      <Factory className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{language === 'ko' ? '생산 공장' : 'Production Factory'}</h3>
                      <p className="text-blue-200">{language === 'ko' ? '15,000㎡ 규모' : '15,000㎡ Facility'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quality Control */}
            <Card className="industrial-card border-0 overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <img
                  src={WEBSITE_IMAGES.facilities.quality}
                  alt="Quality Control"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = WEBSITE_IMAGES.fallback.default;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[hsl(var(--fuji-orange))] rounded-lg flex items-center justify-center">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">{language === 'ko' ? '품질 관리' : 'Quality Control'}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Capabilities Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="industrial-card border-0 group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="relative">
                  <img
                    src={WEBSITE_IMAGES.facilities.machinery}
                    alt="Advanced Machinery"
                    className="w-full h-32 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = WEBSITE_IMAGES.fallback.industrial;
                    }}
                  />
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[hsl(var(--fuji-blue))] rounded-lg flex items-center justify-center">
                      <Cog className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[hsl(var(--industrial-dark))]">
                        {language === 'ko' ? '첨단 장비' : 'Advanced Machinery'}
                      </h4>
                      <p className="text-sm text-[hsl(var(--fuji-steel))]">
                        {language === 'ko' ? 'CNC 정밀 가공' : 'CNC Precision'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="industrial-card border-0 group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1675602488453-c3897a475af5?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Production Line"
                    className="w-full h-32 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = WEBSITE_IMAGES.fallback.industrial;
                    }}
                  />
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[hsl(var(--fuji-orange))] rounded-lg flex items-center justify-center">
                      <Settings className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[hsl(var(--industrial-dark))]">
                        {language === 'ko' ? '생산 라인' : 'Production Line'}
                      </h4>
                      <p className="text-sm text-[hsl(var(--fuji-steel))]">
                        {language === 'ko' ? '자동화 시스템' : 'Automated System'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="industrial-card border-0 group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="relative">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1740363268539-cd9093c3b5d1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Research Lab"
                    className="w-full h-32 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = WEBSITE_IMAGES.fallback.default;
                    }}
                  />
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[hsl(var(--fuji-gold))] rounded-lg flex items-center justify-center">
                      <FlaskConical className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[hsl(var(--industrial-dark))]">
                        {language === 'ko' ? '연구 개발' : 'R&D Lab'}
                      </h4>
                      <p className="text-sm text-[hsl(var(--fuji-steel))]">
                        {language === 'ko' ? '혁신 기술' : 'Innovation Hub'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="industrial-card border-0 group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="relative">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1661765887476-c7ff042d66b7?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Expert Team"
                    className="w-full h-32 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = WEBSITE_IMAGES.fallback.default;
                    }}
                  />
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[hsl(var(--fuji-navy))] rounded-lg flex items-center justify-center">
                      <HardHat className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[hsl(var(--industrial-dark))]">
                        {language === 'ko' ? '전문 인력' : 'Expert Team'}
                      </h4>
                      <p className="text-sm text-[hsl(var(--fuji-steel))]">
                        {language === 'ko' ? '숙련 기술자' : 'Skilled Engineers'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Manufacturing Stats */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-[hsl(var(--fuji-blue))]/5 to-[hsl(var(--fuji-navy))]/5 border border-[hsl(var(--fuji-blue))]/10">
              <div className="text-4xl font-black text-[hsl(var(--fuji-blue))] mb-2">500+</div>
              <p className="text-[hsl(var(--fuji-steel))] font-medium">
                {language === 'ko' ? '월간 생산 대수' : 'Monthly Production Units'}
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-[hsl(var(--fuji-orange))]/5 to-[hsl(var(--fuji-gold))]/5 border border-[hsl(var(--fuji-orange))]/10">
              <div className="text-4xl font-black text-[hsl(var(--fuji-orange))] mb-2">99.8%</div>
              <p className="text-[hsl(var(--fuji-steel))] font-medium">
                {language === 'ko' ? '품질 통과율' : 'Quality Pass Rate'}
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-[hsl(var(--fuji-gold))]/5 to-[hsl(var(--fuji-orange))]/5 border border-[hsl(var(--fuji-gold))]/10">
              <div className="text-4xl font-black text-[hsl(var(--fuji-gold))] mb-2">ISO 9001</div>
              <p className="text-[hsl(var(--fuji-steel))] font-medium">
                {language === 'ko' ? '품질 인증' : 'Quality Certification'}
              </p>
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
                      <div className="w-16 h-16 from-[hsl(var(--fuji-blue))] to-[hsl(var(--fuji-navy))] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/25 bg-[#2a2c37]">
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
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[hsl(var(--fuji-blue))] via-[hsl(var(--fuji-navy))] to-[hsl(var(--fuji-orange))] rounded-full shadow-lg"></div>
            
            <div className="space-y-16">
              {t.history.events.map((event, index) => {
                // Define icons for different timeline events based on index
                const getTimelineIcon = (idx: number) => {
                  const icons = [
                    { icon: 'building', bg: 'bg-green-500', shadow: 'shadow-green-500/25' },
                    { icon: 'award', bg: 'bg-blue-500', shadow: 'shadow-blue-500/25' },
                    { icon: 'rocket', bg: 'bg-purple-500', shadow: 'shadow-purple-500/25' },
                    { icon: 'trophy', bg: 'bg-yellow-500', shadow: 'shadow-yellow-500/25' },
                    { icon: 'star', bg: 'bg-red-500', shadow: 'shadow-red-500/25' },
                  ];
                  return icons[idx % icons.length];
                };
                
                const iconData = getTimelineIcon(index);
                
                return (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'}`}>
                      <Card className="industrial-card border-0 group hover:shadow-xl transition-all duration-500 hover:scale-105 relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                          <div className="w-full h-full bg-gradient-to-br from-[hsl(var(--fuji-blue))] to-[hsl(var(--fuji-orange))] transform rotate-45 translate-x-16 -translate-y-16"></div>
                        </div>
                        
                        <CardContent className="p-8 relative">
                          <div className="flex items-center gap-4 mb-4">
                            <div className={`w-12 h-12 ${iconData.bg} rounded-xl flex items-center justify-center ${iconData.shadow} group-hover:shadow-lg transition-all duration-300`}>
                              {iconData.icon === 'building' && (
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                </svg>
                              )}
                              {iconData.icon === 'award' && (
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                                </svg>
                              )}
                              {iconData.icon === 'rocket' && (
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                </svg>
                              )}
                              {iconData.icon === 'trophy' && (
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                              )}
                              {iconData.icon === 'star' && (
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                                </svg>
                              )}
                            </div>
                            <div className="metric-display text-3xl font-black from-[hsl(var(--fuji-blue))] to-[hsl(var(--fuji-orange))] bg-clip-text text-[#192435] bg-[#192435]">
                              {event.year}
                            </div>
                          </div>
                          <p className="text-[hsl(var(--fuji-steel))] font-medium leading-relaxed text-base">
                            {event.event}
                          </p>
                          
                          {/* Decorative elements */}
                          <div className="absolute bottom-4 right-4 opacity-10">
                            <div className="w-8 h-8 border-2 border-[hsl(var(--fuji-blue))] rounded-full bg-[#1a66ff]"></div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    {/* Enhanced Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                      <div className="w-8 h-8 bg-white rounded-full shadow-xl border-4 border-[hsl(var(--fuji-orange))] flex items-center justify-center z-10">
                        <div className="w-3 h-3 bg-[hsl(var(--fuji-orange))] rounded-full animate-pulse"></div>
                      </div>
                      {/* Glow effect */}
                      <div className="absolute w-12 h-12 rounded-full animate-ping bg-[#0a9bff]"></div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Timeline End Decoration */}
            <div className="flex justify-center mt-12">
              <div className="w-16 h-16 from-[hsl(var(--fuji-gold))] to-[hsl(var(--fuji-orange))] rounded-full flex items-center justify-center shadow-xl bg-[#192435]">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
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
                    <div className="w-20 h-20 from-[hsl(var(--fuji-blue))] to-[hsl(var(--fuji-navy))] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-xl group-hover:shadow-blue-500/25 transition-all duration-300 bg-[#2a2c37]">
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