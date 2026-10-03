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
    problem: 'Bengali music data is scattered across fragmented forums, low-quality metadata, and lacks a unified searchable repository.',
    problemBn: 'বাংলা গানের ডেটা, লিরিক্স ও শিল্পী সংক্রান্ত তথ্য ইন্টারনেটে ছড়ানো-ছিটানো এবং কোনো সমন্বিত ও সহজে অনুসন্ধানযোগ্য ডেটাবেস নেই।',
    solution: 'A unified platform with structured metadata, offline support, and cross-platform access.',
    solutionBn: 'লিরিক্স, মেটাডেটা ও শিল্পীদের তথ্যের একটি কাঠামোবদ্ধ প্ল্যাটফর্ম—যা ফুল-টেক্সট সার্চ এবং অফলাইন সুবিধা সমর্থন করে।',
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
    problem: 'Web applications can be slow or inaccessible on low-end Android devices with patchy internet connectivity in regional areas.',
    problemBn: 'ধীরগতির ইন্টারনেট সংযোগ বা এন্ট্রি-লেভেল ফোনে ব্রাউজার লোডিংয়ের ঝামেলা ছাড়াই তাৎক্ষণিক বাংলা গানের কথা পাওয়ার জন্য নেটিভ সমাধান দরকার ছিল।',
    solution: 'A lightweight native Android companion application utilizing local SQLite caching for instantaneous offline lyrics and album retrieval.',
    solutionBn: 'স্থানীয় SQLite ডেটাবেস ক্যাশিং সহ একটি হালকা নেটিভ অ্যান্ড্রয়েড অ্যাপ, যা অফলাইনেও দ্রুত লিরিক্স ও গানের তথ্য দেখায়।',
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
    liveUrl: 'https://typing.onuron.org/',
    coverImage: '/projects/banglatyping.png',
    highlights: [
      '13 curriculum levels',
      '61 structured lessons',
      'Multiple keyboard layouts',
      'Grapheme engine',
      'Accessibility focused',
      'Certificate system',
    ],
    problem: 'No structured, progressive learning platform exists for Bengali keyboard typing. Most tools only test speed — they do not teach. And standard string indexing breaks for Bengali conjuncts (যুক্তবর্ণ).',
    problemBn: 'বাংলা কীবোর্ড টাইপিং শেখার জন্য কোনো কাঠামোবদ্ধ, ধাপে-ধাপে প্ল্যাটফর্ম নেই। বেশিরভাগ টুল শুধু গতি মাপে, শেখায় না। এছাড়া বাংলা যুক্তবর্ণের কারণে সাধারণ string indexing ভেঙে যায়।',
    solution: 'A curriculum-based platform teaching from basics to advanced layouts with real-time grapheme-aware validation. Each lesson targets specific letter groups. The grapheme engine uses Intl.Segmenter and Unicode NFC normalization to correctly identify and compare Bengali characters regardless of code-point count.',
    solutionBn: 'একটি পাঠ্যক্রম-ভিত্তিক প্ল্যাটফর্ম যা মৌলিক থেকে উন্নত লেআউট পর্যন্ত রিয়েল-টাইম গ্রাফিম-সচেতন যাচাইকরণ সহ শেখায়। গ্রাফিম ইঞ্জিন Intl.Segmenter ও Unicode NFC normalization ব্যবহার করে।',
    architecture: 'Next.js App Router for routing and server components. Supabase for user progress, certificates, and leaderboard. Custom grapheme engine in TypeScript handles Bengali Unicode segmentation. Keyboard layout engine supports Avro, Bijoy, and Unicode layouts. Lesson content is statically typed — no database calls for lesson data.',
    lessons: 'The hardest part was not the typing engine itself — it was the grapheme segmentation. Bengali "ক্ষ" is three code points but one conceptual character. Standard .length, .slice(), and indexOf() all fail. Switching to Intl.Segmenter fixed all backspace, cursor, and error-count bugs at once. Lesson: do not assume string primitives work for non-Latin scripts.',
    lessonsBn: 'সবচেয়ে কঠিন অংশ ছিল grapheme segmentation। বাংলা "ক্ষ" তিনটি Unicode code point কিন্তু একটিই conceptual character। .length, .slice() সব ব্যর্থ হয়েছিল। Intl.Segmenter-এ সুইচ করলে backspace, cursor এবং error-count-এর সব বাগ একবারে ঠিক হয়ে যায়।',
    nextSteps: 'Offline mode via Service Worker, voice-assisted pronunciation, and mobile virtual keyboard support.',
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
    technologies: ['React', 'TypeScript', 'SQLite', 'Vite'],
    platforms: ['Web', 'PWA'],
    githubUrl: 'https://github.com/joysriramsarkar/pos-app',
    liveUrl: 'https://pos.onuron.org/',
    highlights: ['Offline-first PWA', 'Authentication', 'Inventory tracking', 'Receipt printing'],
    problem: 'Small Bengali retailers (like family shops) need inventory and billing software that works without a reliable internet connection. Cloud-only solutions fail during outages; desktop software is expensive and hard to maintain.',
    problemBn: 'ছোট বাংলা দোকানদারদের (যেমন পারিবারিক দোকান) এমন ইনভেন্টরি ও বিলিং সফটওয়্যার দরকার যা নিরবচ্ছিন্ন ইন্টারনেট ছাড়াও কাজ করে। শুধু cloud-ভিত্তিক সমাধান বিদ্যুৎ বা নেট বিচ্ছিন্নতায় ব্যর্থ হয়।',
    solution: 'A PWA with IndexedDB for local-first storage. Sales, inventory, and products are stored locally and sync when connectivity is restored. Receipt printing uses the browser print API — no external dependencies.',
    solutionBn: 'IndexedDB সহ একটি PWA যা local-first storage ব্যবহার করে। বিক্রয়, ইনভেন্টরি এবং পণ্য স্থানীয়ভাবে সংরক্ষিত হয় এবং সংযোগ ফিরলে sync করে।',
    architecture: 'React + TypeScript frontend. IndexedDB via idb library for offline storage. Service Worker for PWA capabilities and background sync. SQLite used in development for schema design reference. Receipt generation via browser print API with custom CSS print media query.',
    lessons: 'The original design used Prisma + SQLite which broke on Vercel (read-only filesystem). Learned that serverless platforms require either an external database or a client-side storage solution. Migrated to IndexedDB + Service Worker — which actually improved the offline experience significantly.',
    lessonsBn: 'প্রথমে Prisma + SQLite ব্যবহার করা হয়েছিল যা Vercel-এ কাজ করেনি (read-only filesystem)। শিক্ষা: serverless প্ল্যাটফর্মে local file-based DB চলে না। IndexedDB + Service Worker-এ মাইগ্রেশন অফলাইন অভিজ্ঞতা আরও উন্নত করেছে।',
    nextSteps: 'Cloud backup via Supabase for cross-device sync, multi-user support with role-based access, and PDF receipt export.',
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
    problem: 'Existing commercial ride-sharing stacks are closed-source, heavy, and too rigid for small regional transit experiments and private fleets.',
    problemBn: 'বিদ্যমান বাণিজ্যিক রাইড-শেয়ারিং প্ল্যাটফর্মগুলো ভারী ও ব্যয়বহুল, যা ছোট বা স্থানীয় পরিবহন ব্যবস্থাপনায় সহজে ব্যবহার করা যায় না।',
    solution: 'A modular multi-app architecture separating rider dispatch, driver status sync, and admin routing through WebSockets and Next.js.',
    solutionBn: 'যাত্রী বুকিং, চালক ট্র্যাকিং এবং অ্যাডমিন ম্যানেজমেন্টের জন্য আলাদা মডিউলার অ্যাপ ও রিয়েল-টাইম আর্কিটেকচার।',
    architecture: 'Next.js App Router for frontend portals. WebSocket events for real-time driver coordinates and trip state machine. PostgreSQL/Prisma for trip logs and user state.',
    lessons: 'State machine synchronization between independent client and driver screens requires strict server-authoritative trip status to avoid race conditions.',
    lessonsBn: 'চালক ও যাত্রীর আলাদা ডিভাইসের মধ্যে স্ট্যাটাস সিঙ্ক রাখার ক্ষেত্রে সার্ভার-অথরিটেটিভ ট্রিপ ট্র্যাকিং অত্যন্ত জরুরি।',
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
    problem: 'Understanding programming language internals and interpreters requires practical implementation rather than abstract compiler theory.',
    problemBn: 'কম্পাইলার ডিজাইন ও সিনট্যাক্স অ্যানালাইসিস গভীরভাবে বোঝার জন্য নিজে হাতে একটি ইন্টারপ্রেটার তৈরি করার প্রয়োজনীয়তা ছিল।',
    solution: 'A custom interpreted toy language implementing tokenization, a recursive-descent parser, an Abstract Syntax Tree (AST), and an execution environment.',
    solutionBn: 'টোকেনাইজার, রিকার্সিভ-ডিসেন্ট পার্সার, এএসটি (AST) এবং এক্সিকিউশন রানটাইম সহ একটি নিজস্ব স্ক্রিপ্টিং ভাষা।',
    architecture: 'Custom lexer scanning source code into tokens. Recursive descent parser creating an Abstract Syntax Tree. Tree-walk evaluator executing expressions with a lexical environment.',
    lessons: 'Handling operator precedence and associativity cleanly in recursive descent parsing is much simpler with Pratt parsing techniques than deeply nested grammar rules.',
    lessonsBn: 'রিকার্সিভ-ডিসেন্ট পার্সিংয়ে অপারেটর প্রিসিডেন্স সামলানোই ছিল সবচেয়ে বড় শেখার বিষয়।',
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
    problem: 'Experimental languages need a standard library layer and execution harness to test real-world utilities and applications.',
    problemBn: 'কোনো নতুন বা পরীক্ষামূলক ভাষার ওপর বাস্তবসম্মত টার্মিনাল টুল বা অ্যাপ্লিকেশন নির্মাণের জন্য ফ্রেমওয়ার্ক দরকার।',
    solution: 'A lightweight modular framework providing standard IO helpers, CLI argument parsing, and application lifecycle helpers on Nilang.',
    solutionBn: 'নীলং ভাষার ওপর ভিত্তি করে স্ট্যান্ডার্ড আই/ও, কমান্ড-লাইন আর্গুমেন্ট পার্সিং এবং অ্যাপ্লিকেশন লাইফসাইকেল লাইব্রেরি।',
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
    liveUrl: 'https://onuron.org/',
    highlights: [
      'Custom programming language (Nilang)',
      'Application framework (Alap)',
      'Long-term research direction',
      'Open-source',
    ],
    problem: 'Modern computing environments are predominantly English-first, with native non-Latin language tooling rarely treated as first-class citizens in terminal interfaces.',
    problemBn: 'আধুনিক কম্পিউটিং ব্যবস্থাগুলো মূলত ইংরেজি কেন্দ্রিক। বাংলা ভাষায় সিস্টেম টুলস ও টার্মিনাল-ফার্স্ট ওয়ার্কফ্লো নিয়ে কাজের পরিধি সীমিত।',
    solution: 'A long-term exploratory ecosystem encompassing language design, terminal utilities, and personal computing experiments built for the Bengali engineering community.',
    solutionBn: 'বাংলাবান্ধব কম্পিউটিংয়ের জন্য প্রোগ্রামিং ভাষা, টার্মিনাল ইউটিলিটি এবং সফটওয়্যার ইকোসিস্টেমের একটি দীর্ঘমেয়াদি গবেষণা উদ্যোগ।',
    architecture: 'Multi-layer system comprising Nilang (language layer), Alap (framework layer), and modular CLI tools. Written across Python, TypeScript, and C.',
    lessons: 'Building an ecosystem requires clear separation of layers — language specifications must remain decoupled from specific application framework implementations.',
    lessonsBn: 'একটি প্রযুক্তি ইকোসিস্টেম তৈরির জন্য স্তরগুলোর মধ্যে স্বাধীনতা বজায় রাখা জরুরি।',
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
    highlights: ['Canvas 2D rendering', '60 FPS game loop', 'Grid collision logic', 'Responsive controls'],
    problem: 'Exploring high-performance 2D rendering and collision physics in the browser without relying on external heavy game engines.',
    problemBn: 'কোনো ভারী গেম ইঞ্জিন ছাড়া আধুনিক ব্রাউজারে ক্যানভাস দিয়ে ৬০ এফপিএস ২ডি রেন্ডারিং এবং গ্রিড কলিশন মেকানিক্স পরীক্ষা করা।',
    solution: 'A lightweight TypeScript implementation leveraging HTML5 Canvas 2D, requestAnimationFrame game loops, and coordinate-based collision detection.',
    solutionBn: 'এইচটিএমএল৫ ক্যানভাস, রিকোয়েস্টঅ্যানিমেশনফ্রেম এবং পরিচ্ছন্ন টাইপস্ক্রিপ্ট লজিক দিয়ে তৈরি মসৃণ গেম আর্কিটেকচার।',
    architecture: 'HTML5 Canvas 2D context. requestAnimationFrame game loop with delta timing. State machine for Start, Running, Paused, and Game Over states.',
    lessons: 'Decoupling game state updates from rendering frames is essential to prevent speed variations on high refresh rate displays (60Hz vs 144Hz).',
    lessonsBn: 'হাই রিফ্রেশ রেট মনিটরে (৬০Hz বনাম ১৪৪Hz) গেমের গতি ঠিক রাখার জন্য রেন্ডারিং ফ্রেম থেকে গেম স্টেট আলাদা রাখা আবশ্যক।',
  },
];

// Helpers
export const featuredProjects = projects.filter((p) => p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const projectsByCategory = (cat: ProjectCategory) =>
  projects.filter((p) => p.category === cat);
