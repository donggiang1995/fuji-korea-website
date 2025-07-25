import { Link } from 'wouter';
import { Facebook, Linkedin, Youtube, Mail, Phone, MapPin, Zap } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import fujiLogo from '@assets/LOGO FUJI KOREA trang_1753265215012.png';

export function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-blue-600 text-white relative overflow-hidden">
      {/* World Map Background Pattern */}
      <div className="absolute inset-0 opacity-8">
        {/* Global Grid Lines - Latitude */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-200">
            {/* Horizontal latitude lines */}
            <line x1="0" y1="75" x2="400" y2="75" opacity="0.3" />
            <line x1="0" y1="150" x2="400" y2="150" opacity="0.5" />
            <line x1="0" y1="225" x2="400" y2="225" opacity="0.3" />
            {/* Vertical longitude lines */}
            <line x1="100" y1="0" x2="100" y2="300" opacity="0.3" />
            <line x1="200" y1="0" x2="200" y2="300" opacity="0.5" />
            <line x1="300" y1="0" x2="300" y2="300" opacity="0.3" />
          </g>
        </svg>
      </div>
      {/* Continental Outline Patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-6">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <g fill="none" stroke="currentColor" strokeWidth="1" className="text-blue-300">
            {/* Simplified Asia outline */}
            <path d="M40,60 Q60,50 80,55 Q100,65 120,70 Q140,80 160,85 Q150,100 130,110 Q110,120 90,115 Q70,110 50,105 Q35,95 30,80 Q35,70 40,60Z" opacity="0.4" />
            {/* Simplified Europe outline */}
            <path d="M20,50 Q35,45 45,50 Q55,55 50,65 Q45,75 35,80 Q25,75 20,65 Q15,55 20,50Z" opacity="0.3" />
            {/* Connection lines representing trade routes */}
            <line x1="45" y1="65" x2="80" y2="70" strokeDasharray="2,2" opacity="0.2" />
            <line x1="90" y1="90" x2="130" y2="85" strokeDasharray="2,2" opacity="0.2" />
          </g>
        </svg>
      </div>
      {/* Global Connection Network */}
      <div className="absolute bottom-0 left-0 w-80 h-80 opacity-5">
        <svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <g fill="none" stroke="currentColor" className="text-blue-200">
            {/* Network nodes representing global cities */}
            <circle cx="30" cy="40" r="2" fill="currentColor" opacity="0.6" />
            <circle cx="70" cy="30" r="2" fill="currentColor" opacity="0.6" />
            <circle cx="110" cy="50" r="2" fill="currentColor" opacity="0.6" />
            <circle cx="50" cy="80" r="2" fill="currentColor" opacity="0.6" />
            <circle cx="90" cy="90" r="2" fill="currentColor" opacity="0.6" />
            <circle cx="120" cy="110" r="2" fill="currentColor" opacity="0.6" />
            {/* Connection lines */}
            <line x1="30" y1="40" x2="70" y2="30" strokeWidth="0.5" opacity="0.3" />
            <line x1="70" y1="30" x2="110" y2="50" strokeWidth="0.5" opacity="0.3" />
            <line x1="50" y1="80" x2="90" y2="90" strokeWidth="0.5" opacity="0.3" />
            <line x1="90" y1="90" x2="120" y2="110" strokeWidth="0.5" opacity="0.3" />
            <line x1="30" y1="40" x2="50" y2="80" strokeWidth="0.5" opacity="0.3" />
          </g>
        </svg>
      </div>
      {/* Compass Rose Pattern */}
      <div className="absolute top-1/3 right-1/4 w-24 h-24 opacity-4">
        <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <g fill="none" stroke="currentColor" strokeWidth="0.8" className="text-blue-300">
            <circle cx="30" cy="30" r="25" />
            <circle cx="30" cy="30" r="15" opacity="0.5" />
            {/* Compass directions */}
            <line x1="30" y1="5" x2="30" y2="15" strokeWidth="1.5" />
            <line x1="55" y1="30" x2="45" y2="30" strokeWidth="1" />
            <line x1="30" y1="55" x2="30" y2="45" strokeWidth="1" />
            <line x1="5" y1="30" x2="15" y2="30" strokeWidth="1" />
            {/* Decorative star points */}
            <polygon points="30,8 32,15 30,12 28,15" fill="currentColor" opacity="0.3" />
          </g>
        </svg>
      </div>
      {/* International Time Zones */}
      <div className="absolute bottom-1/4 right-1/3 w-32 h-20 opacity-3">
        <svg viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <g fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-200">
            {/* Vertical timezone lines */}
            <line x1="20" y1="0" x2="20" y2="40" opacity="0.4" />
            <line x1="40" y1="0" x2="40" y2="40" opacity="0.6" />
            <line x1="60" y1="0" x2="60" y2="40" opacity="0.4" />
            {/* Small time indicators */}
            <text x="20" y="35" fontSize="4" fill="currentColor" opacity="0.3" textAnchor="middle">GMT</text>
            <text x="40" y="35" fontSize="4" fill="currentColor" opacity="0.3" textAnchor="middle">UTC+9</text>
          </g>
        </svg>
      </div>
      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-center lg:justify-start">
                <div className="w-72 h-72 flex items-center justify-center">
                  <img 
                    src={fujiLogo} 
                    alt="FUJI Global Korea Logo"
                    className="h-full w-auto object-contain"
                  />
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
                  <span className="text-sm text-blue-200">+82 10 6488 6706</span>
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
