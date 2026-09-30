'use client';

import { motion } from 'framer-motion';

interface StatsProps {
  t: {
    experience: string;
    experienceLabel: string;
    projects: string;
    projectsLabel: string;
    dedication: string;
    dedicationLabel: string;
    support: string;
    supportLabel: string;
  };
}

export default function Stats({ t }: StatsProps) {
  const stats = [
    { value: t.experience, label: t.experienceLabel },
    { value: t.projects, label: t.projectsLabel },
    { value: t.dedication, label: t.dedicationLabel },
    { value: t.support, label: t.supportLabel },
  ];

  return (
    <section
      className="py-12 bg-slate-950 border-b border-slate-900"
      aria-label="Statistics"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="text-center p-6 rounded-2xl bg-slate-900/50 hover:bg-slate-900 transition-colors border border-slate-800/50"
            >
              <div className="text-3xl md:text-4xl font-bold text-cyan-500 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
