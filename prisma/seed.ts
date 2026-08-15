import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.project.createMany({
    data: [
      {
        id: "project1",
        titleBn: "বাংলা গান ডেটাবেস",
        titleEn: "Bangla Gan Database",
        descBn: "বাংলা গানের একটি বিশাল ভান্ডার, যা অ্যান্ড্রয়েড এবং ওয়েব প্ল্যাটফর্মের জন্য তৈরি।",
        descEn: "A comprehensive database for Bengali songs involving Android & Web technologies.",
        challengesBn: "বিশাল পরিমাণ ডেটা ম্যানেজ করা এবং সার্চ পারফরম্যান্স অপ্টিমাইজ করা ছিল মূল চ্যালেঞ্জ।",
        challengesEn: "Managing a huge amount of data and optimizing search performance was the main challenge.",
        solutionsBn: "পর্যাপ্ত ইন্ডেক্সিং এবং ক্যাশিং ব্যবহার করে আমরা সার্চ পারফরম্যান্স উন্নত করেছি।",
        solutionsEn: "We improved search performance using proper indexing and caching.",
        tech: "Node.js, TypeScript",
        link: "https://banglagan.vercel.app",
        metrics: JSON.stringify([
          { name: "Jan", users: 1200 },
          { name: "Feb", users: 2100 },
          { name: "Mar", users: 3400 },
          { name: "Apr", users: 5000 },
        ]),
      },
      {
        id: "project2",
        titleBn: "বাংলা টাইপিং টুল",
        titleEn: "Bangla Typing Tool",
        descBn: "একটি সহজ এবং দ্রুত বাংলা টাইপিং টুল যা নির্ভুলভাবে টাইপ করতে সাহায্য করে।",
        descEn: "A simple and fast tool for typing in Bengali with accuracy.",
        challengesBn: "সঠিক উচ্চারণ অনুযায়ী টাইপিং অ্যালগরিদম তৈরি করা।",
        challengesEn: "Creating a typing algorithm based on correct pronunciation.",
        solutionsBn: "অত্যাধুনিক ফোনেটিক অ্যালগরিদম ব্যবহার করে সঠিক টাইপিং নিশ্চিত করা।",
        solutionsEn: "Ensuring accurate typing by using an advanced phonetic algorithm.",
        tech: "Node.js, TypeScript",
        link: "https://typingbangla.vercel.app/",
        metrics: JSON.stringify([
          { name: "Jan", users: 500 },
          { name: "Feb", users: 800 },
          { name: "Mar", users: 1500 },
          { name: "Apr", users: 2200 },
        ]),
      },
      {
        id: "project3",
        titleBn: "স্নেক গেম",
        titleEn: "Snake Game",
        descBn: "টাইপস্ক্রিপ্ট ব্যবহার করে তৈরি করা ক্লাসিক স্নেক গেমের একটি আধুনিক সংস্করণ।",
        descEn: "A modern implementation of the classic Snake game, built with TypeScript.",
        challengesBn: "গেমের স্টেট ম্যানেজমেন্ট এবং ল্যাগ-ফ্রি রেন্ডারিং।",
        challengesEn: "Game state management and lag-free rendering.",
        solutionsBn: "অপ্টিমাইজড রেন্ডারিং লুপ এবং রিঅ্যাক্টিভ স্টেট ম্যানেজমেন্ট।",
        solutionsEn: "Optimized rendering loops and reactive state management.",
        tech: "Node.js, TypeScript",
        link: "https://snakegamez.vercel.app",
        metrics: JSON.stringify([
          { name: "Jan", users: 300 },
          { name: "Feb", users: 450 },
          { name: "Mar", users: 600 },
          { name: "Apr", users: 900 },
        ]),
      }
    ],
  });
  console.log("Database seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
