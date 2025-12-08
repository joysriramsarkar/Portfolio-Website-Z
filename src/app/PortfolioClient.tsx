'use client';

import GithubProjects from './GithubProjects';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Menu, X, Globe, Code, PenTool, Palette, Mail, Phone, MapPin, Github, Linkedin, Twitter, Facebook } from 'lucide-react';
import WikimediaContributions from './WikimediaContributions';

// Translation data
const translations = {
  bn: {
    // Navigation
    home: 'হোম',
    about: 'আমার সম্পর্কে',
    services: 'সার্ভিস',
    brandName: 'জয়শ্রীরাম সরকার',
    contact: 'যোগাযোগ',
    
    // Hero Section
    headline: 'ডিজিটাল সলিউশন ও ওয়েব ডেভেলপমেন্ট',
    subheadline: 'আমি জয়শ্রীরাম সরকার। শিলিগুড়ি থেকে একজন প্যাশনেট ওয়েব ডেভেলপার এবং এআই কন্টেন্ট ক্রিয়েটর।',
    startProject: 'প্রজেক্ট শুরু করুন',
    aboutMe: 'আমার সম্পর্কে',
    
    // Stats Section
    experience: '৬+ মাস',
    experienceLabel: 'অভিজ্ঞতা/শেখা CoderDive-এ',
    projects: '২০+',
    projectsLabel: 'প্রজেক্ট',
    dedication: '১০০%',
    dedicationLabel: 'নিষ্ঠা',
    support: '২৪/৭',
    supportLabel: 'সাপোর্ট',
    
    // About Section
    aboutTitle: 'আমার সম্পর্কে',
    aboutText1: 'আমি বর্তমানে CoderDive-এ ফ্রিল্যান্সিং ও ওয়েব ডেভেলপমেন্ট কোর্স করছি।',
    aboutText2: 'আমার C, Python, WordPress, এবং এথিক্যাল হ্যাকিং-এ দক্ষতা রয়েছে। আমি মূলত কবিতা ও দিনলিপি লিখি এবং বাংলা উইকিপিডিয়ায় অবদান রাখি।',
    aboutText3: 'আমার আগ্রহের মূল বিষয় হচ্ছে চলচ্চিত্র, উপন্যাস ও টেকনোলজি। আমি পশ্চিমবঙ্গের চলচ্চিত্র, সঙ্গীত, ও বিভিন্ন বিচিত্র বিষয়ে বাংলা নিবন্ধ তৈরিতে অবদান রেখেছি। এছাড়াও আমি একটি AI Niche-এ কাজ করছি।',
    
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
    examples: 'উদাহরণ: বাংলা গানের ডেটাবেস, ই-কমার্স ওয়েবসাইট',

    // Wikimedia Section
    wikimediaContributions: 'উইকিমিডিয়া অবদান',
    edits: 'টি সম্পাদনা',
    viewContributions: 'অবদান দেখুন',
    viewAllContributions: 'সব অবদান দেখুন',
    loadingContributions: 'অবদান লোড হচ্ছে...',
    wikiNames: {
      bnwiki: "বাংলা উইকিপিডিয়া",
      metawiki: "মেটা-উইকি",
      bnwikisource: "বাংলা উইকিসংকলন",
      commonswiki: "উইকিমিডিয়া কমন্স",
      datawiki: "উইকিউপাত্ত",
      mediawikiwiki: "মিডিয়াউইকি",
    },

    // Github Section
    githubProjects: "গিটহাব প্রজেক্ট",
    viewOnGithub: "গিটহাবে দেখুন",
  },
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    services: 'Services',
    brandName: 'Joysriram Sarkar',
    contact: 'Contact',
    
    // Hero Section
    headline: 'Digital Solutions & Web Development',
    subheadline: 'I am Joysriram Sarkar. A passionate Web Developer and AI Content Creator from Siliguri.',
    startProject: 'Start Project',
    aboutMe: 'About Me',
    
    // Stats Section
    experience: '6+ Months',
    experienceLabel: 'Experience/Learning at CoderDive',
    projects: '20+',
    projectsLabel: 'Projects',
    dedication: '100%',
    dedicationLabel: 'Dedication',
    support: '24/7',
    supportLabel: 'Support',
    
    // About Section
    aboutTitle: 'About Me',
    aboutText1: 'I am currently pursuing a Freelancing & Web Development course at CoderDive.',
    aboutText2: 'I have skills in C, Python, WordPress, and Ethical Hacking. I primarily write poems and diaries and contribute to Bengali Wikipedia.',
    aboutText3: 'My main interests are films, novels, and technology. I have contributed to creating Bengali articles on films, music, and various miscellaneous topics of West Bengal. I am also working on an AI Niche.',
    
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
    examples: 'Examples: SongDataBase app, e-commerce website',

    // Wikimedia Section
    wikimediaContributions: 'Wikimedia Contributions',
    edits: 'Edits',
    viewContributions: 'View Contributions',
    viewAllContributions: 'View All Contributions',
    loadingContributions: 'Loading contributions...',
    wikiNames: {
      bnwiki: "Bengali Wikipedia",
      metawiki: "Meta-Wiki",
      bnwikisource: "Bengali Wikisource",
      commonswiki: "Wikimedia Commons",
      datawiki: "Wikidata",
      mediawikiwiki: "MediaWiki",
    },

    // Github Section
    githubProjects: "GitHub Projects",
    viewOnGithub: "View on GitHub",
  }
};

export default function PortfolioClient({ children }: { children: React.ReactNode }) {
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
    <div suppressHydrationWarning className={`min-h-screen bg-black text-white overflow-x-hidden ${language === 'bn' ? 'font-hind-siliguri' : ''}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
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
            <div className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
              {t.brandName}
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="hover:text-yellow-500 transition-colors">
              <span className={language === 'bn' ? 'leading-relaxed' : ''}>{t.home}</span>
            </button>
            <button onClick={() => scrollToSection('about')} className="hover:text-yellow-500 transition-colors">
              <span className={language === 'bn' ? 'leading-relaxed' : ''}>{t.about}</span>
            </button>
            <button onClick={() => scrollToSection('services')} className="hover:text-yellow-500 transition-colors">
              <span className={language === 'bn' ? 'leading-relaxed' : ''}>{t.services}</span>
            </button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-yellow-500 transition-colors">
              <span className={language === 'bn' ? 'leading-relaxed' : ''}>{t.contact}</span>
            </button>
            
            {/* Language Toggle */}
            <Button
              onClick={toggleLanguage}
              variant="outline"
              className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black transition-all"
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
              className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black"
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
              <button onClick={() => scrollToSection('home')} className="text-left hover:text-amber-500 transition-colors leading-relaxed">
                {t.home}
              </button>
              <button onClick={() => scrollToSection('about')} className="text-left hover:text-amber-500 transition-colors leading-relaxed">
                {t.about}
              </button>
              <button onClick={() => scrollToSection('services')} className="text-left hover:text-amber-500 transition-colors leading-relaxed">
                {t.services}
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-left hover:text-amber-500 transition-colors leading-relaxed">
                {t.contact}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative bg-black pt-32">
        {/* Background Grid and Gradients */}
        <div className="absolute inset-0 h-full w-full bg-black bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-amber-500/5 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent"
            >
              <span className="leading-relaxed">{t.headline}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
            >
              <span className="leading-relaxed">{t.subheadline}</span>
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-amber-500 hover:to-yellow-700 text-black font-semibold px-8 py-6 text-lg transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(251,191,36,0.5)]"
              >
                <span className="leading-relaxed">{t.startProject}</span>
              </Button>
              <Button
                onClick={() => scrollToSection('about')}
                variant="outline"
                className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black font-semibold px-8 py-6 text-lg transition-all"
              >
                <span className="leading-relaxed">{t.aboutMe}</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Card className="bg-gray-900/50 border-gray-800 text-center p-6 transition-all duration-300 hover:border-amber-500 hover:shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                <CardContent className="p-0">
                  <div className="text-3xl md:text-4xl font-bold text-amber-500 mb-2">{t.experience}</div>
                  <div className="text-sm text-gray-400 leading-relaxed">{t.experienceLabel}</div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <Card className="bg-gray-900/50 border-gray-800 text-center p-6 transition-all duration-300 hover:border-amber-500 hover:shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                <CardContent className="p-0">
                  <div className="text-3xl md:text-4xl font-bold text-amber-500 mb-2">{t.projects}</div>
                  <div className="text-sm text-gray-400 leading-relaxed">{t.projectsLabel}</div>
                  <div className="text-xs text-gray-500 mt-1 leading-relaxed">{t.examples}</div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
              <Card className="bg-gray-900/50 border-gray-800 text-center p-6 transition-all duration-300 hover:border-amber-500 hover:shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                <CardContent className="p-0">
                  <div className="text-3xl md:text-4xl font-bold text-amber-500 mb-2">{t.dedication}</div>
                  <div className="text-sm text-gray-400 leading-relaxed">{t.dedicationLabel}</div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 }}>
              <Card className="bg-gray-900/50 border-gray-800 text-center p-6 transition-all duration-300 hover:border-amber-500 hover:shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                <CardContent className="p-0">
                  <div className="text-3xl md:text-4xl font-bold text-amber-500 mb-2">{t.support}</div>
                  <div className="text-sm text-gray-400 leading-relaxed">{t.supportLabel}</div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
            {t.aboutTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-amber-500">
                <img
                  src="/profile.png"
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
                <Badge variant="secondary" className="bg-gray-800 text-amber-500 border-gray-700">C</Badge>
                <Badge variant="secondary" className="bg-gray-800 text-amber-500 border-gray-700">Python</Badge>
                <Badge variant="secondary" className="bg-gray-800 text-amber-500 border-gray-700">WordPress</Badge>
                <Badge variant="secondary" className="bg-gray-800 text-amber-500 border-gray-700">Ethical Hacking</Badge>
                <Badge variant="secondary" className="bg-gray-800 text-amber-500 border-gray-700">AI</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wikimedia Contributions Section */}
      <WikimediaContributions language={language} translations={translations} />

      {/* Github Projects Section */}
      <GithubProjects language={language} translations={translations} />

      {/* Services Section */}
      <section id="services" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
            {t.servicesTitle}
          </h2>
          <motion.div 
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.2 } }
            }}
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
              <Card className="bg-gray-900/50 border-gray-800 hover:border-amber-500 transition-all group h-full">
                <CardContent className="p-0">
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <Code className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-amber-500 leading-relaxed">{t.webDev}</h3>
                    <p className="text-gray-400 leading-relaxed">{t.webDevDesc}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
              <Card className="bg-gray-900/50 border-gray-800 hover:border-amber-500 transition-all group h-full">
                <CardContent className="p-0">
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <PenTool className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-amber-500 leading-relaxed">{t.contentWriting}</h3>
                    <p className="text-gray-400 leading-relaxed">{t.contentWritingDesc}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
              <Card className="bg-gray-900/50 border-gray-800 hover:border-amber-500 transition-all group h-full">
                <CardContent className="p-0">
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <Palette className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-amber-500 leading-relaxed">{t.design}</h3>
                    <p className="text-gray-400 leading-relaxed">{t.designDesc}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-yellow-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            {t.ctaText}
          </h2>
          <a href="https://wa.me/917584864899" target="_blank" rel="noopener noreferrer">
            <Button
              className="bg-black text-amber-500 hover:bg-gray-900 font-semibold px-8 py-6 text-lg transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(0,0,0,0.5)]"
            >
              {t.getInTouch}
            </Button>
          </a>
        </div>
      </section>

      {/* Footer/Contact Section */}
      <footer id="contact" className="py-16 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent mb-4">{t.brandName}</h3>
              <p className="text-gray-400 leading-relaxed">{t.domain}</p>
            </div>
            
            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-amber-500 leading-relaxed">{t.contact}</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>joysriram.sarkar.56@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+91 7584864899</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm leading-relaxed">{t.address}</span>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-amber-500">Quick Links</h4>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('home')} className="block text-gray-400 hover:text-amber-500 transition-colors leading-relaxed">
                  {t.home}
                </button>
                <button onClick={() => scrollToSection('about')} className="block text-gray-400 hover:text-amber-500 transition-colors leading-relaxed">
                  {t.about}
                </button>
                <button onClick={() => scrollToSection('services')} className="block text-gray-400 hover:text-amber-500 transition-colors leading-relaxed">
                  {t.services}
                </button>
              </div>
            </div>
            
            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-amber-500">Follow Me</h4>
              <div className="flex space-x-4" suppressHydrationWarning>
                <a href="https://github.com/joysriramsarkar" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-amber-500">
                    <Github className="w-5 h-5" />
                  </Button>
                </a>
                <a href="https://www.linkedin.com/in/জয়শ্রীরাম-সরকার-abb282110/" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-amber-500">
                    <Linkedin className="w-5 h-5" />
                  </Button>
                </a>
                <a href="https://x.com/SarkarJoysriram" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-amber-500">
                    <Twitter className="w-5 h-5" />
                  </Button>
                </a>
                <a href="https://www.facebook.com/joysriramsarkar0" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-amber-500">
                    <Facebook className="w-5 h-5" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
          
          <Separator className="bg-gray-800 mb-8" />
          
          <div className="text-center text-gray-400">
            <p className="leading-relaxed">{t.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}