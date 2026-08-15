import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Code } from 'lucide-react';
import ProjectDetailsClient from './ProjectDetailsClient';

async function getProject(id: string) {
  const project = await prisma.project.findUnique({
    where: { id },
  });
  return project;
}

export default async function ProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);
  const { lang } = await searchParams;

  if (!project) {
    notFound();
  }

  // Determine language (default to Bengali to match existing app, or based on query param if passed)
  const isBn = lang !== 'en';

  const title = isBn ? project.titleBn : project.titleEn;
  const desc = isBn ? project.descBn : project.descEn;
  const challenges = isBn ? project.challengesBn : project.challengesEn;
  const solutions = isBn ? project.solutionsBn : project.solutionsEn;

  let parsedMetrics = [];
  try {
    if (project.metrics) {
      parsedMetrics = JSON.parse(project.metrics);
    }
  } catch (e) {
    console.error("Failed to parse metrics", e);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href={`/?lang=${isBn ? 'bn' : 'en'}`}
          className="inline-flex items-center text-cyan-500 hover:text-cyan-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {isBn ? 'হোমে ফিরে যান' : 'Back to Home'}
        </Link>

        <header className="mb-12">
          <div className="inline-block bg-cyan-900/30 text-cyan-400 px-3 py-1 rounded-full text-sm font-semibold mb-4 border border-cyan-800/50">
            {project.tech}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-xl text-slate-400 mb-8">
            {desc}
          </p>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            {isBn ? 'প্রজেক্ট দেখুন' : 'Visit Project'}
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </header>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="bg-red-500/20 text-red-400 p-2 rounded-lg mr-3">
                 <Code className="w-5 h-5" />
              </span>
              {isBn ? 'চ্যালেঞ্জসমূহ' : 'Challenges'}
            </h2>
            <p className="text-slate-400 leading-relaxed">
              {challenges}
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="bg-green-500/20 text-green-400 p-2 rounded-lg mr-3">
                 <Code className="w-5 h-5" />
              </span>
              {isBn ? 'সমাধান' : 'Solutions'}
            </h2>
            <p className="text-slate-400 leading-relaxed">
              {solutions}
            </p>
          </div>
        </div>

        {parsedMetrics && parsedMetrics.length > 0 && (
          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-xl mt-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              {isBn ? 'পারফরম্যান্স এবং গ্রোথ' : 'Performance & Growth'}
            </h2>
            <ProjectDetailsClient metrics={parsedMetrics} isBn={isBn} />
          </div>
        )}
      </div>
    </div>
  );
}
