// ============================================================
// Project Master Database
// ============================================================
// সব project এখানে — homepage curated list এবং /projects full catalogue দুটোই এখান থেকে আসে।
// নতুন project যোগ করতে হলে শুধু এই ফাইলেই যোগ করো।

export type ProjectStatus =
  | 'live'
  | 'building'
  | 'experiment'
  | 'paused'
  | 'archived'
  | 'idea';

export type ProjectCategory =
  | 'bengali-tech'
  | 'software'
  | 'developer-tools'
  | 'os-ecosystem'
  | 'community'
  | 'experiment'
  | 'web';

export interface Project {
  slug: string;
  name: string;
  nameBn: string;
  tagline: string;
  taglineBn: string;
  description: string;
  descriptionBn: string;

  category: ProjectCategory;
  status: ProjectStatus;
  featured: boolean;       // homepage-এ দেখাবে
  year: number;

  technologies: string[];
  platforms?: string[];    // Web, Android, CLI, etc.

  githubUrl?: string;
  liveUrl?: string;

  coverImage?: string;     // /projects/xxx.png
  screenshots?: string[];

  // Case study content
  problem?: string;
  problemBn?: string;
  solution?: string;
  solutionBn?: string;
  architecture?: string;   // text description of arch
  lessons?: string;
  lessonsBn?: string;
  nextSteps?: string;

  highlights?: string[];   // bullet points (e.g. "13 levels", "61 lessons")
}

export const projects: Project[] = [
  // ── A. Bengali Technology ─────────────────────────────────
  {
    slug: 'banglagan',
    name: 'BanglaGan',
    nameBn: 'বাংলাগান',
    tagline: 'Bengali music data and discovery ecosystem',
    taglineBn: 'বাংলা সংগীতের তথ্যভান্ডার ও আবিষ্কার ব্যবস্থা',
    description:
      'A comprehensive database and discovery platform for Bengali music — covering songs, artists, albums, and lyrics. Available on both web and Android.',
    descriptionBn:
      'বাংলা গান, শিল্পী, অ্যালবাম ও গানের কথার একটি বিশাল তথ্যভান্ডার ও আবিষ্কার প্ল্যাটফর্ম। Web এবং Android উভয় প্ল্যাটফর্মে পাওয়া যায়।',
    category: 'bengali-tech',
    status: 'building',
    featured: true,
    year: 2023,
    technologies: ['Node.js', 'TypeScript', 'SQLite'],
    platforms: ['Web', 'Android'],
    githubUrl: 'https://github.com/joysriramsarkar/banglagan',
    liveUrl: 'https://banglagan.vercel.app',
    coverImage: '/projects/banglagan.png',
    highlights: ['Web + Android', 'Offline data', 'Full-text search', 'Structured music metadata'],
    problem: 'Bengali music data is scattered across the internet with no structured, searchable database.',
    solution: 'A unified platform with structured metadata, offline support, and cross-platform access.',
  },
  {
    slug: 'banglagan-android',
    name: 'BanglaGan Android',
    nameBn: 'বাংলাগান অ্যান্ড্রয়েড',
    tagline: 'Native Android app for Bengali music discovery',
    taglineBn: 'বাংলা সংগীত আবিষ্কারের জন্য অ্যান্ড্রয়েড অ্যাপ',
    description: 'The native Android companion app for BanglaGan with offline data access.',
    descriptionBn: 'বাংলাগানের অফলাইন ডেটা সহ অ্যান্ড্রয়েড অ্যাপ।',
    category: 'bengali-tech',
    status: 'building',
    featured: false,
    year: 2024,
    technologies: ['Android', 'Java', 'SQLite'],
    platforms: ['Android'],
    githubUrl: 'https://github.com/joysriramsarkar/banglagan_android_app',
  },
  {
    slug: 'bangla-typing',
    name: 'Bangla Typing',
    nameBn: 'বাংলা টাইপিং',
    tagline: 'Bengali typing learning and testing platform',
    taglineBn: 'বাংলা টাইপিং শেখা, অনুশীলন ও পরীক্ষার প্ল্যাটফর্ম',
    description:
      'A full-stack Bengali typing education platform. Structured curriculum with 13 levels, 61 lessons, multiple keyboard layouts, grapheme engine, accessibility support, and certificate system.',
    descriptionBn:
      '১৩টি স্তর, ৬১টি পাঠ, একাধিক কীবোর্ড লেআউট, গ্রাফিম ইঞ্জিন, অ্যাক্সেসিবিলিটি সাপোর্ট এবং সার্টিফিকেট সিস্টেম সহ একটি সম্পূর্ণ বাংলা টাইপিং শিক্ষা প্ল্যাটফর্ম।',
    category: 'bengali-tech',
    status: 'live',
    featured: true,
    year: 2024,
    technologies: ['Next.js', 'TypeScript', 'Supabase'],
    platforms: ['Web'],
    githubUrl: 'https://github.com/joysriramsarkar/banglatyping',
    liveUrl: 'https://typingbangla.vercel.app/',
    coverImage: '/projects/banglatyping.png',
    highlights: [
      '13 curriculum levels',
      '61 structured lessons',
      'Multiple keyboard layouts',
      'Grapheme engine',
      'Accessibility focused',
      'Certificate system',
    ],
    problem: 'No structured, progressive learning platform exists for Bengali keyboard typing.',
    solution: 'A curriculum-based platform that teaches from basics to advanced layouts with real-time validation.',
    lessons: 'Building a grapheme-aware engine for Bengali required understanding Unicode normalization at a deep level.',
  },

  // ── B. Software Products ──────────────────────────────────
  {
    slug: 'pos',
    name: 'POS / Inventory',
    nameBn: 'পয়েন্ট অব সেল / ইনভেন্টরি',
    tagline: 'Offline-first business management software',
    taglineBn: 'অফলাইন-প্রথম ব্যবসা ব্যবস্থাপনা সফটওয়্যার',
    description:
      'A full-featured Point of Sale and inventory management system. Supports offline-first PWA mode, authentication, inventory tracking, and receipt printing.',
    descriptionBn:
      'একটি পূর্ণাঙ্গ পয়েন্ট অব সেল ও ইনভেন্টরি ম্যানেজমেন্ট সিস্টেম। অফলাইন-প্রথম PWA মোড, অথেন্টিকেশন, ইনভেন্টরি ট্র্যাকিং এবং রিসিট প্রিন্টিং সমর্থন করে।',
    category: 'software',
    status: 'building',
    featured: true,
    year: 2024,
    technologies: ['React', 'TypeScript', 'Prisma', 'SQLite'],
    platforms: ['Web', 'PWA'],
    githubUrl: 'https://github.com/joysriramsarkar/pos-app',
    highlights: ['Offline-first PWA', 'Authentication', 'Inventory tracking', 'Receipt printing'],
  },
  {
    slug: 'chalao',
    name: 'Chalao',
    nameBn: 'চালাও',
    tagline: 'Multi-app ride-sharing platform',
    taglineBn: 'বহু-অ্যাপ রাইড-শেয়ারিং প্ল্যাটফর্ম',
    description:
      'A ride-sharing platform with separate rider, driver, and admin applications. Features real-time tracking, booking management, and a unified backend.',
    descriptionBn:
      'আলাদা রাইডার, ড্রাইভার ও অ্যাডমিন অ্যাপ্লিকেশন সহ একটি রাইড-শেয়ারিং প্ল্যাটফর্ম।',
    category: 'software',
    status: 'building',
    featured: true,
    year: 2025,
    technologies: ['Next.js', 'TypeScript', 'Socket.IO', 'Prisma'],
    platforms: ['Web', 'Mobile'],
    githubUrl: 'https://github.com/joysriramsarkar/chalao',
    highlights: ['Rider + Driver + Admin apps', 'Real-time tracking', 'Booking system', 'Multi-layer architecture'],
  },

  // ── C. Developer Technology ───────────────────────────────
  {
    slug: 'nilang',
    name: 'Nilang',
    nameBn: 'নীলং',
    tagline: 'A programming language experiment',
    taglineBn: 'একটি প্রোগ্রামিং ভাষার পরীক্ষা-নিরীক্ষা',
    description:
      'An experimental programming language built from scratch. Part of the Onuron ecosystem — exploring language design, parsing, and interpretation.',
    descriptionBn:
      'শূন্য থেকে তৈরি একটি পরীক্ষামূলক প্রোগ্রামিং ভাষা। Onuron ইকোসিস্টেমের অংশ।',
    category: 'developer-tools',
    status: 'experiment',
    featured: true,
    year: 2024,
    technologies: ['Python', 'TypeScript'],
    platforms: ['CLI'],
    githubUrl: 'https://github.com/joysriramsarkar/nilLang',
    highlights: ['Custom lexer + parser', 'Interpreted language', 'Part of Onuron ecosystem'],
  },
  {
    slug: 'alap',
    name: 'Alap',
    nameBn: 'আলাপ',
    tagline: 'A framework for the Onuron ecosystem',
    taglineBn: 'Onuron ইকোসিস্টেমের জন্য একটি ফ্রেমওয়ার্ক',
    description:
      'A framework and application layer built on top of Nilang and the broader Onuron technology ecosystem.',
    descriptionBn:
      'নীলং ও বৃহত্তর Onuron প্রযুক্তি ইকোসিস্টেমের উপর নির্মিত একটি ফ্রেমওয়ার্ক।',
    category: 'developer-tools',
    status: 'experiment',
    featured: false,
    year: 2024,
    technologies: ['TypeScript', 'Python'],
    githubUrl: 'https://github.com/joysriramsarkar/alap_framework',
    highlights: ['Built on Nilang', 'Application framework', 'Onuron ecosystem'],
  },

  // ── D. OS / Ecosystem ─────────────────────────────────────
  {
    slug: 'onuron',
    name: 'Onuron',
    nameBn: 'অনুরণ',
    tagline: 'A long-term open-source technology ecosystem',
    taglineBn: 'একটি দীর্ঘমেয়াদি ওপেন-সোর্স প্রযুক্তি ইকোসিস্টেম',
    description:
      'A long-term research and development project exploring programming language design, application frameworks, and personal computing systems.',
    descriptionBn:
      'প্রোগ্রামিং ভাষার ডিজাইন, অ্যাপ্লিকেশন ফ্রেমওয়ার্ক এবং ব্যক্তিগত কম্পিউটিং সিস্টেম নিয়ে একটি দীর্ঘমেয়াদি গবেষণা ও উন্নয়ন প্রকল্প।',
    category: 'os-ecosystem',
    status: 'experiment',
    featured: true,
    year: 2023,
    technologies: ['Python', 'TypeScript', 'C', 'Assembly'],
    githubUrl: 'https://github.com/joysriramsarkar/onuron_project',
    highlights: [
      'Custom programming language (Nilang)',
      'Application framework (Alap)',
      'Long-term research direction',
      'Open-source',
    ],
  },

  // ── F. Experiments ────────────────────────────────────────
  {
    slug: 'snake-game',
    name: 'Snake Game',
    nameBn: 'স্নেক গেম',
    tagline: 'Classic Snake game built with TypeScript',
    taglineBn: 'TypeScript-এ তৈরি ক্লাসিক স্নেক গেম',
    description: 'A modern implementation of the classic Snake game using TypeScript and Canvas API.',
    descriptionBn: 'TypeScript এবং Canvas API ব্যবহার করে তৈরি ক্লাসিক স্নেক গেমের আধুনিক সংস্করণ।',
    category: 'experiment',
    status: 'archived',
    featured: false,
    year: 2023,
    technologies: ['TypeScript', 'Canvas API'],
    platforms: ['Web'],
    githubUrl: 'https://github.com/joysriramsarkar/snakegame',
    liveUrl: 'https://snakegamez.vercel.app',
    coverImage: '/projects/snakegame.png',
  },
];

// Helpers
export const featuredProjects = projects.filter((p) => p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const projectsByCategory = (cat: ProjectCategory) =>
  projects.filter((p) => p.category === cat);
