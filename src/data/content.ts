// Build Log — technical journal
// নতুন entry সামনে যোগ করো

export interface BuildLogEntry {
  date: string;       // ISO date string: "2026-09-30"
  entries: string[];  // multiple updates per day possible
}

export const buildLog: BuildLogEntry[] = [
  {
    date: '2026-09-30',
    entries: [
      'Redesigned portfolio architecture — editorial identity, new color system, component restructure',
      'Removed broken Blog nav link, fixed contact form validation',
    ],
  },
  {
    date: '2026-09-29',
    entries: [
      'Studied CSS sizing and responsive layout techniques',
    ],
  },
  {
    date: '2026-09-27',
    entries: [
      'Improved Bangla Typing grapheme interaction and test flow',
    ],
  },
  {
    date: '2026-09-25',
    entries: [
      'Worked on POS database schema and Python tooling',
    ],
  },
  {
    date: '2026-09-20',
    entries: [
      'Explored Nilang language parser improvements',
    ],
  },
];

// Timeline — About page
export interface TimelineEntry {
  period: string;
  eventEn: string;
  eventBn: string;
}

export const timeline: TimelineEntry[] = [
  { period: '2019', eventEn: 'Bengali literary studies — poetry and writing', eventBn: 'বাংলা সাহিত্য অধ্যয়ন — কবিতা ও লেখালেখি' },
  { period: '2020', eventEn: 'First encounter with technology and Linux', eventBn: 'প্রযুক্তি ও Linux-এর সাথে প্রথম পরিচয়' },
  { period: '2021', eventEn: 'Networking, hardware, and system administration', eventBn: 'নেটওয়ার্কিং, হার্ডওয়্যার ও সিস্টেম অ্যাডমিনিস্ট্রেশন' },
  { period: '2022', eventEn: 'Python, web development basics, first scripts', eventBn: 'Python, ওয়েব ডেভেলপমেন্টের মূলনীতি, প্রথম স্ক্রিপ্ট' },
  { period: '2023', eventEn: 'BanglaGan — first real open-source project', eventBn: 'বাংলাগান — প্রথম বাস্তব ওপেন-সোর্স প্রকল্প' },
  { period: '2024', eventEn: 'Bangla Typing, POS, Onuron ecosystem — AI-assisted development', eventBn: 'বাংলা টাইপিং, POS, Onuron ইকোসিস্টেম — AI-সহায়ক উন্নয়ন' },
  { period: '2025', eventEn: 'Chalao, deeper engineering — full-stack, Android, language design', eventBn: 'চালাও, গভীরতর ইঞ্জিনিয়ারিং — ফুল-স্ট্যাক, অ্যান্ড্রয়েড, ভাষার নকশা' },
  { period: '2026 →', eventEn: 'Building in public — Bengali-first software ecosystem', eventBn: 'প্রকাশ্যে তৈরি করা — বাংলা-প্রথম সফটওয়্যার ইকোসিস্টেম' },
];

// Lab — learning/experimenting status
export interface LabItem {
  nameEn: string;
  nameBn: string;
  status: 'learning' | 'experimenting' | 'testing' | 'building';
  descEn?: string;
  descBn?: string;
}

export const labItems: LabItem[] = [
  { nameEn: 'AI-assisted software development', nameBn: 'AI-সহায়ক সফটওয়্যার উন্নয়ন', status: 'building', descEn: 'Using AI coding assistants as a primary development tool', descBn: 'AI কোডিং সহকারী মূল উন্নয়ন সরঞ্জাম হিসেবে ব্যবহার' },
  { nameEn: 'CSS / Responsive Design', nameBn: 'CSS / রেসপন্সিভ ডিজাইন', status: 'learning', descEn: 'Deep-diving into layout, sizing, and design systems', descBn: 'লেআউট, সাইজিং ও ডিজাইন সিস্টেম নিয়ে গভীরে যাওয়া' },
  { nameEn: 'Python', nameBn: 'Python', status: 'building', descEn: 'Automation, data processing, CLI tools', descBn: 'অটোমেশন, ডেটা প্রসেসিং, CLI টুল' },
  { nameEn: 'Databases', nameBn: 'ডেটাবেস', status: 'learning', descEn: 'SQL, SQLite, Prisma, schema design', descBn: 'SQL, SQLite, Prisma, স্কিমা ডিজাইন' },
  { nameEn: 'AI Mathematics', nameBn: 'AI গণিত', status: 'experimenting', descEn: 'Linear algebra, probability, neural network basics', descBn: 'রৈখিক বীজগণিত, সম্ভাবনা, নিউরাল নেটওয়ার্কের মূলনীতি' },
  { nameEn: 'Programming Language Design', nameBn: 'প্রোগ্রামিং ভাষার নকশা', status: 'experimenting', descEn: 'Lexers, parsers, interpreters — through Nilang', descBn: 'লেক্সার, পার্সার, ইন্টারপ্রেটার — নীলং-এর মাধ্যমে' },
  { nameEn: 'Android Development', nameBn: 'অ্যান্ড্রয়েড ডেভেলপমেন্ট', status: 'learning', descEn: 'Native Android, Room database, UI', descBn: 'নেটিভ অ্যান্ড্রয়েড, Room ডেটাবেস, UI' },
  { nameEn: 'Linux', nameBn: 'Linux', status: 'building', descEn: 'System administration, shell scripting', descBn: 'সিস্টেম অ্যাডমিনিস্ট্রেশন, শেল স্ক্রিপ্টিং' },
];
