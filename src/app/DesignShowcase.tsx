'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { designs } from '@/data/designs';
import { translations } from './translations';

interface DesignShowcaseProps {
  language: 'bn' | 'en';
  limit?: number;
}

export default function DesignShowcase({ language, limit }: DesignShowcaseProps) {
  const t = translations[language];
  const displayedDesigns = limit ? designs.slice(0, limit) : designs;

  return (
    <section id="designs" className="py-24 bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-cyan-500 font-semibold mb-2">{t.designs}</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white">{t.designsTitle}</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedDesigns.map((design, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-slate-900 border-slate-800 overflow-hidden hover:border-cyan-500/50 transition-all group">
                <CardContent className="p-0">
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={design.src}
                      alt={design.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {/* <div className="p-4">
                    <h4 className="text-lg font-semibold text-white">{design.title}</h4>
                  </div> */}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {limit && designs.length > limit && (
          <div className="mt-12 text-center">
            <Link href="/designs">
              <Button size="lg" className="bg-transparent border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white transition-all">
                {t.viewAllDesigns} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
