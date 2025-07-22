import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search, Globe, Zap } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { SerialSearchDialog } from '@/components/serial-search-dialog';
import { useQuery } from '@tanstack/react-query';

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const [searchTrigger, setSearchTrigger] = useState<string | null>(null);

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

  const { data: searchResult, isLoading: isSearchLoading, error: searchError } = useQuery({
    queryKey: ['/api/search-serial', searchTrigger],
    enabled: !!searchTrigger,
    retry: false,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      setSearchTrigger(searchValue.trim());
      setIsSearchDialogOpen(true);
    }
  };

  return (
    <header className="bg-gradient-to-r from-[hsl(var(--fuji-blue))] via-[hsl(var(--fuji-navy))] to-[hsl(var(--fuji-steel))] backdrop-blur-md border-b border-blue-300/60 sticky top-0 z-50 shadow-lg shadow-blue-900/20">
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
                <span className="text-white">FUJI</span>
                <span className="text-[hsl(var(--fuji-orange))] ml-1">Global</span>
                <div className="text-xs font-semibold text-white/80 tracking-widest mono mt-0.5">
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
                      ? 'text-white border-b-2 border-white pb-1'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
                <Input
                  type="text"
                  placeholder={language === 'ko' ? '시리얼 번호 검색...' : 'Search serial number...'}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 bg-white/90 border-white/30 rounded-xl text-sm font-medium placeholder:text-slate-500 focus:ring-2 focus:ring-white/20 focus:border-white transition-all text-slate-800"
                />
              </div>
            </form>
          </div>

          {/* Language Switcher and Mobile Menu */}
          <div className="flex items-center space-x-4">

            <div className="flex items-center space-x-1 bg-white/20 rounded-xl p-1 border border-white/30">
              <Globe className="w-4 h-4 text-white/80 ml-2" />
              <Button
                variant={language === 'ko' ? 'default' : 'ghost'}
                size="sm"
                className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                  language === 'ko' 
                    ? 'bg-white text-[hsl(var(--fuji-blue))]' 
                    : 'text-white/80 hover:text-white hover:bg-white/20'
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
                    ? 'bg-white text-[hsl(var(--fuji-blue))]' 
                    : 'text-white/80 hover:text-white hover:bg-white/20'
                }`}
                onClick={() => setLanguage('en')}
              >
                English
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="hover:bg-white/20 rounded-xl">
                  <Menu className="h-5 w-5 text-white" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] bg-white/95 backdrop-blur-md">
                <div className="mt-8 space-y-6">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="relative">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
                      <Input
                        type="text"
                        placeholder={language === 'ko' ? '시리얼 번호 검색...' : 'Search serial number...'}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="pl-10 pr-4 py-3 w-full bg-slate-50 border-slate-200 rounded-xl text-slate-800"
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
                            : 'text-slate-700 hover:text-[hsl(var(--fuji-blue))] hover:bg-slate-100'
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

      {/* Serial Search Dialog */}
      <SerialSearchDialog
        isOpen={isSearchDialogOpen}
        onClose={() => {
          setIsSearchDialogOpen(false);
          setSearchTrigger(null);
        }}
        result={searchResult as any}
        isLoading={isSearchLoading}
        error={searchError?.message || null}
        searchValue={searchTrigger || ''}
      />
    </header>
  );
}
