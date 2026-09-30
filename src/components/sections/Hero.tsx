'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface HeroProps {
  language: 'bn' | 'en';
  t: {
    headline: string;
    subheadline: string;
    hireMe: string;
    viewProjects: string;
  };
  onScrollTo: (id: string) => void;
}

export default function Hero({ t, onScrollTo }: HeroProps) {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative bg-slate-950 pt-20"
    >
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 pointer-events-none" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.slate.800/0.1)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.slate.800/0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-cyan-400 text-sm font-medium"
          >
            বাংলা-কেন্দ্রিক Software &amp; Digital Builder
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-[linear-gradient(to_right,theme(colors.cyan.400),theme(colors.blue.500),theme(colors.purple.600))] bg-clip-text text-transparent">
              {t.headline}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
            {t.subheadline}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={() => onScrollTo('projects')}
              className="bg-[linear-gradient(to_right,theme(colors.cyan.600),theme(colors.blue.600))] hover:opacity-90 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-lg shadow-cyan-900/20 transition-opacity"
            >
              {t.viewProjects}
            </Button>
            <Button
              onClick={() => onScrollTo('contact')}
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white font-semibold px-8 py-6 text-lg rounded-full"
            >
              {t.hireMe}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-slate-700 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full bg-cyan-500"
          />
        </div>
      </motion.div>
    </section>
  );
}
