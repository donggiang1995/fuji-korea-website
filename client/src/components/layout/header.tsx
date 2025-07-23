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
    <header className="from-[hsl(var(--fuji-blue))] via-[hsl(var(--fuji-navy))] to-[hsl(var(--fuji-steel))] border-b border-blue-300/60 sticky top-0 z-50 shadow-lg shadow-blue-900/20 bg-[#192435]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#192435]">
        <div className="flex justify-between items-center py-5">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="flex items-center space-x-3">
              <div className="relative">
                {/* FUJI Global Korea Logo */}
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300 p-1">
                  <svg viewBox="0 0 120 40" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    {/* FUJI Text */}
                    <g fill="#1a66ff">
                      {/* F */}
                      <rect x="2" y="8" width="3" height="24" />
                      <rect x="2" y="8" width="12" height="3" />
                      <rect x="2" y="18" width="10" height="3" />
                      
                      {/* U */}
                      <rect x="18" y="8" width="3" height="18" />
                      <rect x="28" y="8" width="3" height="18" />
                      <rect x="18" y="26" width="13" height="3" />
                      <rect x="18" y="23" width="3" height="3" />
                      <rect x="28" y="23" width="3" height="3" />
                      
                      {/* J */}
                      <rect x="35" y="8" width="10" height="3" />
                      <rect x="42" y="8" width="3" height="15" />
                      <rect x="35" y="23" width="7" height="3" />
                      <rect x="35" y="26" width="3" height="3" />
                      
                      {/* I */}
                      <rect x="50" y="8" width="8" height="3" />
                      <rect x="53" y="11" width="3" height="15" />
                      <rect x="50" y="26" width="8" height="3" />
                    </g>
                    
                    {/* Global Text - smaller and orange */}
                    <g fill="#ff6b35" fontSize="6" fontFamily="Arial, sans-serif" fontWeight="bold">
                      <text x="65" y="20">Global</text>
                    </g>
                    
                    {/* Korea Text - even smaller and blue */}
                    <g fill="#1a66ff" fontSize="4" fontFamily="Arial, sans-serif" fontWeight="normal">
                      <text x="90" y="28">KOREA</text>
                    </g>
                    
                    {/* Industrial accent elements */}
                    <circle cx="110" cy="12" r="2" fill="#ff6b35" opacity="0.8" />
                    <rect x="105" y="25" width="6" height="1" fill="#1a66ff" opacity="0.6" />
                    <rect x="107" y="27" width="2" height="1" fill="#ff6b35" opacity="0.8" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-[hsl(var(--fuji-orange))] rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="text-2xl font-black tracking-tight">
                <span className="text-blue-100">FUJI</span>
                <span className="ml-1 bg-[#b7b7b700] text-[#1a66ff]">Global</span>
                <div className="text-xs font-semibold text-blue-200 tracking-widest mono mt-0.5">
                  KOREA
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation & Search */}
          <div className="hidden lg:flex items-center space-x-8">
            <nav className="flex items-center space-x-1 bg-gradient-to-r from-white/15 via-white/10 to-white/5 px-4 py-2 rounded-2xl border border-white/30 backdrop-blur-lg shadow-lg">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-medium text-sm tracking-wide px-4 py-2 rounded-xl transition-all duration-300 relative group ${
                    isActive(item.href)
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                  <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-[hsl(var(--fuji-orange))] transition-all duration-300 group-hover:w-3/4 transform -translate-x-1/2"></span>
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
                  className="pl-10 pr-4 py-2 w-64 bg-white border-gray-300 rounded-xl text-sm font-medium placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800"
                />
              </div>
            </form>
          </div>

          {/* Language Switcher and Mobile Menu */}
          <div className="flex items-center space-x-4">

            <div className="flex items-center space-x-1 rounded-xl p-1 border border-blue-700 bg-[#1e40af00]">
              <Globe className="w-4 h-4 text-blue-200 ml-2" />
              <Button
                variant={language === 'ko' ? 'default' : 'ghost'}
                size="sm"
                className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                  language === 'ko' 
                    ? 'bg-white text-[hsl(var(--fuji-blue))]' 
                    : 'text-blue-200 hover:text-blue-100 hover:bg-blue-700'
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
                    : 'text-blue-200 hover:text-blue-100 hover:bg-blue-700'
                }`}
                onClick={() => setLanguage('en')}
              >
                English
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="hover:bg-blue-700 rounded-xl">
                  <Menu className="h-5 w-5 text-blue-100" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] bg-white">
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
