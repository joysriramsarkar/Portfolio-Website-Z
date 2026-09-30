'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Code, PenTool, Palette } from 'lucide-react';
import { ElementType } from 'react';

interface ServicesProps {
  t: {
    servicesTitle: string;
    service1Title: string;
    service1Desc: string;
    service2Title: string;
    service2Desc: string;
    service3Title: string;
    service3Desc: string;
  };
}

interface ServiceItem {
  title: string;
  desc: string;
  icon: ElementType;
}

export default function Services({ t }: ServicesProps) {
  const services: ServiceItem[] = [
    { title: t.service1Title, desc: t.service1Desc, icon: PenTool },
    { title: t.service2Title, desc: t.service2Desc, icon: Palette },
    { title: t.service3Title, desc: t.service3Desc, icon: Code },
  ];

  return (
    <section id="services" className="py-24 bg-slate-900/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-cyan-500 font-semibold mb-2 uppercase tracking-wide text-sm">
            {t.servicesTitle}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">What I Offer</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.4 }}
            >
              <Card className="bg-slate-900 border-slate-800 hover:border-cyan-500/50 transition-all h-full group">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-900/20 flex items-center justify-center mb-6 group-hover:bg-cyan-600 transition-colors duration-300">
                    <service.icon
                      className="w-7 h-7 text-cyan-500 group-hover:text-white transition-colors"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{service.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
