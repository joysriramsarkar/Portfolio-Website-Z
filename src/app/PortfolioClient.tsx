'use client';

import GithubProjects from './GithubProjects';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Menu, X, Globe, Code, PenTool, Palette, Mail, Phone, MapPin,
  Github, Linkedin, Twitter, Facebook, ExternalLink, Download,
  CheckCircle, BookOpen, User, Send
} from 'lucide-react';
import WikimediaContributions from './WikimediaContributions';
import { translations } from './translations';

export default function PortfolioClient() {
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
    <div className={`min-h-screen bg-slate-950 text-slate-200 overflow-x-hidden ${language === 'bn' ? 'font-hind-siliguri' : 'font-sans'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-md py-4 border-b border-slate-800' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('home')}>
            <div className="w-10 h-10 relative rounded-full overflow-hidden border-2 border-cyan-500">
              <Image
                src="/joysriram-logo.png"
                alt="Joysriram Logo"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              {t.brandName}
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="hover:text-cyan-400 transition-colors font-medium">{t.home}</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-cyan-400 transition-colors font-medium">{t.about}</button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-cyan-400 transition-colors font-medium">{t.portfolio}</button>
            <button onClick={() => scrollToSection('services')} className="hover:text-cyan-400 transition-colors font-medium">{t.services}</button>
            <button onClick={() => scrollToSection('blog')} className="hover:text-cyan-400 transition-colors font-medium">{t.blog}</button>
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-cyan-600 hover:bg-cyan-700 text-white"
            >
              {t.contact}
            </Button>
            
            {/* Language Toggle */}
            <Button
              onClick={toggleLanguage}
              variant="outline"
              size="sm"
              className="border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white transition-all ml-2"
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
              className="border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white"
            >
              <Globe className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="ghost"
              size="sm"
              className="text-white hover:text-cyan-400"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-800 absolute w-full left-0 top-full">
            <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              <button onClick={() => scrollToSection('home')} className="text-left hover:text-cyan-400 transition-colors py-2">{t.home}</button>
              <button onClick={() => scrollToSection('about')} className="text-left hover:text-cyan-400 transition-colors py-2">{t.about}</button>
              <button onClick={() => scrollToSection('projects')} className="text-left hover:text-cyan-400 transition-colors py-2">{t.portfolio}</button>
              <button onClick={() => scrollToSection('services')} className="text-left hover:text-cyan-400 transition-colors py-2">{t.services}</button>
              <button onClick={() => scrollToSection('blog')} className="text-left hover:text-cyan-400 transition-colors py-2">{t.blog}</button>
              <button onClick={() => scrollToSection('contact')} className="text-left hover:text-cyan-400 transition-colors py-2">{t.contact}</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative bg-slate-950 pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-cyan-400 text-sm font-medium">
              Web Developer & AI Content Expert
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                {t.headline}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
              {t.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-lg shadow-cyan-900/20"
              >
                {t.hireMe}
              </Button>
              <Button
                onClick={() => scrollToSection('projects')}
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white font-semibold px-8 py-6 text-lg rounded-full"
              >
                {t.viewProjects}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-slate-950 border-b border-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: t.experience, label: t.experienceLabel },
              { value: t.projects, label: t.projectsLabel },
              { value: t.dedication, label: t.dedicationLabel },
              { value: t.support, label: t.supportLabel }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-slate-900/50 hover:bg-slate-900 transition-colors"
              >
                <div className="text-3xl md:text-4xl font-bold text-cyan-500 mb-2">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 flex justify-center"
            >
              <div className="relative w-72 h-72 md:w-96 md:h-96">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 blur-2xl opacity-20 animate-pulse"></div>
                <Image
                  src="/profile.png"
                  alt="Joysriram Sarkar"
                  fill
                  className="relative object-cover rounded-2xl border-2 border-slate-800 shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500"
                  priority
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2"
            >
              <h2 className="text-cyan-500 font-semibold mb-2">{t.aboutTitle}</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{t.aboutSubtitle}</h3>

              <div className="space-y-4 text-slate-300 text-lg leading-relaxed">
                <p>{t.aboutText1}</p>
                <p>{t.aboutText2}</p>
                <p>{t.aboutText3}</p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {['Python', 'Web Dev', 'Content Writing', 'WordPress', 'React'].map((skill) => (
                  <Badge key={skill} variant="secondary" className="bg-slate-900 text-cyan-400 border border-slate-800 px-4 py-2">
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-cyan-500 font-semibold mb-2">{t.servicesTitle}</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">What I Offer</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: t.service1Title, desc: t.service1Desc, icon: PenTool },
              { title: t.service2Title, desc: t.service2Desc, icon: Palette },
              { title: t.service3Title, desc: t.service3Desc, icon: Code }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="bg-slate-900 border-slate-800 hover:border-cyan-500/50 transition-all h-full group">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-900/20 flex items-center justify-center mb-6 group-hover:bg-cyan-600 transition-colors">
                      <service.icon className="w-7 h-7 text-cyan-500 group-hover:text-white transition-colors" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3">{service.title}</h4>
                    <p className="text-slate-400 leading-relaxed">{service.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-cyan-500 font-semibold mb-2">{t.portfolio}</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">{t.projectsTitle}</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: t.project1Title, desc: t.project1Desc, tech: t.project1Tech, image: '/projects/banglagan.png', link: t.project1Link },
              { title: t.project2Title, desc: t.project2Desc, tech: t.project2Tech, image: '/projects/banglatyping.png', link: t.project2Link },
              { title: t.project3Title, desc: t.project3Desc, tech: t.project3Tech, image: '/projects/snakegame.png', link: t.project3Link }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                <Card className="relative bg-slate-900 border-slate-800 h-full">
                  <div className="relative h-48 bg-slate-800 rounded-t-xl overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Fallback Icon */}
                    {/* <Code className="w-12 h-12 text-slate-600" /> */}
                  </div>
                  <CardContent className="p-6">
                    <Badge className="mb-4 bg-cyan-900/30 text-cyan-400 hover:bg-cyan-900/40 border-0">{project.tech}</Badge>
                    <h4 className="text-xl font-bold text-white mb-2">{project.title}</h4>
                    <p className="text-slate-400 mb-6">{project.desc}</p>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <Button variant="link" className="text-cyan-500 hover:text-cyan-400 p-0 h-auto font-semibold group-hover:translate-x-1 transition-transform">
                        {t.viewProjects} <ExternalLink className="w-4 h-4 ml-1" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Github Projects */}
      <GithubProjects language={language} translations={translations} />

      {/* E-book Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <BookOpen className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{t.ebookTitle}</h2>
          <p className="text-xl text-indigo-200 mb-8 max-w-2xl mx-auto">{t.ebookDesc}</p>
          <Button size="lg" className="bg-white text-indigo-900 hover:bg-indigo-50 font-bold px-8">
            <Download className="w-5 h-5 mr-2" />
            {t.download}
          </Button>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-cyan-500 font-semibold mb-2">{t.blog}</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">{t.blogTitle}</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[t.blogPost1, t.blogPost2, t.blogPost3].map((post, index) => (
              <Card key={index} className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
                <CardContent className="p-6">
                  <div className="text-sm text-cyan-500 mb-3">Tech & AI</div>
                  <h4 className="text-xl font-bold text-white mb-4 line-clamp-2">{post}</h4>
                  <Button variant="link" className="text-slate-400 hover:text-cyan-400 p-0">
                    {t.readMore}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Wikimedia Contributions */}
      <WikimediaContributions language={language} translations={translations} />

      {/* CTA Section */}
      <section className="py-20 bg-cyan-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            {t.ctaText}
          </h2>
          <Button
            onClick={() => scrollToSection('contact')}
            size="lg"
            className="bg-white text-cyan-600 hover:bg-slate-100 font-bold px-8 py-6 text-lg rounded-full shadow-xl"
          >
            {t.getInTouch}
          </Button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h2 className="text-cyan-500 font-semibold mb-2">{t.contact}</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Let's Work Together</h3>
              <p className="text-slate-400 mb-8 text-lg">
                Have a project in mind? I'd love to hear from you. Send me a message and I'll get back to you as soon as possible.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-cyan-500 mt-1" />
                  <div>
                    <div className="font-semibold text-white">Email</div>
                    <div className="text-slate-400">joysriram.sarkar.56@gmail.com</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-cyan-500 mt-1" />
                  <div>
                    <div className="font-semibold text-white">Phone</div>
                    <div className="text-slate-400">+91 7584864899</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-cyan-500 mt-1" />
                  <div>
                    <div className="font-semibold text-white">Location</div>
                    <div className="text-slate-400">{t.address}</div>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex space-x-4">
                {[
                  { icon: Github, href: "https://github.com/joysriramsarkar" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/জয়শ্রীরাম-সরকার-abb282110/" },
                  { icon: Twitter, href: "https://x.com/SarkarJoysriram" },
                  { icon: Facebook, href: "https://www.facebook.com/joysriramsarkar0" }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-cyan-600 hover:text-white transition-all"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <Input placeholder={t.namePlaceholder} className="bg-slate-950 border-slate-800 focus:border-cyan-500" />
                </div>
                <div>
                  <Input type="email" placeholder={t.emailPlaceholder} className="bg-slate-950 border-slate-800 focus:border-cyan-500" />
                </div>
                <div>
                  <Textarea placeholder={t.messagePlaceholder} className="bg-slate-950 border-slate-800 focus:border-cyan-500 min-h-[150px]" />
                </div>
                <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-6 text-lg">
                  {t.sendMessage} <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-950 border-t border-slate-900 text-center">
        <div className="container mx-auto px-4">
          <p className="text-slate-500 text-sm">{t.copyright}</p>
        </div>
      </footer>

      {/* Mobile Floating CTA */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => scrollToSection('contact')}
          className="rounded-full w-14 h-14 bg-cyan-600 shadow-lg shadow-cyan-500/40 flex items-center justify-center"
        >
          <Mail className="w-6 h-6 text-white" />
        </Button>
      </div>
    </div>
  );
}
