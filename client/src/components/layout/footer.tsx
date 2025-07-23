import { Link } from 'wouter';
import { Facebook, Linkedin, Youtube, Mail, Phone, MapPin, Zap } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import fujiLogo from '@assets/LOGO FUJI KOREA trang_1753265215012.png';

export function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-blue-600 text-white relative overflow-hidden">
      {/* Industrial Background Patterns */}
      <div className="absolute inset-0 tech-pattern opacity-10"></div>
      
      {/* Geometric Industrial Patterns */}
      <div className="absolute inset-0 opacity-5">
        {/* Circuit Board Pattern */}
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <g fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="10" y="10" width="60" height="60" />
                <circle cx="20" cy="20" r="3" fill="currentColor" />
                <circle cx="60" cy="20" r="3" fill="currentColor" />
                <circle cx="20" cy="60" r="3" fill="currentColor" />
                <circle cx="60" cy="60" r="3" fill="currentColor" />
                <line x1="20" y1="20" x2="60" y2="20" />
                <line x1="20" y1="60" x2="60" y2="60" />
                <line x1="20" y1="20" x2="20" y2="60" />
                <line x1="60" y1="20" x2="60" y2="60" />
                <line x1="40" y1="10" x2="40" y2="30" />
                <line x1="40" y1="50" x2="40" y2="70" />
                <line x1="10" y1="40" x2="30" y2="40" />
                <line x1="50" y1="40" x2="70" y2="40" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" className="text-white" />
        </svg>
      </div>

      {/* Industrial Grid Pattern */}
      <div className="absolute inset-0 opacity-3">
        <svg className="absolute bottom-0 right-0 w-96 h-96" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="industrialGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <g fill="none" stroke="currentColor" strokeWidth="0.5">
                <rect x="0" y="0" width="20" height="20" />
                <rect x="5" y="5" width="10" height="10" />
                <circle cx="10" cy="10" r="2" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#industrialGrid)" className="text-white" />
        </svg>
      </div>

      {/* Hexagonal Industrial Pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-8">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <pattern id="hexagon" x="0" y="0" width="30" height="26" patternUnits="userSpaceOnUse">
              <polygon points="15,2 27,9 27,22 15,29 3,22 3,9" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-300" />
              <circle cx="15" cy="15.5" r="2" fill="currentColor" className="text-blue-400" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagon)" />
        </svg>
      </div>

      {/* Gear/Mechanical Elements */}
      <div className="absolute bottom-0 left-0 w-48 h-48 opacity-6 transform rotate-12">
        <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <g fill="none" stroke="currentColor" strokeWidth="1" className="text-blue-300">
            <circle cx="60" cy="60" r="30" />
            <circle cx="60" cy="60" r="20" />
            <circle cx="60" cy="60" r="8" fill="currentColor" opacity="0.2" />
            {/* Gear teeth */}
            {Array.from({ length: 8 }, (_, i) => {
              const angle = (i * 45) * Math.PI / 180;
              const x1 = 60 + Math.cos(angle) * 25;
              const y1 = 60 + Math.sin(angle) * 25;
              const x2 = 60 + Math.cos(angle) * 35;
              const y2 = 60 + Math.sin(angle) * 35;
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="3" />;
            })}
          </g>
        </svg>
      </div>

      {/* Industrial Bolts/Rivets Pattern */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 opacity-4">
        <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <pattern id="rivets" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="1" className="text-blue-200" />
              <circle cx="10" cy="10" r="1.5" fill="currentColor" className="text-blue-300" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#rivets)" />
        </svg>
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 p-1">
                  <img 
                    src={fujiLogo} 
                    alt="FUJI Global Korea Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="text-2xl font-black tracking-tight">
                    <span className="text-blue-100">FUJI</span>
                    <span className="text-[hsl(var(--fuji-orange))] ml-1">Global</span>
                  </div>
                  <div className="text-xs font-semibold text-blue-200 tracking-widest mono">
                    KOREA
                  </div>
                </div>
              </div>
              
              <p className="text-blue-200 leading-relaxed max-w-md">
                {t.footer.description}
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-[hsl(var(--fuji-orange))]" />
                  <span className="text-sm text-blue-200">{t.contact.addressText}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-[hsl(var(--fuji-orange))]" />
                  <span className="text-sm text-blue-200">+82-2-xxxx-xxxx</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-[hsl(var(--fuji-orange))]" />
                  <span className="text-sm text-blue-200">info@fuji-global-korea.com</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-[hsl(var(--fuji-blue))] rounded-xl flex items-center justify-center transition-all duration-300 group">
                  <Facebook className="h-5 w-5 text-slate-300 group-hover:text-white" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-[hsl(var(--fuji-sky))] rounded-xl flex items-center justify-center transition-all duration-300 group">
                  <Linkedin className="h-5 w-5 text-slate-300 group-hover:text-white" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-[hsl(var(--fuji-orange))] rounded-xl flex items-center justify-center transition-all duration-300 group">
                  <Youtube className="h-5 w-5 text-slate-300 group-hover:text-white" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-blue-100 mb-6">{t.footer.quickLinks}</h4>
              <div className="space-y-3">
                <Link href="/" className="block text-blue-200 hover:text-[hsl(var(--fuji-orange))] transition-colors font-medium">
                  {t.nav.home}
                </Link>
                <Link href="/about" className="block text-blue-200 hover:text-[hsl(var(--fuji-orange))] transition-colors font-medium">
                  {t.nav.about}
                </Link>
                <Link href="/products" className="block text-blue-200 hover:text-[hsl(var(--fuji-orange))] transition-colors font-medium">
                  {t.nav.products}
                </Link>
                <Link href="/contact" className="block text-blue-200 hover:text-[hsl(var(--fuji-orange))] transition-colors font-medium">
                  {t.nav.contact}
                </Link>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-blue-100 mb-6">
                {language === 'ko' ? '서비스' : 'Services'}
              </h4>
              <div className="space-y-3">
                <a href="#" className="block text-blue-200 hover:text-[hsl(var(--fuji-orange))] transition-colors font-medium">
                  {language === 'ko' ? '제어 시스템' : 'Control Systems'}
                </a>
                <a href="#" className="block text-blue-200 hover:text-[hsl(var(--fuji-orange))] transition-colors font-medium">
                  {language === 'ko' ? '견인 기계' : 'Traction Machines'}
                </a>
                <a href="#" className="block text-blue-200 hover:text-[hsl(var(--fuji-orange))] transition-colors font-medium">
                  {language === 'ko' ? '유지보수' : 'Maintenance'}
                </a>
                <a href="#" className="block text-blue-200 hover:text-[hsl(var(--fuji-orange))] transition-colors font-medium">
                  {language === 'ko' ? '기술 지원' : 'Technical Support'}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 bg-blue-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-blue-300 text-sm">
                {t.footer.copyright}
              </p>
              <div className="flex items-center space-x-6 text-sm text-blue-300">
                <a href="#" className="hover:text-blue-100 transition-colors">
                  {language === 'ko' ? '개인정보처리방침' : 'Privacy Policy'}
                </a>
                <a href="#" className="hover:text-blue-100 transition-colors">
                  {language === 'ko' ? '이용약관' : 'Terms of Service'}
                </a>
                <span className="flex items-center space-x-2">
                  <span>{language === 'ko' ? '제작:' : 'Made by:'}</span>
                  <span className="text-[hsl(var(--fuji-blue))] font-semibold">FUJI Global Korea</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
