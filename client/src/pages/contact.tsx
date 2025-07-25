import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { useToast } from '@/hooks/use-toast';

export default function Contact() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: language === 'ko' ? '오류' : 'Error',
        description: language === 'ko' ? '필수 항목을 모두 입력해주세요.' : 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    // In a real app, this would send the data to the backend
    console.log('Contact form submitted:', formData);
    
    toast({
      title: language === 'ko' ? '성공' : 'Success',
      description: language === 'ko' ? '문의가 성공적으로 전송되었습니다.' : 'Your inquiry has been sent successfully.'
    });

    // Reset form
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">{t.contact.title}</h1>
          <p className="text-xl text-slate-600">{t.contact.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">{t.contact.companyInfo}</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="text-[hsl(var(--fuji-blue))] mt-1 mr-4 h-5 w-5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900">{t.contact.address}</h3>
                    <p className="text-slate-600">{t.contact.addressText}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="text-[hsl(var(--fuji-blue))] mt-1 mr-4 h-5 w-5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900">{t.contact.phone}</h3>
                    <p className="text-slate-600">+82 10 6488 6706</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="text-[hsl(var(--fuji-blue))] mt-1 mr-4 h-5 w-5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900">{t.contact.email}</h3>
                    <p className="text-slate-600">info@fuji-global-korea.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Globe className="text-[hsl(var(--fuji-blue))] mt-1 mr-4 h-5 w-5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900">{t.contact.website}</h3>
                    <p className="text-slate-600">www.fuji-global-korea.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{t.contact.quickLinks}</h3>
              <div className="space-y-2">
                <a href="/" className="block text-[hsl(var(--fuji-blue))] hover:text-[hsl(var(--fuji-sky))] transition-colors">
                  {language === 'ko' ? '홈 페이지' : 'Home Page'}
                </a>
                <a href="#" className="block text-[hsl(var(--fuji-blue))] hover:text-[hsl(var(--fuji-sky))] transition-colors">
                  {language === 'ko' ? 'QR 코드' : 'QR Code'}
                </a>
                <a href="/about" className="block text-[hsl(var(--fuji-blue))] hover:text-[hsl(var(--fuji-sky))] transition-colors">
                  {t.nav.about}
                </a>
              </div>
            </div>

            {/* Company Image */}
            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                alt="FUJI Global Korea Building"
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
          </div>

          {/* Contact Form */}
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">{t.contact.inquire}</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">
                    {t.contact.name} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">
                    {t.contact.email} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="company">{t.contact.company}</Label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">
                    {t.contact.message} <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="mt-2"
                  />
                </div>
                
                <Button type="submit" className="w-full" size="lg">
                  {t.contact.send}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
