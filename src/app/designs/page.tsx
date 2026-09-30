'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, Maximize2 } from 'lucide-react';
import SiteHeader from '@/components/layout/Navbar';
import SiteFooter from '@/components/layout/Footer';
import { designs } from '@/data/designs';

export default function DesignsPage() {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [activeImage, setActiveImage] = useState<{ src: string; title: string } | null>(null);
  const isBn = language === 'bn';

  return (
    <div className={`min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col ${isBn ? 'font-hind-siliguri' : 'font-sans'}`}>
      <SiteHeader language={language} onToggleLanguage={() => setLanguage((l) => (l === 'bn' ? 'en' : 'bn'))} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-5 sm:px-8 pt-24 pb-20">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--accent-bengali)] transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          {isBn ? 'হোমে ফিরে যান' : 'Back to Home'}
        </Link>

        {/* Header */}
        <div className="mb-12">
          <p className="section-label text-[var(--accent-bengali)] mb-2">VISUAL EXPERIMENTS</p>
          <h1 className="text-3xl sm:text-5xl font-bold text-[var(--text)] tracking-tight mb-4">
            {isBn ? 'ভিজ্যুয়াল ডিজাইন ও গ্রাফিক্স' : 'Visual Design & Graphics'}
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-2xl leading-relaxed">
            {isBn
              ? 'কৃত্রিম বুদ্ধিমত্তা ও গ্রাফিক্স টুলস ব্যবহার করে তৈরি বিভিন্ন ভিজ্যুয়াল কন্টেন্ট এবং সোশ্যাল মিডিয়া আর্টওয়ার্ক।'
              : 'A curated gallery of visual experiments, educational infographics, and digital artworks.'}
          </p>
        </div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {designs.map((design, idx) => (
            <motion.div
              key={design.src}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              onClick={() => setActiveImage(design)}
              className="group cursor-pointer rounded overflow-hidden border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)] transition-all"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-[var(--surface-2)]">
                <Image
                  src={design.src}
                  alt={design.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="p-2 rounded-full bg-white/90 text-black shadow-sm">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
              </div>
              <div className="p-3 border-t border-[var(--border)]">
                <p className="text-xs font-medium text-[var(--text)] truncate">
                  {design.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center"
            >
              <div className="relative w-full h-[70vh] rounded overflow-hidden">
                <Image
                  src={activeImage.src}
                  alt={activeImage.title}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-white text-sm font-medium mt-4 font-mono">
                {activeImage.title}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SiteFooter language={language} />
    </div>
  );
}
