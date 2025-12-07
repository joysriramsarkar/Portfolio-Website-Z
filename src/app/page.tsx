'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Menu, X, Globe, Code, PenTool, Palette, Mail, Phone, MapPin, ExternalLink, Github, Linkedin, Twitter, Facebook } from 'lucide-react';

// Translation data
const translations = {
  bn: {
    // Navigation
    home: 'হোম',
    about: 'আমার সম্পর্কে',
    services: 'সার্ভিস',
    contact: 'যোগাযোগ',
    
    // Hero Section
    headline: 'ডিজিটাল সলিউশন ও ওয়েব ডেভেলপমেন্ট',
    subheadline: 'আমি জয়শ্রীরাম সরকার। শিলিগুড়ি থেকে একজন প্যাশনেট ওয়েব ডেভেলপার এবং এআই কন্টেন্ট ক্রিয়েটর।',
    startProject: 'প্রজেক্ট শুরু করুন',
    aboutMe: 'আমার সম্পর্কে',
    
    // Stats Section
    experience: '৬+ মাস',
    experienceLabel: 'অভিজ্ঞতা/শেখা CoderDive-এ',
    projects: '১০+',
    projectsLabel: 'প্রজেক্ট',
    dedication: '১০০%',
    dedicationLabel: 'নিষ্ঠা',
    support: '২৪/৭',
    supportLabel: 'সাপোর্ট',
    
    // About Section
    aboutTitle: 'আমার সম্পর্কে',
    aboutText1: 'আমি বর্তমানে CoderDive-এ ফ্রিল্যান্সিং ও ওয়েব ডেভেলপমেন্ট কোর্স করছি।',
    aboutText2: 'আমার C, Python, WordPress, এবং এথিক্যাল হ্যাকিং-এ দক্ষতা রয়েছে।',
    aboutText3: 'আমি এছাড়াও একটি AI Niche-এ কাজ করছি।',
    
    // Services Section
    servicesTitle: 'আমার সার্ভিস',
    webDev: 'ওয়েব ডেভেলপমেন্ট',
    webDevDesc: 'WordPress, HTML/CSS দিয়ে পেশাদার ওয়েবসাইট তৈরি',
    contentWriting: 'কন্টেন্ট রাইটিং',
    contentWritingDesc: 'AI-ভিত্তিক বিশেষায়িত কন্টেন্ট তৈরি',
    design: 'ডিজাইন',
    designDesc: 'বেসিক গ্রাফিক্স ও UI ডিজাইন',
    
    // CTA Section
    ctaText: 'চলুন নতুন কিছু শুরু করি',
    getInTouch: 'যোগাযোগ করুন',
    
    // Footer
    address: 'Mastarpara, Shivmandir, Siliguri, West Bengal',
    domain: 'joysriram.com',
    copyright: '© ২০২৫ জয়শ্রীরাম সরকার। সর্বস্বত্ব সংরক্ষিত।',
    
    // Contact Info
    email: 'ইমেল',
    phone: 'ফোন',
    location: 'ঠিকানা',
    
    // Examples
    examples: 'উদাহরণ: Amazon Clone, Music App'
  },
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    services: 'Services',
    contact: 'Contact',
    
    // Hero Section
    headline: 'Digital Solutions & Web Development',
    subheadline: 'I am Joysriram Sarkar. A passionate Web Developer and AI Content Creator from Siliguri.',
    startProject: 'Start Project',
    aboutMe: 'About Me',
    
    // Stats Section
    experience: '6+ Months',
    experienceLabel: 'Experience/Learning at CoderDive',
    projects: '10+',
    projectsLabel: 'Projects',
    dedication: '100%',
    dedicationLabel: 'Dedication',
    support: '24/7',
    supportLabel: 'Support',
    
    // About Section
    aboutTitle: 'About Me',
    aboutText1: 'I am currently pursuing a Freelancing & Web Development course at CoderDive.',
    aboutText2: 'I have skills in C, Python, WordPress, and Ethical Hacking.',
    aboutText3: 'I am also working on an AI Niche.',
    
    // Services Section
    servicesTitle: 'My Services',
    webDev: 'Web Development',
    webDevDesc: 'Professional website development with WordPress, HTML/CSS',
    contentWriting: 'Content Writing',
    contentWritingDesc: 'AI-based specialized content creation',
    design: 'Design',
    designDesc: 'Basic Graphics & UI Design',
    
    // CTA Section
    ctaText: 'Let\'s start something new',
    getInTouch: 'Get In Touch',
    
    // Footer
    address: 'Mastarpara, Shivmandir, Siliguri, West Bengal',
    domain: 'joysriram.com',
    copyright: '© 2025 Joysriram Sarkar. All rights reserved.',
    
    // Contact Info
    email: 'Email',
    phone: 'Phone',
    location: 'Location',
    
    // Examples
    examples: 'Examples: Amazon Clone, Music App'
  }
};

export default function Portfolio() {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'bn' ? 'en' : 'bn');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 relative">
              <img
                src="/joysriram-logo.png"
                alt="Joysriram Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-2xl font-bold text-yellow-500">
              Joysriram
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="hover:text-yellow-500 transition-colors">
              {t.home}
            </button>
            <button onClick={() => scrollToSection('about')} className="hover:text-yellow-500 transition-colors">
              {t.about}
            </button>
            <button onClick={() => scrollToSection('services')} className="hover:text-yellow-500 transition-colors">
              {t.services}
            </button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-yellow-500 transition-colors">
              {t.contact}
            </button>
            
            {/* Language Toggle */}
            <Button
              onClick={toggleLanguage}
              variant="outline"
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all"
            >
              <Globe className="w-4 h-4 mr-2" />
              {language === 'bn' ? 'EN' : 'BN'}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Button
              onClick={toggleLanguage}
              variant="outline"
              size="sm"
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
            >
              <Globe className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="ghost"
              size="sm"
              className="text-white hover:text-yellow-500"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <button onClick={() => scrollToSection('home')} className="text-left hover:text-yellow-500 transition-colors">
                {t.home}
              </button>
              <button onClick={() => scrollToSection('about')} className="text-left hover:text-yellow-500 transition-colors">
                {t.about}
              </button>
              <button onClick={() => scrollToSection('services')} className="text-left hover:text-yellow-500 transition-colors">
                {t.services}
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-left hover:text-yellow-500 transition-colors">
                {t.contact}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              {t.headline}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              {t.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => scrollToSection('contact')}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-6 text-lg transition-all transform hover:scale-105"
              >
                {t.startProject}
              </Button>
              <Button
                onClick={() => scrollToSection('about')}
                variant="outline"
                className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-semibold px-8 py-6 text-lg transition-all"
              >
                {t.aboutMe}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="bg-gray-900/50 border-gray-800 text-center p-6 hover:border-yellow-500 transition-all">
              <CardContent className="p-0">
                <div className="text-3xl md:text-4xl font-bold text-yellow-500 mb-2">{t.experience}</div>
                <div className="text-sm text-gray-400">{t.experienceLabel}</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-gray-800 text-center p-6 hover:border-yellow-500 transition-all">
              <CardContent className="p-0">
                <div className="text-3xl md:text-4xl font-bold text-yellow-500 mb-2">{t.projects}</div>
                <div className="text-sm text-gray-400">{t.projectsLabel}</div>
                <div className="text-xs text-gray-500 mt-1">{t.examples}</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-gray-800 text-center p-6 hover:border-yellow-500 transition-all">
              <CardContent className="p-0">
                <div className="text-3xl md:text-4xl font-bold text-yellow-500 mb-2">{t.dedication}</div>
                <div className="text-sm text-gray-400">{t.dedicationLabel}</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-gray-800 text-center p-6 hover:border-yellow-500 transition-all">
              <CardContent className="p-0">
                <div className="text-3xl md:text-4xl font-bold text-yellow-500 mb-2">{t.support}</div>
                <div className="text-sm text-gray-400">{t.supportLabel}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-yellow-500">
            {t.aboutTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-yellow-500">
                <img
                  src="/আমার-ছবি.png"
                  alt="Joysriram Sarkar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                {t.aboutText1}
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                {t.aboutText2}
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                {t.aboutText3}
              </p>
              <div className="flex flex-wrap gap-2 pt-4">
                <Badge variant="secondary" className="bg-gray-800 text-yellow-500 border-gray-700">C</Badge>
                <Badge variant="secondary" className="bg-gray-800 text-yellow-500 border-gray-700">Python</Badge>
                <Badge variant="secondary" className="bg-gray-800 text-yellow-500 border-gray-700">WordPress</Badge>
                <Badge variant="secondary" className="bg-gray-800 text-yellow-500 border-gray-700">Ethical Hacking</Badge>
                <Badge variant="secondary" className="bg-gray-800 text-yellow-500 border-gray-700">AI</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-yellow-500">
            {t.servicesTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-gray-900/50 border-gray-800 hover:border-yellow-500 transition-all group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Code className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-yellow-500">{t.webDev}</h3>
                <p className="text-gray-400">{t.webDevDesc}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900/50 border-gray-800 hover:border-yellow-500 transition-all group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <PenTool className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-yellow-500">{t.contentWriting}</h3>
                <p className="text-gray-400">{t.contentWritingDesc}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900/50 border-gray-800 hover:border-yellow-500 transition-all group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Palette className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-yellow-500">{t.design}</h3>
                <p className="text-gray-400">{t.designDesc}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-yellow-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            {t.ctaText}
          </h2>
          <Button
            onClick={() => scrollToSection('contact')}
            className="bg-black text-yellow-500 hover:bg-gray-900 font-semibold px-8 py-6 text-lg transition-all transform hover:scale-105"
          >
            {t.getInTouch}
          </Button>
        </div>
      </section>

      {/* Footer/Contact Section */}
      <footer id="contact" className="py-16 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold text-yellow-500 mb-4">Joysriram</h3>
              <p className="text-gray-400">{t.domain}</p>
            </div>
            
            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-500">{t.contact}</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>contact@joysriram.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+91 XXXXX XXXXX</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{t.address}</span>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-500">Quick Links</h4>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('home')} className="block text-gray-400 hover:text-yellow-500 transition-colors">
                  {t.home}
                </button>
                <button onClick={() => scrollToSection('about')} className="block text-gray-400 hover:text-yellow-500 transition-colors">
                  {t.about}
                </button>
                <button onClick={() => scrollToSection('services')} className="block text-gray-400 hover:text-yellow-500 transition-colors">
                  {t.services}
                </button>
              </div>
            </div>
            
            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-500">Follow Me</h4>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-yellow-500">
                  <Github className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-yellow-500">
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-yellow-500">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-yellow-500">
                  <Facebook className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
          
          <Separator className="bg-gray-800 mb-8" />
          
          <div className="text-center text-gray-400">
            <p>{t.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}