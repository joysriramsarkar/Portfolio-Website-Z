# উন্নয়ন রোডম্যাপ — joysriram.com

> এই ডকুমেন্টটা কোড ঘেঁটে **যাচাই করা** অবস্থার উপর লেখা (তারিখ: ২০২৬-১০-০২, `main` → `daed295`)।
> `পরিকল্পনা.md` যেখানে **ভিশন/ডিজাইন** বলে, এই ফাইলটা সেখানে **ইঞ্জিনিয়ারিং এক্সিকিউশন** বলে — কোনটা আগে, কেন আগে, আর ঠিক কী বদলাতে হবে।

**সিদ্ধান্ত (আপনার):** Prisma থাকবে এবং সত্যিই ব্যবহৃত হবে → §৩-এ সেই পুরো পরিকল্পনা আছে।

---

## ০. এখনকার অবস্থা — এক নজরে (মাপা, অনুমান নয়)

| বিষয় | ফলাফল |
|---|---|
| `npx tsc --noEmit` | ✅ পরিষ্কার, কোনো error নেই |
| `npx eslint .` | ✅ পরিষ্কার |
| `npm run build` | ❌ **ফেল করে** — `fonts.googleapis.com`-এ পৌঁছাতে না পারলে (`next/font/google` build-time network চায়) |
| `npm run dev` | ✅ চলে, ১০টা রুটই `200` দেয় (/, /projects, /lab, /now, /writing, /open-source, /about, /designs, /contributions, /projects/[slug]) |
| Next.js | 15.5.9, App Router, React 19, Tailwind v4 (`@theme inline`), TS strict |
| কোড | `src/` মিলিয়ে ৩৭৮৭ লাইন + ৬৩টা UI কম্পোনেন্ট |
| `public/` | **৮১ MB** (একা `designs/` = ৭১ MB) |
| ডেড কোড | ৪২/৪৮ টা `components/ui/*` কখনো import হয়নি; ৬টা সেকশন/পেজ কম্পোনেন্টও কখনো ব্যবহৃত নয় |
| টেস্ট | ০টা (কোনো ফ্রেমওয়ার্কই নেই) |
| CI | নেই (`.github/` ফোল্ডারই নেই) |
| পেজ-লেভেল SEO | নেই — শুধু `layout.tsx`-এ metadata; ৭টা পেজ `'use client'` তাই নিজের `metadata` দিতেই পারে না |
| Prisma | ইনস্টল করা, স্কিমা আছে, কিন্তু `src/lib/prisma.ts` **কোথাও import হয়নি** — অ্যাপের সব ডেটা `src/data/*.ts`-এ |

**যেটা সত্যিই ভালো:** `docs/design-system.md` (১১৪ লাইন, টোকেন-সহ) আগে থেকেই আছে, `/contributions`-এ Wikimedia API থেকে **লাইভ** ডেটা আসে এবং নেটওয়ার্ক ফেল করলে চুপচাপ ফলব্যাক ডেটায় নেমে আসে — এটা পরিণত সিদ্ধান্ত। ডিজাইন টোকেন (`--accent-bengali`, টাইপোগ্রাফি স্কেল) সুসংগত।

---

## ১. P0 — আজ-এখনই (মোটামুটি ২–৩ দিনের কাজ)

### ১.১ i18n আসলে নেই যতটা দাবি করা হয়েছে — এটাই সবচেয়ে বড় স্থাপত্য সমস্যা

৮টা আলাদা জায়গায় আলাদা `useState<'bn' | 'en'>`:

```
src/app/PortfolioClient.tsx        ← হোম
src/app/about/page.tsx
src/app/designs/page.tsx
src/app/lab/page.tsx
src/app/now/page.tsx
src/app/open-source/page.tsx
src/app/projects/page.tsx
src/app/writing/page.tsx
```

`src/components/layout/Navbar.tsx` প্রপ হিসেবে `language` + `onToggleLanguage` নেয় — অর্থাৎ প্রতিটা পেজকে নিজের ভাষা নিজে সামলাতে হয়।

এর ফল:
- হোম থেকে `/projects`-এ গেলে ভাষা **আবার বাংলায় ফিরে যায়** (state পেজের সাথে মরে)।
- ভাষা **URL-এ থাকে না** → লোকালাইজড লিংক শেয়ার করা যায় না, ব্রাউজার back/forward ভাঙে।
- সার্চ ইঞ্জিন বাংলা-ইংরেজি আলাদা পেজ দেখে না → বিয়িংগুয়াল SEO-র কোনো সুবিধাই পাওয়া যাচ্ছে না (অথচ `layout.tsx`-এ `locale: 'bn_BD'` দেওয়া আছে)।
- `src/data/translations.ts` **শূন্য বাইট** আর `src/app/translations.ts`-এর ২০৬ লাইন ডেড `DesignShowcase.tsx`-এ আটকে আছে। `next-intl` dependency-টাও ইনস্টল করা, কোথাও ব্যবহৃত নয়।

**ঠিক করার সুপারিশ (সবচেয়ে কম রিস্কে):**
```
src/app/[locale]/page.tsx
src/app/[locale]/projects/page.tsx      ← এভাবে বাকি পেজ
src/middleware.ts                        ← locale detect + / → /bn রিডাইরেক্ট
src/lib/i18n.ts                          ← একটাই dictionary helper
```
- `/bn/...` আর `/en/...` — `<html lang>` ও `alternates.languages` (hreflang) সঠিকভাবে দেওয়া যাবে।
- `next-intl` ইনস্টল করা আছে; ওটা দিয়েই করে ফেললে type-safe message ID পাওয়া যায়। অথবা হালকা পথ: `useLocale()` কনটেক্সট + cookie — কিন্তু সেটা URL-ভিত্তিক SEO সমস্যার সমাধান করে না, তাই `[locale]` সেগমেন্টই ঠিক সিদ্ধান্ত।
- পুরোনো বাংলা URL গুলো (`/projects/bangla-typing?lang=en`) ৩০১ করে `/bn|/en`-এ পাঠাতে হবে।

### ১.২ ডেড কোড সরান — README যা দাবি করে তা এখনো কোডে নেই

| দাবি (README) | বাস্তবতা |
|---|---|
| "Dark/Light Mode: seamless theme switching" | `.dark {}` টোকেন `globals.css:110`-এ আছে, কিন্তু `.dark` ক্লাস **কেউ কখনো লাগায় না** — কোনো ThemeProvider/toggle নেই |
| "Bilingual using a custom translation system" | উপরের ১.১ দ্রষ্টব্য |
| "TanStack Query / Zustand / Charts" | TanStack Query, Zustand — অ্যাপ কোডে ০টা ব্যবহার |
| "case studies … fetched dynamically from a database using Prisma" | **এখনো মিথ্যা** — §৩-এ কাজ শেষ হলে সত্যি হবে (তাই README-র এই লাইনটা মুছবেন না, বাস্তবায়ন করবেন) |

নিশ্চিতভাবে মুছে ফেলার লিস্ট:
```
src/components/sections/Stats.tsx          (0 import)   ← ভুয়া "২০+ প্রজেক্ট / ৬+ মাস" পরিসংখ্যান
src/components/sections/Services.tsx       (0 import)
src/components/sections/About.tsx          (0 import — AboutTeaser কেন্দ্রীয়, এটা লেগেসি; এটাই /profile.png ধরে আছে)
src/app/GithubProjects.tsx                 (0 import)
src/app/WikimediaContributions.tsx         (0 import — নিচে ১.৩ দেখুন)
src/app/DesignShowcase.tsx                 (0 import)
src/app/translations.ts                    (শুধু উপরের ডেড ফাইল ব্যবহার করে)
src/data/translations.ts                   (০ বাইট)
examples/websocket/, mini-services/, .idx/dev.nix, Caddyfile   (AI scaffold-এর অবশিষ্ট, অ্যাপে অপ্রাসঙ্গিক)
```
> ✅ আপনার সিদ্ধান্ত অনুযায়ী `prisma/`, `src/lib/prisma.ts`, `db/` **থাকছে** — §৩ দেখুন।
> ⚠️ তবে `db/custom.db` এরপরেও git-এ থাকা উচিত নয় (জেনারেটেড ফাইল; `.gitignore`-এ `*.db` আছে কিন্তু আগে থেকেই tracked): `git rm --cached db/custom.db`

### ১.৩ একই তথ্যের ৪টা কপি (Wikimedia)

```
src/app/contributions/page.tsx        ← লাইভ API (ঠিক পথ) ✅
src/app/open-source/page.tsx          ← হার্ডকোড করা সংখ্যা (2150/890/540/230/120) ❌
src/components/sections/OpenSourceStrip.tsx
src/app/WikimediaContributions.tsx    ← ডেড
```
হোমপেজের সংখ্যা আর `/contributions`-এর লাইভ সংখ্যা একদিনেই আলাদা হয়ে যাবে। **একটাই `getWikimediaStats()` ফাংশন** বানান (বর্তমান `revalidate: 3600` + try/catch ফলব্যাক প্যাটার্নটা ঠিক আছে), বাকি সব সেখান থেকেই খাওয়াক। একই নিয়ম "13 levels, 61 lessons"-এর ক্ষেত্রেও — যেসব সংখ্যা হাতে লেখা, সেগুলো হয় DB/ডেটা ফাইল থেকে আসুক, নাহয় ঐতিহাসিক তারিখ দিয়ে লেখা থাকুক।

### ১.৪ `public/` ৮১ MB — পারফরম্যান্সে সরাসরি ধাক্কা

```
public/designs/decision-tree-futuristic.png   9.1 MB
public/designs/data-science-hero.png          8.4 MB
public/designs/ai-cold-war-edited.png         8.3 MB
public/designs/ai-singer.png                  8.2 MB
public/designs/netflix-recommendation.png     8.1 MB
public/profile.png                            7.8 MB   ← বনাম profile.webp = 40 KB (১৯৫× ছোট!)
```
`sharp` ইনস্টল করা আছে, তাই রেডি স্ক্রিপ্ট `scripts/optimize-images.mjs` দিয়ে এক ধাপে নামানো যায়:

```bash
node scripts/optimize-images.mjs --dry-run   # কিছুই লিখবে না, শুধু হিসাব
node scripts/optimize-images.mjs             # পাশে .webp বানাবে (মূল ফাইল অটুট)
```

**এই রিপোতেই চালানো dry-run-এর আসল ফল:** ২১টি ফাইল, **80.09 MB → 2.14 MB (−97%, সাশ্রয় ৭৮ MB)**, `max-width=1600, quality=78`-এ। একা `profile.png`: 7.42 MB (2400px) → 111 KB।

> `next/image` ব্যবহৃত জায়গায় ফাইল সাইজ কমলেই যথেষ্ট; সরাসরি `<img src="/designs/x.png">` থাকলে path `.webp`-এ বদলাতে হবে।
> বড় ডিজাইন গ্যালারির জন্য Git LFS বিবেচনা করুন — নাহলে কমপ্রেস করা ফাইল commit করুন (পুরোনো ভারী ব্লব ইতিহাসে রয়ে যাবে, দরকার হলে `git filter-repo` দিয়ে ছাড়বেন)।

### ১.৫ Contact ফর্মে হার্ডকোড করা EmailJS কী

`src/components/sections/Contact.tsx:68-72` — service ID, template ID, public key সোর্স কোডে বসানো। Public key গোপনীয় কিছু নয়, কিন্তু সোর্সে হার্ডকোড থাকলে **স্প্যাম বটের target** হয় এবং কী পরিবর্তনে কোড বদলাতে হয়।

```tsx
await emailjs.send(
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
  { from_name: name, email, message },
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
);
```
সাথে: `.env.example` commit করুন, EmailJS ড্যাশবোর্ডে **Allowed Origins** সেট করুন, honeypot ফিল্ড বা Cloudflare Turnstile যোগ করুন, আর পুরোনো কী একবার rotate করে নিন (এটা এখন পাবলিক রিপোতে আছে)।

### ১.৬ বিল্ড এখন নেটওয়ার্কের দাস

এই স্যান্ডবক্সে `npm run build` চালিয়ে ঠিক এই এররটা পাওয়া গেছে:
```
Failed to fetch `Hind Siliguri` from Google Fonts.  →  Failed to compile.
```
Vercel-এ অসুবিধা হয় না, কিন্তু যেকোনো অফলাইন/সীমাবদ্ধ CI, Docker build, বা দুর্বল কানেকশনে বিল্ড ভাঙবে। **সমাধান:** ফন্টগুলো `public/fonts/` (বা `src/app/fonts/`)-এ self-host করে `next/font/local` ব্যবহার করুন — সম্পূর্ণ অফলাইন-সেফ, বোনাস: Bengali subset-এর সাইজ নিজের হাতে।

### ১.৭ ডিপেন্ডেন্সি ছাঁটাই

সরাসরি অব্যবহৃত: `next-auth`, `@dnd-kit/*` (৩টা), `@mdxeditor/editor`, `z-ai-web-dev-sdk`, `nodemon`, `@tanstack/react-query`, `@tanstack/react-table`, `zustand`, `axios`, `uuid`, `date-fns`, `react-syntax-highlighter`, `@reactuses/core`।
পরোক্ষভাবে ডেড: `recharts`, `socket.io(-client)`, `vaul`, `cmdk`, `input-otp`, `react-day-picker`, `react-resizable-panels`, `embla-carousel-react` — এগুলো শুধু ওই ৪২টা অব্যবহৃত `components/ui/*` ফাইলের ভেতরে আছে।
`next-intl` রাখুন (১.১-তে ব্যবহার হবে), `@prisma/client`+`prisma` রাখুন (§৩), `@emailjs/browser` রাখুন (১.৫)।

---

## ২. P1 — স্থাপত্য ও মান (১–২ সপ্তাহ)

1. **শেয়ারড লেআউট।** ৯টা পেজ হাতে হাতে `SiteHeader`+`SiteFooter` বসায়। `src/app/[locale]/layout.tsx`-এ একবার বসান → হেডার/ফুটার/লোকেল/থিম সব এক জায়গায়।
2. **প্রতি পেজে metadata + JSON-LD।** `[locale]` কাজ শেষ হলে প্রতিটা পেজে `generateMetadata` (title, description, OG, `alternates.languages`) আর `Person`/`SoftwareSourceCode` schema.org JSON-LD। এখন সব পেজের `<title>` একটাই।
3. **ডাইনামিক OG ইমেজ।** `next/og` দিয়ে `/projects/[slug]/opengraph-image.tsx` — প্রজেক্টের নাম+স্ট্যাটাস বসানো কার্ড। শেয়ারে CTR অনেক বাড়ে।
4. **CI (১০ মিনিটের কাজ, আজই):** `.github/workflows/ci.yml` → `npm ci && npx tsc --noEmit && npm run lint && npm run build`। সাথে PR-এ Lighthouse CI বাজেট (`LCP < 2.5s`, image bytes < 500 KB/পেজ) — ৮১ MB ইমেজ সমস্যা আর ফিরে আসবে না।
5. **টেস্ট (ছোট কিন্তু মূল্যবান):** Playwright smoke — ১০টা রুট `200`, ভাষা টগল করে `/en`-এ যায়, ফর্ম ভ্যালিডেশন, dark mode টগল। + `@axe-core/playwright` দিয়ে অটো a11y চেক (alt, contrast, focus ring)। এত নিয়মে গড়া ডিজাইন সিস্টেম অটোমেটেড গার্ড ছাড়া টিকবে না।
6. **থিম সত্যিই বানান বা দাবি সরান।** `.dark` টোকেন আছে, Tailwind-এ `darkMode: "class"` আছে — শুধু `next-themes` + `<ThemeToggle />` বাকি (৩০ মিনিটের কাজ)।
7. **অ্যানালিটিক্স + Web Vitals:** Vercel Analytics বা Umami (self-host) — কোনো প্রকল্পে মানুষ আসলে ক্লিক করে, সেটা না জানলে "curated work" সিদ্ধান্ত অন্ধভাবে নেওয়া।
8. **প্রকৃত প্রমাণ:** প্রতিটা প্রজেক্টে আসল স্ক্রিনশট (`পরিকল্পনা.md` §৩৪), star/live লিংক — AI-জেনারেটেড ভিজ্যুয়াল নয়।

---

## ৩. Prisma-কে সত্যিকারের ডেটা লেয়ার বানানো

লক্ষ্য: README-র "case studies fetched dynamically from a database using Prisma" দাবিটা **সত্যি** করা — এবং কনটেন্ট লেখা/আপডেট করা সহজ করা, যাতে নতুন প্রজেক্ট যোগ করতে কম্পোনেন্ট ছুঁতে না হয়।

### ৩.১ সবার আগে সিদ্ধান্ত: প্রোডাকশনে ডেটাবেস কোথায় থাকবে

**Vercel (serverless)-এ SQLite ফাইলে লেখা যায় না** — ফাইলসিস্টেম read-only, instance-গুলো একে অপরের সাথে ফাইল শেয়ারও করে না। তাই তিনটা পথ, আর এটাই §৩-এর একমাত্র বড় সিদ্ধান্ত:

| পথ | কীভাবে | কখন ঠিক |
|---|---|---|
| **A. SQLite = অথরিং DB + build-time read** | লোকালে `dev.db`-তে লেখেন (Prisma Studio/স্ক্রিপ্ট), বিল্ডের সময় `generateStaticParams` + Server Component DB পড়ে স্ট্যাটিক/ISR পেজ বানায়; ডেটা না বদলালে ডিপ্লয়ও লাগে না | **সুপারিশ** — খরচ ০, কোনো DB সার্ভার নেই, পোর্টফোলিওর কনটেন্ট মাসে কয়েকবারই বদলায় |
| **B. Turso (libSQL)** | SQLite-সামঞ্জস্যপূর্ণ হোস্টেড DB, Prisma driver adapter দিয়ে এজ থেকে পড়া | live query/ISR চাইলে, অথচ SQLite-ই রাখতে চাইলে |
| **C. Postgres (Neon/Supabase)** | `provider = "postgresql"`; Bangla Typing-এ আগেই Supabase ব্যবহার করছেন | ভবিষ্যতে ব্রাউজার থেকেই অ্যাডমিন UI দিয়ে কনটেন্ট এডিট করলে |

A দিয়ে শুরু করা মানে আটকে যাওয়া নয় — কারণ §৩.৩-এর নিয়মে **পুরো DB অ্যাক্সেস একটাই ফোল্ডারে (`src/lib/db/`) সীমাবদ্ধ থাকবে**, পরে B/C-তে যেতে হলে শুধু ওই ফাইল + `DATABASE_URL` বদলাবে।

### ৩.২ স্কিমা — এখনকার তিনটা ডিজাইন সমস্যা ঠিক করা

আজকের `Project` মডেলে (a) বাংলা+ইংরেজি কলাম পাশাপাশি (`titleBn`, `titleEn` …), (b) `tech`/`metrics` স্ট্রিং-এ JSON, (c) `User`/`Post` অব্যবহৃত। ভালো খবর: **Prisma 6.2 থেকে SQLite-এও `enum` আর `Json` চলে** (আপনার প্রজেক্টে `prisma ^6.11.1` আছে), তাই আপস করতে হবে না।

প্রস্তাবিত স্কিমা (খসড়া — আপনার প্রকৃত কনটেন্ট দেখে চূড়ান্ত হবে):

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"          // A পথ → পরে turso/postgres এ বদলানো সহজ
  url      = env("DATABASE_URL")
}

enum ProjectStatus { LIVE BUILDING EXPERIMENT PAUSED ARCHIVED IDEA }
enum ProjectCategory { BENGALI_TECH SOFTWARE DEVELOPER_TOOLS OS_ECOSYSTEM COMMUNITY EXPERIMENT WEB }

model Project {
  id         String          @id @default(cuid())
  slug       String          @unique
  status     ProjectStatus   @default(BUILDING)
  category   ProjectCategory
  featured   Boolean         @default(false)
  year       Int
  githubUrl  String?
  liveUrl    String?
  coverImage String?
  platforms  String          // "Web, Android" — অথবা Platform মডেল
  createdAt  DateTime        @default(now())
  updatedAt  DateTime        @updatedAt

  translations ProjectTranslation[]
  tech         ProjectTech[]
  screenshots  Screenshot[]
  buildLogs    BuildLog[]

  @@index([featured, status])
}

// ভাষা আলাদা টেবিলে → তৃতীয় ভাষা যোগ করলে স্কিমা বদলাতে হয় না
model ProjectTranslation {
  id          String  @id @default(cuid())
  projectId   String
  locale      String  // "bn" | "en"
  name        String
  tagline     String
  description String
  problem     String?
  solution    String?
  lessons     String?
  project     Project @relation(fields: [projectId], references: [id], onDelete: Cascade)

  @@unique([projectId, locale])
}

model ProjectTech {
  id        String  @id @default(cuid())
  projectId String
  name      String  // "Next.js", "Rust" …
  project   Project @relation(fields: [projectId], references: [id], onDelete: Cascade)

  @@unique([projectId, name])
}

model Screenshot {
  id        String  @id @default(cuid())
  projectId String
  path      String  // /projects/banglatyping-1.webp
  captionBn String?
  captionEn String?
  width     Int?
  height    Int?
  project   Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
}

model BuildLog {                      // হোমপেজের BuildLogStrip এর জন্য — হাতে লেখা অ্যারে নয়
  id         String   @id @default(cuid())
  date       DateTime
  titleBn    String
  titleEn    String
  bodyBn     String?
  bodyEn     String?
  projectId  String?
  project    Project? @relation(fields: [projectId], references: [id], onDelete: SetNull)
}

model WikimediaStat {                 // ১.৩-এর এক-সোর্স সমস্যার সমাধান (অথবা API cache টেবিল)
  id       String   @id @default(cuid())
  wiki     String   @unique
  nameBn   String
  nameEn   String
  edits    Int
  roleBn   String
  roleEn   String
  syncedAt DateTime @default(now())
}
```

`/writing`-এর জন্য আলাদা `Post` মডেল (locale-ভিত্তিক translation সহ) পরে §৩.৪-এর pipeline-এ যোগ করুন — MDX না DB, সেটা §৪-এ আলোচনা।

### ৩.৩ ডেটা অ্যাক্সেস লেয়ার — UI ফাইল প্রায় বদলাবে না

নিয়ম: **DB কল কখনো সরাসরি কম্পোনেন্টে নয়**, সব `src/lib/db/*`-এ। প্রতিটা ফাংশন DB সারি → UI-টাইপ-এ রূপান্তর করে এবং Zod দিয়ে ভ্যালিডেট করে। আজকের `src/data/projects.ts`-এর `Project` ইন্টারফেসটা ধরে রাখলে একটাও কম্পোনেন্ট বদলাতে হবে না।

```ts
// src/lib/db/projects.ts (খসড়া)
import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { projectSchema, type Project } from '@/lib/schemas/project'; // Zod

export const getProjectBySlug = cache(async (slug: string, locale: 'bn' | 'en'): Promise<Project | null> => { /* … */ });

export const getFeaturedProjects = unstable_cache(
  async (locale: 'bn' | 'en') => { /* … */ },
  ['featured-projects'],
  { revalidate: 3600, tags: ['projects'] }
);

export async function getAllSlugs() { return (await prisma.project.findMany({ select: { slug: true } })).map(p => p.slug); }
```

তারপর:
```tsx
// src/app/[locale]/projects/[slug]/page.tsx  (Server Component)
export async function generateStaticParams() {
  return (await getAllSlugs()).map((slug) => ({ slug }));   // বিল্ড টাইমেই DB পড়ে স্ট্যাটিক পেজ
}
```

`src/lib/prisma.ts`-এ যে singleton প্যাটার্ন আছে (`globalThis.prismaGlobal`) সেটা serverless-এ ঠিকই আছে — শুধু কেউ ব্যবহার করছিল না, এখানেই কাজে লাগবে।

### ৩.৪ মাইগ্রেশন পথ (ডেটা হারানো ছাড়া, এক PR-এ নয়)

1. **seed-এর একটাই সোর্স বানান।** এখন `prisma/seed.ts`-এ প্রজেক্ট বাংলা/ইংরেজি টেক্সট হাতে ডুপ্লিকেট করা আছে, আর `src/data/projects.ts`-এ আলাদা করে পুরো ডেটা আছে — দুটো ডাইভার্জ করবেই। বরং `seed.ts` **`src/data/projects.ts` থেকে পড়ে** DB ভরুক (একবারের import)। ডুপ্লিকেট টেক্সট মুছে দিন।
2. **স্কিমা + প্রথম মাইগ্রেশন:** `prisma migrate dev --name init`, `.env`-এ `DATABASE_URL="file:./dev.db"`, সাথে `.env.example` commit।
3. **অ্যাক্সেস লেয়ার লিখুন** (৩.৩) — আউটপুট টাইপ আজকের মতোই, তাই UI অপরিবর্তিত।
4. **পেজ ধরে ধরে সরান:** হোম → `/projects` → `/projects/[slug]` → `/now`; প্রতিটা ছোট PR, প্রতিটার পর ডেটা দুজায়গায় মিলিয়ে দেখুন। `src/data/projects.ts` তখন seed source হিসেবেই থাকে (UI আর পড়ে না)।
5. **`db/custom.db` git থেকে বাদ**, `prisma/migrations/` + `prisma/seed.ts` git-এ থাকবে।

### ৩.৫ যে ফাঁদগুলো এড়াতে হবে (চেকলিস্ট)

- [ ] বিল্ডের সময় DB লাগে → বিল্ড স্ক্রিপ্টে `prisma generate` (এবং A পথ হলে migrate+seed) যোগ করুন, নাহলে Vercel বিল্ড ফেল করবে ✅ (এটা এখনো করে নেই)
- [ ] `postinstall: "prisma generate"` — ফ্রেশ ক্লোন/CI-তে `@prisma/client` জেনারেট হওয়ার নিশ্চয়তা
- [ ] সব DB পড়া Server Component-এ; ক্লায়েন্ট কম্পোনেন্টে `fetch('/api/...')` করে অপ্রয়োজনীয় জলঘোলা করবেন না
- [ ] `generateStaticParams` + `unstable_cache`/`revalidate` → স্ট্যাটিক/ISR পেজ, প্রতি রিকোয়েস্টে DB হিট নয়
- [ ] সব ডেটা ফাংশনে Zod ভ্যালিডেশন — DB-তে ভুল ডেটা ঢুকলে UI ক্র্যাশ করবে না
- [ ] লেখার পথ (write) কখনো ব্রাউজার থেকে সোজা নয় — অ্যাডমিন স্ক্রিপ্ট বা auth-protected route (§৩.১-C দিলে এখানেই পরে অ্যাডমিন UI)
- [ ] Translation না পাওয়া গেলে locale fallback (bn → en) একটা helper-এ, প্রতিটা কম্পোনেন্টে নয়

---

## ৪. P2 — কনটেন্ট/প্রোডাক্ট (পরিকল্পনা.md-এর সাথে মিলিয়ে)

`পরিকল্পনা.md`-এর ৫টা ধাপের সাথে ম্যাপিং:

| পরিকল্পনা.md phase | এখানকার ধাপ |
|---|---|
| Phase 1 — Content audit | §১.২ (ডেড কোড/ভুয়া সংখ্যা সরানো) + প্রতিটা প্রজেক্টে **আসল** স্ক্রিনশট |
| Phase 2 — Visual system | ইতিমধ্যে হয়েছে — `docs/design-system.md` হালনাগাদ রাখুন; dark mode হয় বানান নাহয় README থেকে সরান |
| Phase 3 — New shell | §১.১ (`[locale]` + শেয়ারড লেআউট) |
| Phase 4 — Homepage | আজকের হোমপেজ মোটামুটি আছে — "Selected Work"-এ আসল ইমেজ + প্রমাণ (§২.৮), `BuildLogStrip` DB থেকে (§৩.২) |
| Phase 5 — Project ecosystem | `/projects/[slug]`-এ architecture ডায়াগ্রাম + challenges/solution — DB স্কিমাতে জায়গা আগেই তৈরি |
| Phase 6 — Live data | Wikimedia stats এক সোর্সে (§১.৩) + `WikimediaStat` টেবিল/cache (§৩.২) + GitHub repo data `revalidate` দিয়ে |

**`/writing` কী হবে — দুটো পথ, একটা বেছে নিন:**
- **MDX + `content/` ফোল্ডার** (সুপারিশ): লেখা Git-এ versioned, `generateStaticParams` দিয়ে `/writing/[slug]`, diff/review সহজ, RSS সহজ। DB লাগে না।
- **`Post` মডেল DB-তে:** পরে ব্রাউজার থেকে এডিট করতে চাইলে (`@mdxeditor/editor` তো আগেই ইনস্টল করা আছে!) — তখন §৩.১-C পথে যাওয়াই যুক্তিযুক্ত।
আপাতত `src/app/blog/page.tsx` (৫ লাইনের খালি পাতা) দুটোর কোনোটাই নয় — হয় `/writing`-এ রিডাইরেক্ট করুন, নাহয় সত্যিকারের পেজ বানান।

বোনাস আইডিয়া: `/uses` (যন্ত্রপাতি), `/now` auto-update, প্রজেক্ট পেজে "related projects" (Nilang/Alap/Onuron family — `পরিকল্পনা.md` §১১), RSS নিউজলেটার।

---

## ৫. প্রস্তাবিত সময়সূচি

| স্প্রিন্ট | কাজ | শেষে যা পাওয়া যাবে |
|---|---|---|
| **S1 (২–৩ দিন)** | ছবি কমপ্রেস (§১.৪), ডেড কোড সরানো (§১.২), EmailJS env (§১.৫), ফন্ট self-host (§১.৬), `.env.example`, CI ওয়ার্কফ্লো (§২.৪) | বিল্ড নির্ভরযোগ্য, রিপো হালকা, ডিপ্লয় দ্রুত |
| **S2 (৪–৫ দিন)** | `[locale]` রাউটিং + শেয়ারড লেআউট + প্রতি পেজে metadata/hreflang + থিম টগল | বাংলা/ইংরেজি আসলেই দুই ভাষার সাইট, SEO-যোগ্য |
| **S3 (১ সপ্তাহ)** | §৩.১-৩.৪ — Prisma স্কিমা, seed consolidation, `src/lib/db/*` লেয়ার, হোম + `/projects` + `/[slug]` DB থেকে | README-র DB দাবি সত্যি; কনটেন্ট এডিট করা সহজ |
| **S4 (১ সপ্তাহ)** | Writing pipeline (MDX), ডাইনামিক OG, Wikimedia এক-সোর্স, Playwright + axe টেস্ট, Lighthouse বাজেট | "Digital Workshop" ভিশন বাস্তবে |

---

## ৬. কাজের নিয়ম (এটা থাকলে বাকিটা সহজ হয়)

```bash
npm run dev                        # লোকাল
git checkout -b feat/<topic>       # ছোট, এক-কাজ-এক-ব্রাঞ্চ
npx tsc --noEmit && npm run lint   # commit-এর আগে
git push -u origin feat/<topic>    # PR → Vercel preview URL দেখে মর্জি
```
- প্রতি PR-এ screenshot/ভিডিও দিন (বাংলা টাইপোগ্রাফির ভাঙা লাইন চোখেই ধরা পড়ে, টেস্টে নয়)।
- `docs/design-system.md` + `পরিকল্পনা.md` + এই ফাইল — AI-কে context দেওয়ার কাজে ব্যবহার করুন (`পরিকল্পনা.md` §৫৮ ঠিক এই কারণেই লেখা)।
- **এক PR-এ এক কাজ।** এখনকার সবচেয়ে বড় রিস্ক কোডের গুণমান নয় — বড় রিস্ক হলো locale migration + DB migration + ডিজাইন একসাথে করলে ডিবাগিং অসম্ভব হয়ে যাওয়া।

---

## ৭. সবচেয়ে ছোট পরের ধাপ

1. §১.৪ (ছবি) আর §১.৫ (EmailJS কী) — ৩০ মিনিটের কাজ, প্রভাব তাৎক্ষণিক।
2. §১.২ ডেড কোড সরানো + `git rm --cached db/custom.db` — রিপো হালকা, README আর কোড কাছাকাছি।
3. §৩.১-এর সিদ্ধান্তটা নিন (A / B / C) — তারপর §৩.২ স্কিমা চূড়ান্ত করে Prisma কাজ শুরু।
4. তারপর §১.১ `[locale]` migration — "উন্নয়ন" শব্দটার মূল কাজ।
