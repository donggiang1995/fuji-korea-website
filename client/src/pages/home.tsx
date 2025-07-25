import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { useLanguage } from '@/components/language-provider';
import { Award, Code, Wrench, Palette, ArrowRight, Zap, Shield, Cpu, Gauge } from 'lucide-react';
import { images as WEBSITE_IMAGES } from '@/data/images';

export default function Home() {
  const { t, language } = useLanguage();

  const stats = [
    { icon: Award, number: '7', label: t.awards.patents, color: 'text-[hsl(var(--fuji-blue))]', description: language === 'ko' ? '혁신적인 기술 특허' : 'Innovation Patents' },
    { icon: Code, number: '30+', label: t.awards.software, color: 'text-[hsl(var(--fuji-sky))]', description: language === 'ko' ? '소프트웨어 저작권' : 'Software Copyrights' },
    { icon: Wrench, number: '50+', label: t.awards.utility, color: 'text-[hsl(var(--fuji-orange))]', description: language === 'ko' ? '실용신안 특허' : 'Utility Patents' },
    { icon: Palette, number: '50+', label: t.awards.design, color: 'text-[hsl(var(--fuji-gold))]', description: language === 'ko' ? '디자인 특허' : 'Design Patents' },
  ];

  const features = [
    { 
      icon: Shield, 
      title: language === 'ko' ? '안전성' : 'Safety',
      description: language === 'ko' ? '최고 수준의 안전 기준 준수' : 'Highest safety standards compliance'
    },
    { 
      icon: Cpu, 
      title: language === 'ko' ? '스마트 기술' : 'Smart Technology',
      description: language === 'ko' ? 'IoT 및 AI 기반 제어 시스템' : 'IoT and AI-powered control systems'
    },
    { 
      icon: Gauge, 
      title: language === 'ko' ? '고성능' : 'High Performance',
      description: language === 'ko' ? '최적화된 효율성과 내구성' : 'Optimized efficiency and durability'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-bg min-h-screen flex items-center">
        <div className="absolute inset-0 tech-pattern"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-white space-y-8">
              <div className="space-y-4">
                <Badge className="glass-morphism text-white/90 font-semibold tracking-wide border-white/20">
                  <Zap className="w-4 h-4 mr-2" />
                  {language === 'ko' ? '혁신적인 엘리베이터 기술' : 'Innovative Elevator Technology'}
                </Badge>
                <h1 className="font-black leading-tight text-white">
                  {t.hero.title}
                  <br />
                  <span className="bg-gradient-to-r from-[hsl(var(--fuji-sky))] via-[hsl(var(--fuji-gold))] to-[hsl(var(--fuji-orange))] bg-clip-text text-transparent">
                    {t.hero.subtitle}
                  </span>
                </h1>
              </div>
              
              <p className="text-xl text-slate-200 leading-relaxed max-w-2xl font-medium">
                {t.hero.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/products">
                  <Button size="lg" className="industrial-button text-white font-bold px-8 py-4 text-lg group">
                    {t.hero.viewProducts}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg" className="glass-morphism border-white/30 hover:bg-[#ffffff12] font-semibold px-8 py-4 text-lg backdrop-blur-sm bg-[#03287312] text-[#0082ff]">
                    {t.hero.readMore}
                  </Button>
                </Link>
              </div>

              {/* Live Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="metric-display text-3xl font-black mono">99.9%</div>
                  <div className="text-sm text-slate-300 font-medium">
                    {language === 'ko' ? '가동률' : 'Uptime'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="metric-display text-3xl font-black mono">2000+</div>
                  <div className="text-sm text-slate-300 font-medium">
                    {language === 'ko' ? '설치' : 'Installations'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="metric-display text-3xl font-black mono">24/7</div>
                  <div className="text-sm text-slate-300 font-medium">
                    {language === 'ko' ? '지원' : 'Support'}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Visual */}
            <div className="lg:ml-8 space-y-6">
              <div className="relative">
                <img
                  src={WEBSITE_IMAGES.hero.headquarters}
                  alt="FUJI Global Korea Office Building"
                  className="rounded-2xl shadow-2xl w-full h-auto industrial-card"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--industrial-dark))]/20 to-transparent rounded-2xl"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass-morphism rounded-xl p-4">
                    <div className="text-white font-bold text-lg">
                      {language === 'ko' ? '서울 본사' : 'Seoul Headquarters'}
                    </div>
                    <div className="text-white/80 text-sm">
                      {language === 'ko' ? '광진구 광나루로' : 'Gwangnauru-ro, Gwangjin-gu'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Products Section - Moved up for prominence */}
      <section className="py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={(WEBSITE_IMAGES.products as any).sectionBackground}
            alt="Industrial Technology Background"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = WEBSITE_IMAGES.fallback.industrial;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--fuji-blue))]/90 via-[hsl(var(--fuji-navy))]/85 to-[hsl(var(--fuji-steel))]/80"></div>
        </div>
        <div className="absolute inset-0 tech-pattern opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="glass-morphism text-white/90 border-white/20 font-semibold tracking-wide text-[16px] mt-[0px] mb-[0px] pt-[5px] pb-[5px]">
              {language === 'ko' ? '제품 라인업' : 'Product Lineup'}
            </Badge>
            <h2 className="text-white mb-6 text-4xl font-black">
              {t.showcase.title}
            </h2>
            <p className="max-w-3xl mx-auto text-[#192435] font-thin text-[36px]">{t.showcase.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="flex">
              <Card className="group industrial-card border-0 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 flex flex-col w-full">
                <div className="relative overflow-hidden h-72 flex-shrink-0">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1688678097510-38711f21668b?q=80&w=897&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Smart Elevator System FJE1"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--industrial-dark))]/90 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-[hsl(var(--fuji-blue))] text-white font-bold border-0 px-3 py-1">
                      FJE1
                    </Badge>
                  </div>
                </div>
                <div className="p-6 text-white flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-3 h-14 flex items-center text-[#1a66ff]">
                    {language === 'ko' ? 'IoT 원격 제어' : 'IoT Remote Control'}
                  </h3>
                  <p className="mb-6 flex-grow text-[#686969] text-[15px]">
                    {language === 'ko' ? 'IoT 기반 원격 제어 시스템으로 실시간 모니터링 및 제어가 가능한 차세대 엘리베이터' : 'Next-generation elevator with IoT-based remote control system for real-time monitoring and control'}
                  </p>
                  <Link href="/products" className="mt-auto">
                    <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30 w-full py-2">
                      {language === 'ko' ? '자세히 보기' : 'Learn More'}
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>

            <div className="flex">
              <Card className="group industrial-card border-0 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 flex flex-col w-full">
                <div className="relative overflow-hidden h-72 flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1645500863298-859a4df01554?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Smart Elevator System FJE2" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--industrial-dark))]/90 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-[hsl(var(--fuji-sky))] text-white font-bold border-0 px-3 py-1">
                      FJE2
                    </Badge>
                  </div>
                </div>
                <div className="p-6 text-white flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-3 h-14 flex items-center text-[#1a66ff]">
                    {language === 'ko' ? '프리미엄 그룹 제어' : 'Premium Group Control'}
                  </h3>
                  <p className="mb-6 flex-grow text-[#686969] text-[15px]">
                    {language === 'ko' ? '고급 그룹 제어 시스템으로 최적화된 운행 효율성과 승객 편의성을 제공하는 프리미엄 솔루션' : 'Premium solution providing optimized operation efficiency and passenger convenience with advanced group control system'}
                  </p>
                  <Link href="/products" className="mt-auto">
                    <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30 w-full py-2">
                      {language === 'ko' ? '자세히 보기' : 'Learn More'}
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>

            <div className="flex">
              <Card className="group industrial-card border-0 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 flex flex-col w-full">
                <div className="relative overflow-hidden h-72 flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1532707898156-d21be2c005c1?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Advanced Elevator Technology"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--industrial-dark))]/90 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-[hsl(var(--fuji-orange))] text-white font-bold border-0 px-3 py-1">
                      FJK Series
                    </Badge>
                  </div>
                </div>
                <div className="p-6 text-white flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-3 h-14 flex items-center text-[#1a66ff]">
                    {language === 'ko' ? '첨단 견인 기술' : 'Advanced Traction Tech'}
                  </h3>
                  <p className="mb-6 flex-grow text-[15px] text-[#686969]">
                    {language === 'ko' ? '고효율 견인 기계와 첨단 제어 알고리즘을 적용한 차세대 엘리베이터 기술의 집약체' : 'Culmination of next-generation elevator technology with high-efficiency traction machines and advanced control algorithms'}
                  </p>
                  <Link href="/products" className="mt-auto">
                    <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30 w-full py-2">
                      {language === 'ko' ? '자세히 보기' : 'Learn More'}
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>

          <div className="text-center">
            <Link href="/products">
              <Button size="lg" className="text-white hover:bg-blue-600 font-bold px-8 py-4 text-lg group bg-[#1a64f8]">
                {language === 'ko' ? '모든 제품 보기' : 'View All Products'}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-[hsl(var(--fuji-blue))]/10 text-[hsl(var(--fuji-blue))] border-[hsl(var(--fuji-blue))]/20 font-semibold tracking-wide">
              {language === 'ko' ? '핵심 기능' : 'Core Features'}
            </Badge>
            <h2 className="text-slate-800 mb-6">
              {language === 'ko' ? '혁신적인 기술로 더 안전한 미래를' : 'Safer Future with Innovative Technology'}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {language === 'ko' 
                ? '최첨단 IoT, AI 기술과 인간 중심 설계를 결합하여 차세대 엘리베이터 경험을 제공합니다.'
                : 'Combining cutting-edge IoT, AI technology with human-centered design to deliver next-generation elevator experiences.'}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              // Hình ảnh công nghệ thang máy cho từng feature
              const featureImages = [
                "https://plus.unsplash.com/premium_photo-1663099311380-e3e0a548edaf?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",       // Safety Systems - ĐÃ THAY ĐỔI
                WEBSITE_IMAGES.features.smartTech,    // Smart Technology - GIỮ NGUYÊN
                "https://plus.unsplash.com/premium_photo-1661277672864-6a57b90858d0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"     // High Performance - ĐÃ THAY ĐỔI
              ];
              
              return (
                <Card key={index} className="industrial-card border-0 hover:shadow-xl transition-all duration-300 group overflow-hidden">
                  {/* Hình ảnh nền */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={featureImages[index]}
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = WEBSITE_IMAGES.fallback.default;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    {/* Icon overlay */}
                    <div className="absolute top-4 left-4">
                      <div className="w-12 h-12 bg-[#1a66ff] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-8 text-center">
                    <h3 className="text-xl font-bold text-slate-800 mb-4">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {/* Technology Gallery */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                {language === 'ko' ? '첨단 기술 갤러리' : 'Advanced Technology Gallery'}
              </h3>
              <p className="text-slate-600 max-w-2xl mx-auto">
                {language === 'ko' 
                  ? '최신 엘리베이터 기술과 제조 과정을 통해 FUJI Global Korea의 혁신을 확인하세요'
                  : 'Discover FUJI Global Korea\'s innovation through cutting-edge elevator technology and manufacturing processes'}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="relative group overflow-hidden rounded-xl industrial-card">
                <img
                  src="https://plus.unsplash.com/premium_photo-1661933050836-3f9e3d7eda61?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Manufacturing Process"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-bold text-sm">{language === 'ko' ? '제조 공정' : 'Manufacturing'}</h4>
                </div>
              </div>
              
              <div className="relative group overflow-hidden rounded-xl industrial-card">
                <img
                  src="https://plus.unsplash.com/premium_photo-1661490182399-62c7de4a07b7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Quality Testing"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-bold text-sm">{language === 'ko' ? '품질 테스트' : 'Quality Testing'}</h4>
                </div>
              </div>
              
              <div className="relative group overflow-hidden rounded-xl industrial-card">
                <img
                  src="https://images.unsplash.com/photo-1717386255767-52643970d483?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Installation Process"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-bold text-sm">{language === 'ko' ? '설치 과정' : 'Installation'}</h4>
                </div>
              </div>
              
              <div className="relative group overflow-hidden rounded-xl industrial-card">
                <img
                  src="https://images.unsplash.com/photo-1566096650255-98ba2641071e?q=80&w=726&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Maintenance Service"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-bold text-sm">{language === 'ko' ? '유지보수' : 'Maintenance'}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Awards Section */}
      <section className="py-24 bg-gradient-to-br from-[hsl(var(--industrial-dark))] via-[hsl(var(--fuji-navy))] to-[hsl(var(--fuji-steel))] text-white relative overflow-hidden">
        <div className="absolute inset-0 tech-pattern opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-6 glass-morphism text-white/90 border-white/20 font-semibold tracking-wide">
              {language === 'ko' ? '성과 및 인증' : 'Achievements & Certifications'}
            </Badge>
            <h2 className="text-white mb-6">{t.awards.title}</h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed text-[#192435]">
              {t.awards.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="industrial-card border-0 text-center group hover:scale-105 transition-all duration-300 bg-white/95">
                  <CardContent className="pt-8 pb-6">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 from-[hsl(var(--fuji-orange))] to-[hsl(var(--fuji-gold))] rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-all duration-300 bg-[#1a66ff]">
                        <Icon className="h-10 w-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-[hsl(var(--fuji-blue))] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">#{index + 1}</span>
                      </div>
                    </div>
                    <h3 className="metric-display text-4xl font-black mb-3 text-[hsl(var(--fuji-navy))]">{stat.number}</h3>
                    <p className="text-slate-800 font-semibold mb-2">{stat.label}</p>
                    <p className="text-slate-600 text-sm">{stat.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white mb-4">
                {language === 'ko' ? '업계 선도 기술력' : 'Industry-Leading Technology'}
              </h3>
              <p className="leading-relaxed text-[#192435] font-bold">
                {language === 'ko' 
                  ? '지속적인 연구개발과 혁신을 통해 엘리베이터 업계의 기술 표준을 선도하고 있습니다. 다수의 특허와 인증을 통해 검증된 기술력으로 고객에게 최고의 가치를 제공합니다.'
                  : 'Leading the industry\'s technology standards through continuous R&D and innovation. We provide the highest value to customers with proven technology verified through numerous patents and certifications.'}
              </p>
              <div className="flex flex-wrap gap-3 pt-4">
                <Badge className="glass-morphism text-white/90 border-white/20">ISO 9001</Badge>
                <Badge className="glass-morphism text-white/90 border-white/20">CE Marking</Badge>
                <Badge className="glass-morphism text-white/90 border-white/20">KS Certification</Badge>
                <Badge className="glass-morphism text-white/90 border-white/20">Safety Standards</Badge>
              </div>
            </div>
            <div className="relative">
              <img
                src={WEBSITE_IMAGES.awards.achievements}
                alt="FUJI Global Korea Awards and Achievements"
                className="rounded-2xl shadow-2xl w-full h-auto industrial-card"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--industrial-dark))]/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
