import { Link } from 'wouter';
import { Facebook, Linkedin, Youtube } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="col-span-2">
            <div className="text-2xl font-bold mb-4">
              FUJI<span className="text-[hsl(var(--fuji-orange))]">Global</span>
              <span className="text-sm font-normal text-slate-400 ml-2">Korea</span>
            </div>
            <p className="text-slate-400 mb-4 leading-relaxed">
              {t.footer.description}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.footer.quickLinks}</h4>
            <div className="space-y-2">
              <Link href="/" className="block text-slate-400 hover:text-white transition-colors">
                {t.nav.home}
              </Link>
              <Link href="/about" className="block text-slate-400 hover:text-white transition-colors">
                {t.nav.about}
              </Link>
              <Link href="/products" className="block text-slate-400 hover:text-white transition-colors">
                {t.nav.products}
              </Link>
              <Link href="/contact" className="block text-slate-400 hover:text-white transition-colors">
                {t.nav.contact}
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.footer.contactInfo}</h4>
            <div className="space-y-2 text-slate-400">
              <p>{t.contact.addressText}</p>
              <p>+82-2-xxxx-xxxx</p>
              <p>info@fuji-global-korea.com</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-slate-400">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
