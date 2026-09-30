'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

interface FeaturedProjectsProps {
  language: 'bn' | 'en';
  t: {
    portfolio: string;
    projectsTitle: string;
    project1Title: string;
    project1Desc: string;
    project1Tech: string;
    project1Link: string;
    project2Title: string;
    project2Desc: string;
    project2Tech: string;
    project2Link: string;
    project3Title: string;
    project3Desc: string;
    project3Tech: string;
    project3Link: string;
  };
}

export default function FeaturedProjects({ language, t }: FeaturedProjectsProps) {
  const projects = [
    {
      id: 'project1',
      title: t.project1Title,
      desc: t.project1Desc,
      tech: t.project1Tech,
      image: '/projects/banglagan.png',
      link: t.project1Link,
    },
    {
      id: 'project2',
      title: t.project2Title,
      desc: t.project2Desc,
      tech: t.project2Tech,
      image: '/projects/banglatyping.png',
      link: t.project2Link,
    },
    {
      id: 'project3',
      title: t.project3Title,
      desc: t.project3Desc,
      tech: t.project3Tech,
      image: '/projects/snakegame.png',
      link: t.project3Link,
    },
  ];

  return (
    <section id="projects" className="py-24 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-cyan-500 font-semibold mb-2 uppercase tracking-wide text-sm">
            {t.portfolio}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">{t.projectsTitle}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.4 }}
              className="group relative"
            >
              {/* Hover glow border */}
              <div className="absolute -inset-0.5 bg-[linear-gradient(to_right,theme(colors.cyan.500),theme(colors.blue.600))] rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500 pointer-events-none" />

              <Card className="relative bg-slate-900 border-slate-800 h-full flex flex-col overflow-hidden">
                {/* Project image */}
                <div className="relative h-48 bg-slate-800 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <CardContent className="p-6 flex-grow flex flex-col">
                  <div className="flex-grow">
                    <Badge className="mb-4 bg-cyan-900/30 text-cyan-400 hover:bg-cyan-900/40 border-0">
                      {project.tech}
                    </Badge>
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-slate-400 mb-6 text-sm leading-relaxed">{project.desc}</p>
                  </div>

                  <div className="mt-auto flex items-center gap-4">
                    <Link href={`/projects/${project.id}?lang=${language}`}>
                      <Button
                        variant="link"
                        className="text-cyan-500 hover:text-cyan-400 p-0 h-auto font-semibold group-hover:translate-x-1 transition-transform"
                      >
                        {language === 'bn' ? 'কেস স্টাডি দেখুন' : 'View Case Study'}{' '}
                        <ExternalLink className="w-4 h-4 ml-1" aria-hidden="true" />
                      </Button>
                    </Link>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-slate-300 text-sm transition-colors ml-auto"
                    >
                      Live →
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
