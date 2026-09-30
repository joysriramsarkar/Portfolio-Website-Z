'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface AboutProps {
  t: {
    aboutTitle: string;
    aboutSubtitle: string;
    aboutText1: string;
    aboutText2: string;
    aboutText3: string;
  };
}

const skills = ['Python', 'TypeScript', 'Next.js', 'Web Dev', 'Open Source', 'Bengali Computing'];

export default function About({ t }: AboutProps) {
  return (
    <section id="about" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-900/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-cyan-900/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(to_top_right,theme(colors.cyan.500),theme(colors.blue.600))] blur-2xl opacity-20 animate-pulse" />
              <Image
                src="/profile.png"
                alt="Joysriram Sarkar"
                fill
                className="relative object-cover rounded-2xl border-2 border-slate-800 shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500"
                priority
                sizes="(max-width: 768px) 288px, 384px"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2"
          >
            <p className="text-cyan-500 font-semibold mb-2 uppercase tracking-wide text-sm">
              {t.aboutTitle}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t.aboutSubtitle}
            </h2>

            <div className="space-y-4 text-slate-300 text-lg leading-relaxed">
              <p>{t.aboutText1}</p>
              <p>{t.aboutText2}</p>
              <p>{t.aboutText3}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="bg-slate-900 text-cyan-400 border border-slate-800 px-4 py-2 hover:border-cyan-500/50 transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
