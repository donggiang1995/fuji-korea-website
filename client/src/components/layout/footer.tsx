import { Link } from 'wouter';
import { Facebook, Linkedin, Youtube, Mail, Phone, MapPin, Zap } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';

export function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-blue-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 tech-pattern opacity-10"></div>
      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--fuji-blue))] to-[hsl(var(--fuji-navy))] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <Zap className="w-7 h-7 text-white" />
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
