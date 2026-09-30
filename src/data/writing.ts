// ============================================================
// Writing / Technical Articles
// ============================================================

export interface Article {
  slug: string;
  titleEn: string;
  titleBn: string;
  date: string;
  readTimeEn: string;
  readTimeBn: string;
  category: string;
  categoryBn: string;
  excerptEn: string;
  excerptBn: string;
  contentBn: string[];
  contentEn: string[];
}

export const articles: Article[] = [
  {
    slug: 'ai-assisted-software-development',
    titleEn: 'How I Build Software and Websites with AI',
    titleBn: 'আমি কীভাবে AI ব্যবহার করে software ও website বানাই',
    date: '2026-09-28',
    readTimeEn: '5 min read',
    readTimeBn: '৫ মিনিট পড়ার সময়',
    category: 'Engineering',
    categoryBn: 'ইঞ্জিনিয়ারিং',
    excerptEn: 'AI is not a replacement for thinking. It is an amplifier of clear specifications, systematic debugging, and user empathy.',
    excerptBn: 'AI কোনো অলৌকিক সমাধান নয়; এটি একটি শক্তিশালী সহকারী। স্পষ্ট পরিকল্পনা, স্থাপত্য চিন্তা এবং দায়িত্ববান পরীক্ষা ছাড়া কোনো ভালো সফটওয়্যার তৈরি হয় না।',
    contentBn: [
      'আমি যখন কোনো প্রজেক্ট শুরু করি, তখন সরাসরি কোড জেনারেট করতে বলি না। সবার আগে আমি সমস্যাটিকে কাগজে লিখে বা নোটে ছোট ছোট ভাগে ভেঙে নিই: ইউজার কী দেখতে চায়, ডেটা কোন পথে যাবে, কোথায় সমস্যা হতে পারে।',
      'দ্বিতীয় ধাপে আমি ডিজাইন সিস্টেম এবং ডেটা স্কিমা নির্ধারণ করি। ডেটা টাইপ এবং ইউজার ইন্টারফেসের স্পষ্ট চিত্র থাকলে AI মডেলকে সঠিক নির্দেশ দেওয়া যায়।',
      'তৃতীয় ধাপে আসে AI-সহায়ক কোডিং। এখানে AI আমার জন্য বয়লারপ্লেট, কম্পোনেন্ট বা অ্যালগরিদম তৈরি করে দেয়। কিন্তু প্রতিটি লাইনের উদ্দেশ্য বোঝা আমার দায়িত্ব।',
      'চতুর্থ এবং সবচেয়ে গুরুত্বপূর্ণ ধাপ হলো টেস্টিং এবং ডিবাগিং। ব্রাউজারের বিভিন্ন ভিউপোর্টে দেখা, এক্সেসিবিলিটি যাচাই করা, পারফরম্যান্স মাপা—এই কাজগুলো মানুষের যাচাই ছাড়া পূর্ণাঙ্গ হয় না।',
      'AI আমার টুল; কিন্তু প্রজেক্টটির কার্যকারিতা, নিরাপত্তা ও স্থায়িত্ব সম্পূর্ণ আমার দায়বদ্ধতা।'
    ],
    contentEn: [
      'When I begin a project, I do not jump straight into AI prompts for code. First, I break the problem down into written specifications: what the user needs, data flow architecture, and potential failure modes.',
      'In the second stage, I define the design tokens, typography, and typed data schemas. Clean specifications allow the AI assistant to produce reliable, modular implementations.',
      'Third comes the AI-assisted implementation. The AI acts as a pair programmer for boilerplate, component structure, and state management. However, understanding every line remains my responsibility.',
      'The fourth and critical stage is validation: responsive browser testing across screen widths, accessibility checks, and performance optimization.',
      'AI is my accelerator, but the architecture, quality, and user experience are strictly my responsibility.'
    ]
  },
  {
    slug: 'bangla-typing-grapheme-unicode',
    titleEn: 'The Bengali Grapheme Problem in Typing Engines',
    titleBn: 'বাংলা টাইপিং-এর grapheme ও ইউনিকোড চ্যালেঞ্জ',
    date: '2026-09-20',
    readTimeEn: '6 min read',
    readTimeBn: '৬ মিনিট পড়ার সময়',
    category: 'Bengali Computing',
    categoryBn: 'বাংলা কম্পিউটিং',
    excerptEn: 'Bengali letters are not simple 1-character glyphs. Conjuncts (যুক্তবর্ণ), hasant (্), and vowel diacritics (কার) break typical string indexing.',
    excerptBn: 'বাংলা বর্ণমালা ইংরেজি অক্ষরের মতো একক ক্যারেক্টার নয়। যুক্তবর্ণ, হসন্ত ও কারচিহ্ন স্ট্রিং ইনডেক্সিং এবং টাইপিং ভ্যালিডেশনে বিশেষ চ্যালেঞ্জ তৈরি করে।',
    contentBn: [
      'বাংলা টাইপিং প্ল্যাটফর্ম তৈরি করতে গিয়ে যে বিষয়টি সবচেয়ে বেশি ভাবিয়েছে তা হলো—বাংলা ভাষায় "একটি বর্ণ" মানে কম্পিউটারের জন্য একাধিক ইউনিকোড কোডপয়েন্ট হতে পারে।',
      'যেমন "ক্ষ" তৈরি হয় ক + ্ + ষ দিয়ে। ব্যবহারকারী যখন একটি কি প্রেস করেন, তখন তিনি একটি গ্রাফিম ক্লাস্টার (grapheme cluster) আশা করেন, কিন্তু সাধারণ JavaScript `string.length` বা ক্যারেক্টার ইনডেক্স এটি সরাসরি বুঝতে পারে না।',
      'যদি ইনডেক্সিং ভুল হয়, টাইপিং টেস্টের ব্যাকস্পেস, ভুল নির্ণয় ও স্পিড ক্যালকুলেশন এলোমেলো হয়ে যায়।',
      'এ জন্য আমরা `Intl.Segmenter` এবং কাস্টম ইউনিকোড নরমালাইজেশন (NFC/NFD) ব্যবহার করে প্রতিটি অক্ষরের সঠিক সীমানা নির্ধারণ করেছি। ফলে ৬১টি পাঠ ও ১৩টি স্তরে নির্ভুল রিয়েল-টাইম টাইপিং অভিজ্ঞতা দেওয়া সম্ভব হয়েছে।'
    ],
    contentEn: [
      'While building the Bangla Typing platform, the most intricate technical hurdle was grapheme cluster segmentation in Unicode.',
      'Unlike Latin scripts, a single conceptual Bengali character like "ক্ষ" is composed of multiple code points (Ka + Virama + Ssa). Standard JavaScript string indexing treats these as multiple characters.',
      'If not handled properly, backspacing, cursor position, and error penalty calculations fail. Using modern `Intl.Segmenter` and Unicode normalization (NFC) ensured precise keystroke verification across all 13 curriculum levels.'
    ]
  },
  {
    slug: 'redesigning-personal-portfolio-learnings',
    titleEn: 'Redesigning My Portfolio: From Template Glow to Quiet Confidence',
    titleBn: 'ব্যক্তিগত পোর্টফোলিও নতুন করে নকশা করার অভিজ্ঞতা',
    date: '2026-09-30',
    readTimeEn: '4 min read',
    readTimeBn: '৪ মিনিট পড়ার সময়',
    category: 'Design & Process',
    categoryBn: 'ডিজাইন ও প্রক্রিয়া',
    excerptEn: 'Why I moved away from cyan gradients and glowing cards towards warm editorial typography, honest status badges, and evidence-first design.',
    excerptBn: 'কেন আমি অতিরিক্ত নিয়ন গ্লো আর সাধারণ কার্ডের ভিড় ছেড়ে একটি সম্পাদকীয়, মার্জিত ও আত্মবিশ্বাসী ডিজাইন সিস্টেমে ফিরে এলাম।',
    contentBn: [
      'সাধারণত টেক পোর্টফোলিওগুলোতে একই ধরনের নিয়ন সায়ান বা বেগুনি গ্রেডিয়েন্ট, কার্ডের পর কার্ড এবং অতিরঞ্জিত পরিসংখ্যান দেখতে পাওয়া যায়।',
      'কিন্তু যখন আমি বাস্তব কাজের দিকে তাকালাম—বাংলাগান, বাংলা টাইপিং, চালাও, নীলং—তখন বুঝলাম, সাইটটি কোনো এজেন্সির বিজ্ঞাপনের মতো লাগলে চলবে না। এটি হওয়া উচিত একটি "ডিজিটাল ওয়ার্কশপ"।',
      'ওয়ার্ম ব্যাকগ্রাউন্ড (#F7F5F0), বাংলা মাটির লাল অ্যাকসেন্ট (#A33A2B) এবং প্রযুক্তিগত গাঢ় নীল (#234A84) দিয়ে সাইটটিকে একটি ম্যাগাজিন ও ডেভেলপার নোটবুকের রূপ দেওয়া হয়েছে।',
      'সবচেয়ে বড় পরিবর্তন ছিল সততা: যা সম্পন্ন হয়েছে তা "Live", যা চলমান তা "Building", আর যা অনুসন্ধান তা "Experiment" হিসেবে তুলে ধরা।'
    ],
    contentEn: [
      'Modern tech portfolios often fall into repetitive tropes: dark slate backgrounds, neon cyan glows, and ungrounded vanity metrics.',
      'Looking at my real work—BanglaGan, Bangla Typing, POS, Nilang—I realized the site should reflect a personal engineering workshop rather than a generic agency brochure.',
      'Using a warm editorial paper palette (#F7F5F0), terracotta Bengali accent (#A33A2B), and deep technical blue (#234A84), the portfolio embraces quiet confidence and factual evidence.'
    ]
  },
  {
    slug: 'why-experimenting-with-nilang',
    titleEn: 'Why I Am Building Nilang: A Toy Language Experiment',
    titleBn: 'নীলং (Nilang) — কেন একটি নতুন প্রোগ্রামিং ভাষা নিয়ে পরীক্ষা করছি',
    date: '2026-09-15',
    readTimeEn: '5 min read',
    readTimeBn: '৫ মিনিট পড়ার সময়',
    category: 'Compilers',
    categoryBn: 'কম্পাইলার ও ভাষা',
    excerptEn: 'Building an interpreter teaches you more about software architecture, trees, and parsing than building ten regular web apps.',
    excerptBn: 'একটি প্রোগ্রামিং ল্যাঙ্গুয়েজের ইন্টারপ্রেটার বা পার্সার তৈরি করা যেকোনো সফটওয়্যার ডেভেলপারের চিন্তার পরিধি বহুগুণ বাড়িয়ে দেয়।',
    contentBn: [
      'নীলং (Nilang) কোনো ইন্ডাস্ট্রি-রেডি ভাষা বানানোর উচ্চাকাঙ্ক্ষা নয়; এটি কম্পিউটিংয়ের মৌলিক বিষয়গুলো শেখার একটি ব্যক্তিগত গবেষণা।',
      'কীভাবে টেক্সট টোকেনাইজ হয়, অ্যাবস্ট্রাক্ট সিনট্যাক্স ট্রি (AST) কীভাবে তৈরি হয় এবং একটি ইন্টারপ্রেটার কীভাবে কোড এক্সিকিউট করে—তা নিজের হাতে তৈরি করার অভিজ্ঞতা অসাধারণ।',
      'এই এক্সপেরিমেন্ট আমাকে ওয়েব অ্যাপের জটিল স্টেট ম্যানেজমেন্ট এবং পার্সিং সমস্যাগুলোতেও গভীরভাবে চিন্তা করতে শিখিয়েছে।'
    ],
    contentEn: [
      'Nilang is not an attempt to replace industry languages; it is a dedicated exploration into how programming languages actually function under the hood.',
      'Implementing lexical analysis, Abstract Syntax Trees (ASTs), and a recursive evaluator builds foundational intuition for compilers, data structures, and parser design.'
    ]
  }
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
