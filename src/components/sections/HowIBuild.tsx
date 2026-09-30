'use client';

import { motion } from 'framer-motion';

interface HowIBuildProps {
  language: 'bn' | 'en';
}

const steps = [
  {
    num: '01',
    titleEn: 'Define',
    titleBn: 'সংজ্ঞায়িত করা',
    descEn: 'Break the problem into writing. What exactly needs to be built and why.',
    descBn: 'সমস্যাটাকে লিখে ভাঙি। ঠিক কী বানাতে হবে এবং কেন।',
  },
  {
    num: '02',
    titleEn: 'Design',
    titleBn: 'ডিজাইন করা',
    descEn: 'Plan the UI, architecture, and data flow before writing a single line.',
    descBn: 'একটি লাইন লেখার আগে UI, আর্কিটেকচার ও ডেটা প্রবাহ পরিকল্পনা করি।',
  },
  {
    num: '03',
    titleEn: 'AI-assisted Implementation',
    titleBn: 'AI-সহায়ক বাস্তবায়ন',
    descEn: 'Use AI coding assistants to implement. I remain the decision-maker and reviewer.',
    descBn: 'AI কোডিং সহকারী ব্যবহার করে বাস্তবায়ন করি। আমি সিদ্ধান্ত গ্রহণকারী ও পর্যালোচক।',
  },
  {
    num: '04',
    titleEn: 'Test',
    titleBn: 'পরীক্ষা করা',
    descEn: 'Run it in the browser, on devices, across edge cases.',
    descBn: 'Browser-এ, device-এ, edge case-এ চালিয়ে পরীক্ষা করি।',
  },
  {
    num: '05',
    titleEn: 'Debug',
    titleBn: 'ডিবাগ করা',
    descEn: 'Find bugs, trace root causes, fix them. This is where real understanding happens.',
    descBn: 'ত্রুটি খুঁজে মূল কারণ বের করে সংশোধন করি। এখানেই আসল বোঝাপড়া হয়।',
  },
  {
    num: '06',
    titleEn: 'Refine',
    titleBn: 'পরিমার্জন করা',
    descEn: 'Improve performance, UX, accessibility, and structure. Ship only what\'s solid.',
    descBn: 'পারফরম্যান্স, UX, অ্যাক্সেসিবিলিটি ও কাঠামো উন্নত করি। শুধু শক্তিশালী জিনিসই প্রকাশ করি।',
  },
];

export default function HowIBuild({ language }: HowIBuildProps) {
  const isBn = language === 'bn';

  return (
    <section className="py-20 border-t border-[var(--border)] bg-[var(--surface-2)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="mb-12">
          <p className="section-label text-[var(--accent-bengali)] mb-2">02 / HOW I BUILD</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)]">
            {isBn ? 'কীভাবে বানাই' : 'How I Build'}
          </h2>
          <p className="prose-editorial mt-3 max-w-xl">
            {isBn
              ? 'AI আমার টুল; project-টা আমার দায়িত্ব।'
              : 'AI is my tool; the project is my responsibility.'}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)]">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.07 }}
              className="bg-[var(--surface-2)] p-6"
            >
              <span className="project-number block mb-3">{step.num}</span>
              <h3 className="text-sm font-semibold text-[var(--text)] mb-2">
                {isBn ? step.titleBn : step.titleEn}
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                {isBn ? step.descBn : step.descEn}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
