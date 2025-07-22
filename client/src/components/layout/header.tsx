import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search, Globe, Zap } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const navItems = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/products', label: t.nav.products },
    { href: '/contact', label: t.nav.contact }
  ];

  const isActive = (href: string) => {
    if (href === '/' && location === '/') return true;
    if (href !== '/' && location.startsWith(href)) return true;
    return false;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      alert(`${language === 'ko' ? '검색 중' : 'Searching for'}: ${searchValue}`);
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50 shadow-lg shadow-slate-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-5">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-[hsl(var(--fuji-blue))] to-[hsl(var(--fuji-navy))] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-[hsl(var(--fuji-orange))] rounded-full border-2 border-white"></div>
              </div>
              <div className="text-2xl font-black tracking-tight">
                <span className="text-[hsl(var(--industrial-dark))]">FUJI</span>
                <span className="text-[hsl(var(--fuji-orange))] ml-1">Global</span>
                <div className="text-xs font-semibold text-[hsl(var(--fuji-steel))] tracking-widest mono mt-0.5">
                  KOREA
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation & Search */}
          <div className="hidden lg:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 ${
                    isActive(item.href)
                      ? 'text-[hsl(var(--fuji-blue))] border-b-2 border-[hsl(var(--fuji-blue))] pb-1'
                      : 'text-[hsl(var(--industrial-medium))] hover:text-[hsl(var(--fuji-blue))]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[hsl(var(--fuji-steel))] w-4 h-4" />
                <Input
                  type="text"
                  placeholder={language === 'ko' ? '시리얼 번호 검색...' : 'Search serial number...'}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 bg-[hsl(var(--industrial-light))] border-[hsl(var(--fuji-silver))] rounded-xl text-sm font-medium placeholder:text-[hsl(var(--fuji-steel))] focus:ring-2 focus:ring-[hsl(var(--fuji-blue))]/20 focus:border-[hsl(var(--fuji-blue))] transition-all"
                />
              </div>
            </form>
          </div>

          {/* Language Switcher and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 bg-[hsl(var(--industrial-light))] rounded-xl p-1 border border-[hsl(var(--fuji-silver))]">
              <Globe className="w-4 h-4 text-[hsl(var(--fuji-steel))] ml-2" />
              <Button
                variant={language === 'ko' ? 'default' : 'ghost'}
                size="sm"
                className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                  language === 'ko' 
                    ? 'industrial-button text-white' 
                    : 'text-[hsl(var(--fuji-steel))] hover:text-[hsl(var(--fuji-blue))] hover:bg-white/50'
                }`}
                onClick={() => setLanguage('ko')}
              >
                한국어
              </Button>
              <Button
                variant={language === 'en' ? 'default' : 'ghost'}
                size="sm"
                className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                  language === 'en' 
                    ? 'industrial-button text-white' 
                    : 'text-[hsl(var(--fuji-steel))] hover:text-[hsl(var(--fuji-blue))] hover:bg-white/50'
                }`}
                onClick={() => setLanguage('en')}
              >
                English
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="hover:bg-[hsl(var(--industrial-light))] rounded-xl">
                  <Menu className="h-5 w-5 text-[hsl(var(--industrial-medium))]" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] bg-white/95 backdrop-blur-md">
                <div className="mt-8 space-y-6">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="relative">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[hsl(var(--fuji-steel))] w-4 h-4" />
                      <Input
                        type="text"
                        placeholder={language === 'ko' ? '시리얼 번호 검색...' : 'Search serial number...'}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="pl-10 pr-4 py-3 w-full bg-[hsl(var(--industrial-light))] border-[hsl(var(--fuji-silver))] rounded-xl"
                      />
                    </div>
                  </form>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`font-semibold py-3 px-4 rounded-xl transition-all ${
                          isActive(item.href)
                            ? 'bg-[hsl(var(--fuji-blue))] text-white'
                            : 'text-[hsl(var(--industrial-medium))] hover:text-[hsl(var(--fuji-blue))] hover:bg-[hsl(var(--industrial-light))]'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
