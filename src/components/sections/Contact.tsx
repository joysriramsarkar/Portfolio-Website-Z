'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Facebook, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

interface ContactProps {
  language: 'bn' | 'en';
  t?: {
    contact?: string;
    address?: string;
    namePlaceholder?: string;
    emailPlaceholder?: string;
    messagePlaceholder?: string;
    sendMessage?: string;
  };
}

const socialLinks = [
  { icon: Github, href: 'https://github.com/joysriramsarkar', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/joyshriramsarkar/', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/SarkarJoysriram', label: 'Twitter / X' },
  { icon: Facebook, href: 'https://www.facebook.com/joysriramsarkar0', label: 'Facebook' },
];

export default function Contact({ language }: ContactProps) {
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
    } else if (message.trim().length < 15) {
      newErrors.message = isBn
        ? 'বার্তা কমপক্ষে ১৫ অক্ষরের হওয়া উচিত'
        : 'Message should be at least 15 characters';
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
          ? 'বার্তা পাঠাতে সমস্যা হয়েছে। সরাসরি ইমেল করতে পারেন।'
          : 'There was an error sending your message. You can email directly.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p className="section-label text-[var(--accent-bengali)] mb-2">07 / CONTACT</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-4">
              {isBn ? 'একসাথে কিছু তৈরি করি' : "Let's build something"}
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-muted)] mb-8 leading-relaxed max-w-lg">
              {isBn
                ? 'নতুন প্রজেক্ট, ওপেন-সোর্স কাজ বা কোনো প্রযুক্তিগত ধারণা নিয়ে আলোচনা করতে চাইলে বার্তা পাঠান।'
                : 'Have an idea, open-source project, or collaboration in mind? Send a message and let’s talk.'}
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[var(--surface-2)] flex items-center justify-center text-[var(--accent-bengali)] border border-[var(--border)]">
                  <Mail className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[var(--text-faint)]">EMAIL</div>
                  <a
                    href="mailto:joysriram.sarkar.56@gmail.com"
                    className="text-sm font-medium text-[var(--text)] hover:text-[var(--accent-bengali)] transition-colors"
                  >
                    joysriram.sarkar.56@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[var(--surface-2)] flex items-center justify-center text-[var(--accent-bengali)] border border-[var(--border)]">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[var(--text-faint)]">PHONE</div>
                  <a
                    href="tel:+917584864899"
                    className="text-sm font-medium text-[var(--text)] hover:text-[var(--accent-bengali)] transition-colors"
                  >
                    +91 7584864899
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[var(--surface-2)] flex items-center justify-center text-[var(--accent-bengali)] border border-[var(--border)]">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[var(--text-faint)]">LOCATION</div>
                  <div className="text-sm font-medium text-[var(--text)]">
                    {isBn ? 'শিলিগুড়ি, পশ্চিমবঙ্গ, ভারত' : 'Siliguri, West Bengal, India'}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--border)]">
              <span className="section-label text-[var(--text-faint)] block mb-3">CONNECT</span>
              <div className="flex gap-2.5">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent-bengali)] hover:border-[var(--accent-bengali)] transition-all"
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="p-6 sm:p-8 rounded border border-[var(--border)] bg-[var(--surface)]"
          >
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <input
                type="text"
                name="_honeypot"
                tabIndex={-1}
                aria-hidden="true"
                className="hidden"
                autoComplete="off"
              />

              <div>
                <label htmlFor="contact-name" className="block text-xs font-mono text-[var(--text-faint)] mb-1">
                  {isBn ? 'আপনার নাম' : 'YOUR NAME'}
                </label>
                <Input
                  id="contact-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isBn ? 'যেমন: অনির্বাণ সেন' : 'e.g. John Doe'}
                  className={`bg-[var(--bg)] border-[var(--border)] text-[var(--text)] focus:border-[var(--accent-bengali)] ${errors.name ? 'border-red-500' : ''}`}
                  aria-required="true"
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-mono text-[var(--text-faint)] mb-1">
                  {isBn ? 'ইমেল ঠিকানা' : 'EMAIL ADDRESS'}
                </label>
                <Input
                  id="contact-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="your.email@example.com"
                  className={`bg-[var(--bg)] border-[var(--border)] text-[var(--text)] focus:border-[var(--accent-bengali)] ${errors.email ? 'border-red-500' : ''}`}
                  aria-required="true"
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-mono text-[var(--text-faint)] mb-1">
                  {isBn ? 'আপনার বার্তা' : 'MESSAGE'}
                </label>
                <Textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={isBn ? 'কী বিষয়ে কথা বলতে চান...' : 'Tell me about your project or inquiry...'}
                  className={`bg-[var(--bg)] border-[var(--border)] text-[var(--text)] focus:border-[var(--accent-bengali)] min-h-[120px] ${errors.message ? 'border-red-500' : ''}`}
                  aria-required="true"
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-500" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--accent-bengali)] hover:bg-[var(--accent-bengali-light)] text-white py-3 rounded text-sm font-medium transition-colors disabled:opacity-60 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-bengali)] cursor-pointer"
              >
                {loading ? (
                  <span>{isBn ? 'পাঠানো হচ্ছে...' : 'Sending...'}</span>
                ) : (
                  <>
                    <span>{isBn ? 'বার্তা পাঠান' : 'Send message'}</span>
                    <Send className="w-3.5 h-3.5" aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
