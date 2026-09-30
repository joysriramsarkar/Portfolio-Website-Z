import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // upsert ব্যবহার করা হয়েছে যাতে বারবার seed করলে duplicate error না হয়।
  // metrics field থেকে fake/demo data সরানো হয়েছে।

  await prisma.project.upsert({
    where: { id: 'project1' },
    update: {
      titleBn: 'বাংলা গান ডেটাবেস',
      titleEn: 'Bangla Gan Database',
      descBn: 'বাংলা গানের একটি বিশাল ভান্ডার, যা অ্যান্ড্রয়েড এবং ওয়েব প্ল্যাটফর্মের জন্য তৈরি।',
      descEn: 'A comprehensive database for Bengali songs involving Android & Web technologies.',
      challengesBn: 'বিশাল পরিমাণ ডেটা ম্যানেজ করা এবং সার্চ পারফরম্যান্স অপ্টিমাইজ করা ছিল মূল চ্যালেঞ্জ।',
      challengesEn: 'Managing a huge amount of data and optimizing search performance was the main challenge.',
      solutionsBn: 'পর্যাপ্ত ইন্ডেক্সিং এবং ক্যাশিং ব্যবহার করে সার্চ পারফরম্যান্স উন্নত করা হয়েছে।',
      solutionsEn: 'Search performance was improved using proper indexing and caching.',
      tech: 'Node.js, TypeScript, SQLite',
      link: 'https://banglagan.vercel.app',
      metrics: null, // বাস্তব analytics না থাকলে metrics রাখা হচ্ছে না
    },
    create: {
      id: 'project1',
      titleBn: 'বাংলা গান ডেটাবেস',
      titleEn: 'Bangla Gan Database',
      descBn: 'বাংলা গানের একটি বিশাল ভান্ডার, যা অ্যান্ড্রয়েড এবং ওয়েব প্ল্যাটফর্মের জন্য তৈরি।',
      descEn: 'A comprehensive database for Bengali songs involving Android & Web technologies.',
      challengesBn: 'বিশাল পরিমাণ ডেটা ম্যানেজ করা এবং সার্চ পারফরম্যান্স অপ্টিমাইজ করা ছিল মূল চ্যালেঞ্জ।',
      challengesEn: 'Managing a huge amount of data and optimizing search performance was the main challenge.',
      solutionsBn: 'পর্যাপ্ত ইন্ডেক্সিং এবং ক্যাশিং ব্যবহার করে সার্চ পারফরম্যান্স উন্নত করা হয়েছে।',
      solutionsEn: 'Search performance was improved using proper indexing and caching.',
      tech: 'Node.js, TypeScript, SQLite',
      link: 'https://banglagan.vercel.app',
      metrics: null,
    },
  });

  await prisma.project.upsert({
    where: { id: 'project2' },
    update: {
      titleBn: 'বাংলা টাইপিং টুল',
      titleEn: 'Bangla Typing Tool',
      descBn: 'একটি সহজ এবং দ্রুত বাংলা টাইপিং টুল যা নির্ভুলভাবে টাইপ করতে সাহায্য করে।',
      descEn: 'A simple and fast tool for typing in Bengali with accuracy.',
      challengesBn: 'সঠিক উচ্চারণ অনুযায়ী টাইপিং অ্যালগরিদম তৈরি করা।',
      challengesEn: 'Creating a typing algorithm based on correct pronunciation.',
      solutionsBn: 'অত্যাধুনিক ফোনেটিক অ্যালগরিদম ব্যবহার করে সঠিক টাইপিং নিশ্চিত করা হয়েছে।',
      solutionsEn: 'Accurate typing was ensured by using an advanced phonetic algorithm.',
      tech: 'Node.js, TypeScript',
      link: 'https://typingbangla.vercel.app/',
      metrics: null,
    },
    create: {
      id: 'project2',
      titleBn: 'বাংলা টাইপিং টুল',
      titleEn: 'Bangla Typing Tool',
      descBn: 'একটি সহজ এবং দ্রুত বাংলা টাইপিং টুল যা নির্ভুলভাবে টাইপ করতে সাহায্য করে।',
      descEn: 'A simple and fast tool for typing in Bengali with accuracy.',
      challengesBn: 'সঠিক উচ্চারণ অনুযায়ী টাইপিং অ্যালগরিদম তৈরি করা।',
      challengesEn: 'Creating a typing algorithm based on correct pronunciation.',
      solutionsBn: 'অত্যাধুনিক ফোনেটিক অ্যালগরিদম ব্যবহার করে সঠিক টাইপিং নিশ্চিত করা হয়েছে।',
      solutionsEn: 'Accurate typing was ensured by using an advanced phonetic algorithm.',
      tech: 'Node.js, TypeScript',
      link: 'https://typingbangla.vercel.app/',
      metrics: null,
    },
  });

  await prisma.project.upsert({
    where: { id: 'project3' },
    update: {
      titleBn: 'স্নেক গেম',
      titleEn: 'Snake Game',
      descBn: 'টাইপস্ক্রিপ্ট ব্যবহার করে তৈরি করা ক্লাসিক স্নেক গেমের একটি আধুনিক সংস্করণ।',
      descEn: 'A modern implementation of the classic Snake game, built with TypeScript.',
      challengesBn: 'গেমের স্টেট ম্যানেজমেন্ট এবং ল্যাগ-ফ্রি রেন্ডারিং।',
      challengesEn: 'Game state management and lag-free rendering.',
      solutionsBn: 'অপ্টিমাইজড রেন্ডারিং লুপ এবং রিঅ্যাক্টিভ স্টেট ম্যানেজমেন্ট।',
      solutionsEn: 'Optimized rendering loops and reactive state management.',
      tech: 'TypeScript, Canvas API',
      link: 'https://snakegamez.vercel.app',
      metrics: null,
    },
    create: {
      id: 'project3',
      titleBn: 'স্নেক গেম',
      titleEn: 'Snake Game',
      descBn: 'টাইপস্ক্রিপ্ট ব্যবহার করে তৈরি করা ক্লাসিক স্নেক গেমের একটি আধুনিক সংস্করণ।',
      descEn: 'A modern implementation of the classic Snake game, built with TypeScript.',
      challengesBn: 'গেমের স্টেট ম্যানেজমেন্ট এবং ল্যাগ-ফ্রি রেন্ডারিং।',
      challengesEn: 'Game state management and lag-free rendering.',
      solutionsBn: 'অপ্টিমাইজড রেন্ডারিং লুপ এবং রিঅ্যাক্টিভ স্টেট ম্যানেজমেন্ট।',
      solutionsEn: 'Optimized rendering loops and reactive state management.',
      tech: 'TypeScript, Canvas API',
      link: 'https://snakegamez.vercel.app',
      metrics: null,
    },
  });

  console.log('✅ Database seeded successfully (idempotent upsert).');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
