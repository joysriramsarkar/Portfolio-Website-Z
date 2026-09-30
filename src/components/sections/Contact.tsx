'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Facebook } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

interface ContactProps {
  language: 'bn' | 'en';
  t: {
    contact: string;
    address: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    sendMessage: string;
  };
}

const socialLinks = [
  { icon: Github, href: 'https://github.com/joysriramsarkar', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/জয়শ্রীরাম-সরকার-abb282110/', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/SarkarJoysriram', label: 'Twitter / X' },
  { icon: Facebook, href: 'https://www.facebook.com/joysriramsarkar0', label: 'Facebook' },
];

export default function Contact({ language, t }: ContactProps) {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const isBn = language === 'bn';

  // Validation
  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) {
      newErrors.name = isBn ? 'নাম আবশ্যক' : 'Name is required';
    }
    if (!email.trim()) {
      newErrors.email = isBn ? 'ইমেল আবশ্যক' : 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = isBn ? 'সঠিক ইমেল দিন' : 'Enter a valid email';
    }
    if (!message.trim()) {
      newErrors.message = isBn ? 'বার্তা আবশ্যক' : 'Message is required';
    } else if (message.trim().length < 20) {
      newErrors.message = isBn
        ? 'বার্তা কমপক্ষে ২০ অক্ষরের হওয়া উচিত'
        : 'Message should be at least 20 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!validate()) return;

    setLoading(true);
    try {
      await emailjs.send(
        'service_h2tb4te',
        'template_mnfyq1f',
        { from_name: name, email, message },
        'eFWK_fhLWe34_6NAh'
      );
      toast({
        title: isBn ? '✅ বার্তা পাঠানো হয়েছে' : '✅ Message sent',
        description: isBn
          ? 'আপনার বার্তা সফলভাবে পাঠানো হয়েছে।'
          : 'Your message was sent successfully.',
      });
      setName('');
      setEmail('');
      setMessage('');
      setErrors({});
    } catch {
      toast({
        title: isBn ? '❌ পাঠানো হয়নি' : '❌ Send failed',
        description: isBn
          ? 'বার্তা পাঠাতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।'
          : 'There was an error sending your message. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-cyan-500 font-semibold mb-2 uppercase tracking-wide text-sm">
              {t.contact}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {isBn ? 'একসাথে কিছু বানাই' : "Let's Build Something"}
            </h2>
            <p className="text-slate-400 mb-8 text-lg leading-relaxed">
              {isBn
                ? 'কোনো প্রজেক্ট মাথায় আছে? আমাকে জানান। যত দ্রুত সম্ভব উত্তর দেব।'
                : 'Have a project in mind? I'd love to hear from you. Send me a message and I'll get back to you as soon as possible.'}
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-cyan-500 mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <div className="font-semibold text-white">Email</div>
                  <a
                    href="mailto:joysriram.sarkar.56@gmail.com"
                    className="text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    joysriram.sarkar.56@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-cyan-500 mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <div className="font-semibold text-white">Phone</div>
                  <a
                    href="tel:+917584864899"
                    className="text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    +91 7584864899
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-cyan-500 mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <div className="font-semibold text-white">Location</div>
                  <div className="text-slate-400">{t.address}</div>
                </div>
              </div>
            </div>

            <div className="mt-10 flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-cyan-600 hover:text-white transition-all duration-200"
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-slate-900 p-8 rounded-3xl border border-slate-800"
          >
            {/* Honeypot (spam protection — hidden from users) */}
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <input
                type="text"
                name="_honeypot"
                tabIndex={-1}
                aria-hidden="true"
                className="hidden"
                autoComplete="off"
              />

              <div>
                <Input
                  id="contact-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  className={`bg-slate-950 border-slate-800 focus:border-cyan-500 transition-colors ${errors.name ? 'border-red-500' : ''}`}
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                />
                {errors.name && (
                  <p id="contact-name-error" className="mt-1 text-sm text-red-400" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <Input
                  id="contact-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder={t.emailPlaceholder}
                  className={`bg-slate-950 border-slate-800 focus:border-cyan-500 transition-colors ${errors.email ? 'border-red-500' : ''}`}
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                />
                {errors.email && (
                  <p id="contact-email-error" className="mt-1 text-sm text-red-400" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <Textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.messagePlaceholder}
                  className={`bg-slate-950 border-slate-800 focus:border-cyan-500 min-h-[150px] transition-colors ${errors.message ? 'border-red-500' : ''}`}
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                />
                {errors.message && (
                  <p id="contact-message-error" className="mt-1 text-sm text-red-400" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[linear-gradient(to_right,theme(colors.cyan.600),theme(colors.blue.600))] hover:opacity-90 text-white py-6 text-lg transition-opacity disabled:opacity-60"
                aria-live="polite"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    {isBn ? 'পাঠানো হচ্ছে...' : 'Sending...'}
                  </span>
                ) : (
                  <>
                    {t.sendMessage} <Send className="w-4 h-4 ml-2" aria-hidden="true" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
