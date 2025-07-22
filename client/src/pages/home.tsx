import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'wouter';
import { useLanguage } from '@/components/language-provider';
import { Award, Code, Wrench, Palette } from 'lucide-react';

export default function Home() {
  const { t } = useLanguage();

  const stats = [
    { icon: Award, number: '7', label: t.awards.patents, color: 'text-[hsl(var(--fuji-blue))]' },
    { icon: Code, number: '30+', label: t.awards.software, color: 'text-[hsl(var(--fuji-sky))]' },
    { icon: Wrench, number: '50+', label: t.awards.utility, color: 'text-[hsl(var(--fuji-orange))]' },
    { icon: Palette, number: '50+', label: t.awards.design, color: 'text-green-600' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-bg">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                {t.hero.title}<br />
                <span className="text-[hsl(var(--fuji-sky))]">{t.hero.subtitle}</span>
              </h1>
              <p className="text-xl text-slate-200 mb-8 leading-relaxed">
                {t.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button size="lg" className="bg-[hsl(var(--fuji-orange))] hover:bg-orange-600">
                    {t.hero.viewProducts}
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-slate-900">
                    {t.hero.readMore}
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Company Building Image */}
            <div className="lg:ml-8">
              <img
                src="https://images.unsplash.com/photo-1577495508048-b635879837f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="FUJI Global Korea Office Building"
                className="rounded-xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Smart Elevator Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              {t.showcase.title}
            </h2>
            <p className="text-xl text-slate-600">{t.showcase.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group">
              <div className="relative overflow-hidden rounded-xl mb-6">
                <img
                  src="https://fuji-global-korea.com/wp-content/uploads/2024/05/lift-2.jpg"
                  alt="Smart Elevator System FJE1"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold">FJE1 스마트 엘리베이터</h3>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="relative overflow-hidden rounded-xl mb-6">
                <img
                  src="https://fuji-global-korea.com/wp-content/uploads/2024/05/lift-1.jpg"
                  alt="Smart Elevator System FJE2"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold">FJE2 스마트 엘리베이터</h3>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="relative overflow-hidden rounded-xl mb-6">
                <img
                  src="https://fuji-global-korea.com/wp-content/uploads/2024/05/lift-3.jpg"
                  alt="Advanced Elevator Technology"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold">차세대 엘리베이터 기술</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">{t.awards.title}</h2>
            <p className="text-xl text-slate-600">
              {t.awards.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="text-center">
                  <CardContent className="pt-6">
                    <div className={`bg-slate-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{stat.number}</h3>
                    <p className="text-slate-600">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <img
              src="https://fuji-global-korea.com/wp-content/uploads/2024/05/hinh-1.jpg"
              alt="FUJI Global Korea Awards and Achievements"
              className="rounded-xl shadow-lg max-w-2xl mx-auto w-full h-auto"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
