# উন্নয়ন রোডম্যাপ — joysriram.com

> এই ডকুমেন্টটা কোড ঘেঁটে **যাচাই করা** অবস্থার উপর লেখা (তারিখ: ২০২৬-১০-০২, `main` → `daed295`)।
> `পরিকল্পনা.md` যেখানে **ভিশন/ডিজাইন** বলে, এই ফাইলটা সেখানে **ইঞ্জিনিয়ারিং এক্সিকিউশন** বলে — কোনটা আগে, কেন আগে, আর ঠিক কী বদলাতে হবে।

---

## ০. এখনকার অবস্থা — এক নজরে (মাপা, অনুমান নয়)

| বিষয় | ফলাফল |
|---|---|
| `npx tsc --noEmit` | ✅ পরিষ্কার, কোনো error নেই |
| `npx eslint .` | ✅ পরিষ্কার |
| `npm run build` | ❌ **ফেল করে** — `fonts.googleapis.com`-এ পৌঁছাতে না পারলে (`next/font/google` build-time network চায়) |
| `npm run dev` | ✅ চলে, ১০টা রুটই `200` দেয় (/, /projects, /lab, /now, /writing, /open-source, /about, /designs, /contributions, /projects/[slug]) |
| Next.js | 15.5.9, App Router, React 19, Tailwind v4 (`@theme inline`), TS strict |
| ফাইল সংখ্যা | `src/` মিলিয়ে ৩৭৮৭ লাইন টাইপড কোড + ৬৩টা UI কম্পোনেন্ট |
| `public/` | **৮১ MB** (একা `designs/` = ৭১ MB) |
| ডেড কোড | ৪২/৪৮ টা `components/ui/*` কখনো import হয়নি; ৬টা সেকশন/পেজ কম্পোনেন্টও কখনো ব্যবহৃত নয় |
| টেস্ট | ০টা (কোনো ফ্রেমওয়ার্কই নেই) |
| CI | নেই (`.github/` ফোল্ডারই নেই) |
| পেজ-লেভেল SEO | নেই — শুধু `layout.tsx`-এ metadata; ৭টা পেজ `'use client'` তাই নিজের `metadata` দিতেই পারে না |

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
- `next-intl` ইনস্টল করা আছে; ওটা দিয়েই করে ফেললে codegen+type-safety পাওয়া যায়। অথবা হালকা পথ: `useLocale()` কনটেক্সট + cookie — কিন্তু সেটা URL-ভিত্তিক SEO সমস্যার সমাধান করে না, তাই `[locale]` সেগমেন্টই ঠিক সিদ্ধান্ত।
- পুরোনো বাংলা URL গুলো (`/projects/bangla-typing?lang=en`) ৩০১ করে `/bn|/en`-এ পাঠাতে হবে।

### ১.২ ডেড কোড সরান — README যা দাবি করে তা কোডে নেই

| দাবি (README) | বাস্তবতা |
|---|---|
| "Detailed case studies … fetched dynamically from a database using Prisma" | `src/lib/prisma.ts` **কোথাও import হয়নি**; সব ডেটা `src/data/projects.ts`-এ; `User`/`Post`/`Project` মডেল অব্যবহৃত |
| "Dark/Light Mode: seamless theme switching" | `.dark {}` টোকেন `globals.css:110`-এ আছে, কিন্তু `.dark` ক্লাস **কেউ কখনো লাগায় না** — কোনো ThemeProvider/toggle নেই |
| "Bilingual using a custom translation system" | উপরের ১.১ দ্রষ্টব্য |
| "EmailJS / TanStack Query / Zustand / Charts" | TanStack Query, Zustand, Recharts — অ্যাপ কোডে ০টা ব্যবহার |

নিশ্চিতভাবে মুছে ফেলার লিস্ট:
```
src/components/sections/Stats.tsx          (0 import)   ← ভুয়া "২০+ প্রজেক্ট / ৬+ মাস" পরিসংখ্যান
src/components/sections/Services.tsx       (0 import)
src/components/sections/About.tsx          (0 import — AboutTeaser কেন্দ্রীয়, এটা লেজACY)
src/app/GithubProjects.tsx                 (0 import)
src/app/WikimediaContributions.tsx         (0 import — নিচে ১.৩ দেখুন)
src/app/DesignShowcase.tsx                 (0 import)
src/app/translations.ts                    (শুধু উপরের ডেড ফাইল ব্যবহার করে)
src/data/translations.ts                   (০ বাইট)
src/lib/prisma.ts, prisma/schema.prisma, prisma/seed.ts, db/custom.db
```
> Prisma সত্যিই দরকার হলে রাখুন — কিন্তু তারপর data layer সত্যিই DB-তে নিন এবং README দাবির সাথে মেলান। Portfolio-র জন্য `src/data/*.ts` (typed, git-এ versioned) আসলে **ভালো** সিদ্ধান্ত — তখন Prisma + `db/custom.db` + `examples/websocket` + `mini-services/` + `.idx/dev.nix` + `Caddyfile` সরিয়ে দিন (এগুলো AI scaffold-এর অবশিষ্ট)।
>
> ⚠️ `db/custom.db` এখনো git-এ **tracked**, যদিও `.gitignore`-এ `*.db` আছে (ignore শুধু নতুন ফাইলে কাজ করে): `git rm --cached db/custom.db`

### ১.৩ একই তথ্যের ৪টা কপি (Wikimedia)

```
src/app/contributions/page.tsx        ← লাইভ API (ঠিক পথ) ✅
src/app/open-source/page.tsx          ← হার্ডকোড করা সংখ্যা (2150/890/540/230/120) ❌
src/components/sections/OpenSourceStrip.tsx
src/app/WikimediaContributions.tsx    ← ডেড
```
হোমপেজের সংখ্যা আর `/contributions`-এর লাইভ সংখ্যা একদিনেই আলাদা হয়ে যাবে। **একটাই `getWikimediaStats()` ফাংশন** বানান (বর্তমান cache/revalidate প্যাটার্নটা ঠিক আছে), বাকি সব সেখান থেকেই খাওয়াক। একই নিয়ম "13 levels, 61 lessons"-এর ক্ষেত্রেও।

### ১.৪ `public/` ৮১ MB — পারফরম্যান্সে সরাসরি ধাক্কা

```
public/designs/decision-tree-futuristic.png   9.1 MB
public/designs/data-science-hero.png          8.4 MB
public/designs/ai-cold-war-edited.png         8.3 MB
public/designs/ai-singer.png                  8.2 MB
public/designs/netflix-recommendation.png     8.1 MB
public/profile.png                            7.8 MB   ← বনাম profile.webp = 40 KB (১৯৫× ছোট!)
```
`src/components/sections/About.tsx` (ডেড ফাইল) এখনো `/profile.png` ধরে আছে — কেউ সেটা ফিরিয়ে আনলে ৭.৮ MB ইমেজ প্রথম ভিউতে চলে যাবে। `sharp` ইনস্টল করা আছে, তাই এক ধাপেই WebP/AVIF-এ নামানো যায় — রেডি স্ক্রিপ্ট: `scripts/optimize-images.mjs` (এই PR-এ যোগ করা)।

```bash
node scripts/optimize-images.mjs --dry-run   # কী কী বদলাবে দেখুন
node scripts/optimize-images.mjs             # চালান
```

**আসল মাপা ফল (এই রিপোতেই চালানো dry-run):** ২১টি ফাইল, **80.09 MB → 2.14 MB (−97%, সাশ্রয় ৭৮ MB)**, `max-width=1600, quality=78`-এ।
একা `profile.png`: 7.42 MB (2400px) → 111 KB। অর্থাৎ gzip পরেও যা ছিল তা এক ডিপ্লয়ে ৯৭% কমবে।

> `next/image` ব্যবহৃত জায়গায় ফাইল সাইজ কমলেই যথেষ্ট; সরাসরি `<img src="/designs/x.png">` থাকলে path `.webp`-এ বদলাতে হবে।
> প্রোডাকশন ইমেজ git-এ রাখতে চাইলে Git LFS বিবেচনা করুন — নাহলে কমপ্রেস করা ফাইলই commit করুন (ইতিহাসে পুরোনো ভারী ব্লব থাকবে, দরকার হলে `git filter-repo` দিয়ে ছাড়বেন)।

### ১.৫ Contact ফর্মে হার্ডকোড করা EmailJS কী

`src/components/sections/Contact.tsx:68-72` — service ID, template ID, public key সোর্স কোডে বসানো। Public key গোপনীয় কিছু নয়, কিন্তু সোর্সে হার্ডকোড থাকলে **স্প্যাম বটের target** হয় এবং কী পরিবর্তন করতে হলে কোড বদলাতে হয়।

```tsx
await emailjs.send(
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
  { from_name: name, email, message },
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
);
```
সাথে: `.env.example` commit করুন, EmailJS ড্যাশবোর্ডে **Allowed Origins** সেট করুন, একটা honeypot ফিল্ড বা Cloudflare Turnstile যোগ করুন, আর পুরোনো কী একবার rotate করে নিন (এটা এখন পাবলিক রিপোতে আছে)।

### ১.৬ বিল্ড এখন নেটওয়ার্কের দাস

আমি এই স্যান্ডবক্সে `npm run build` চালিয়ে ঠিক এই এররটা পেয়েছি:
```
Failed to fetch `Hind Siliguri` from Google Fonts.  →  Failed to compile.
```
Vercel-এ অসুবিধা হয় না, কিন্তু যেকোনো অফলাইন/সীমাবদ্ধ CI, Docker build, বা দুর্বল কানেকশনে বিল্ড ভাঙবে। **সমাধান:** ফন্টগুলো `public/fonts/`-এ self-host করে `next/font/local` ব্যবহার করুন (সম্পূর্ণ অফলাইন-সেফ, বোনাস: Bengali ফন্ট subset-এর সাইজ নিজের হাতে)।

### ১.৭ ডিপেন্ডেন্সি ছাঁটাই

সরাসরি অব্যবহৃত: `next-auth`, `@dnd-kit/*` (৩টা), `@mdxeditor/editor`, `z-ai-web-dev-sdk`, `nodemon`, `@tanstack/react-query`, `@tanstack/react-table`, `zustand`, `axios`, `uuid`, `date-fns`, `react-syntax-highlighter`, `@reactuses/core`, `next-intl` (ব্যবহার করলে রাখুন)।
পরোক্ষভাবে ডেড: `recharts`, `socket.io(-client)`, `vaul`, `cmdk`, `input-otp`, `react-day-picker`, `react-resizable-panels`, `embla-carousel-react` — এগুলো শুধু ওই ৪২টা অব্যবহৃত `components/ui/*` ফাইলের ভেতরে আছে। ৪২টা UI ফাইল না মুছে শুধু প্যাকেজ রাখা মানে `npm install`-এ প্রতি ডিপ্লয়ে সময়+সাপ্লাই-চেইন রিস্ক দুই-ই বাড়ানো।

---

## ২. P1 — স্থাপত্য ও মান (১–২ সপ্তাহ)

1. **শেয়ারড লেআউট।** ৯টা পেজ হাতে হাতে `SiteHeader`+`SiteFooter` বসায়। `src/app/[locale]/layout.tsx`-এ একবার বসান → হেডার/ফুটার/লোকেল/থিম সব এক জায়গায়।
2. **প্রতি পেজে metadata + JSON-LD।** P0-র `[locale]` কাজ শেষ হলে 각 পেজে `generateMetadata` (title, description, OG image, `alternates.languages`) আর `Person`/`SoftwareSourceCode` schema.org JSON-LD যোগ করুন। এখন সব পেজের `<title>` একটাই।
3. **ডাইনামিক OG ইমেজ।** `next/og` দিয়ে `/projects/[slug]/opengraph-image.tsx` — প্রজেক্টের নাম+স্ট্যাটাস বসানো কার্ড। শেয়ারে CTR অনেক বাড়ে।
4. **Content pipeline।** `/writing` এখন `src/data/writing.ts`-এ JS অবজেক্ট; `src/app/blog/page.tsx` ৫ লাইনের খালি পাতা। বরং **MDX + `content/` ফোল্ডার → `/writing/[slug]` স্ট্যাটিক পেজ + `generateStaticParams` + RSS**। প্রতিটা লেখা তখন সার্চে আলাদা পেজ, আর লেখা Git-এ versioned থাকে।
5. **CI (১০ মিনিটের কাজ, আজই):** `.github/workflows/ci.yml` → `npm ci && npx tsc --noEmit && npm run lint && npm run build`। সাথে PR-এ Lighthouse CI বাজেট (`LCP < 2.5s`, image bytes < 500KB/পেজ) — ৮১ MB ইমেজ সমস্যা আর ফিরে আসবে না।
6. **টেস্ট (ছোট কিন্তু মূল্যবান):** Playwright smoke — ১০টা রুট `200`, ভাষা টগল করে `/en`-এ যায়, ফর্ম ভ্যালিডেশন, dark mode টগল। + `@axe-core/playwright` দিয়ে অটো a11y চেক (alt, contrast, focus ring)। ডিজাইন সিস্টেম এত নিয়ম মেনে তৈরি, অটোমেটেড গার্ড না থাকলে সেটা টিকবে না।
7. **ডাটা সিঙ্গেল-সোর্স:** `projects.ts`-এ status/year/links বাড়ান, তারপর scale-এ GitHub API (এখন GitHub-এর লাইভ ডেটা হোমপেজে নেই — সেটাই ঠিক, `পরিকল্পনা.md` §৩৮) — শেষ ধাপে ISR/cron দিয়ে রিফ্রেশ।
8. **অ্যানালিটিক্স + Web Vitals:** Vercel Analytics বা Umami (self-host) — কোন প্রজেক্টে মানুষ আসলে ক্লিক করে, সেটা ছাড়া "curated work" সিদ্ধান্ত অন্ধভাবে নেওয়া।

---

## ৩. P2 — কনটেন্ট/প্রোডাক্ট (পরিকল্পনা.md-এর সাথে মিলিয়ে)

`পরিকল্পনা.md`-এর ৫টি ধাপের সাথে ম্যাপিং:

| পরিকল্পনা.md phase | এখানকার ধাপ |
|---|---|
| Phase 1 — Content audit | P0-১.২ (ডেড কোড/ভুয়া সংখ্যা সরানো) + প্রতিটা প্রজেক্টে **আসল** স্ক্রিনশট |
| Phase 2 — Visual system | ইতিমধ্যে হয়েছে — `docs/design-system.md` হালনাগাদ রাখুন, dark mode হয় বানান নাহয় README থেকে সরান |
| Phase 3 — New shell | P0-১.১ (`[locale]` + শেয়ারড লেআউট) |
| Phase 4 — Homepage | আজকের হোমপেজ মোটামুটি আছে — শুধু "Selected Work"-এ আসল ইমেজ + প্রমাণ (star/stats/live link) |
| Phase 5 — Project ecosystem | `/projects/[slug]`-এ architecture ডায়াগ্রাম + challenges/solution (ডেটা স্ট্রাকচারে জায়গা আগেই আছে: `problem`, `solution`, `architecture`, `lessons`) |
| Phase 6 — Live data | Wikimedia stats এক জায়গায় (P0-১.৩), GitHub repo data `revalidate` দিয়ে |

বোনাস আইডিয়া: `/uses` (যন্ত্রপাতি), `/now` auto-update, প্রজেক্ট পেজের নিচে "related projects" (Nilang/Alap/Onuron family — `পরিকল্পনা.md` §১১), আর বাংলা টেক কমিউনিটির জন্য লেখার RSS/নিউজলেটার।

---

## ৪. প্রস্তাবিত সময়সূচি

| স্প্রিন্ট | কাজ | শেষে যা পাওয়া যাবে |
|---|---|---|
| **S1 (২–৩ দিন)** | ছবি কমপ্রেস, ডেড কোড+Prisma সরানো, EmailJS env, ফন্ট self-host, `.env.example`, CI ওয়ার্কফ্লো | বিল্ড নির্ভরযোগ্য, রিপো হালকা, vite‑র মতো দ্রুত ডিপ্লয় |
| **S2 (৪–৫ দিন)** | `[locale]` রাউটিং + শেয়ারড লেআউট + প্রতি পেজে metadata/hreflang | বাংলা/ইংরেজি আসলেই দুই ভাষার সাইট, SEO-যোগ্য |
| **S3 (১ সপ্তাহ)** | MDX writing pipeline + `/writing/[slug]` + RSS + ডাইনামিক OG | কনটেন্ট সাইট হয়ে ওঠা, শেয়ারে প্রিভিউ কার্ড |
| **S4 (১ সপ্তাহ)** | প্রকৃত স্ক্রিনশট, architecture ডায়াগ্রাম, Wikimedia এক-সোর্স, a11y+Playwright টেস্ট | "Digital Workshop" ভিশন বাস্তবে |

---

## ৫. কাজের নিয়ম (এটা থাকলে বাকিটা সহজ হয়)

```bash
npm run dev                        # লোকাল
git checkout -b feat/<topic>       # ছোট, এক-কাজ-এক-ব্রাঞ্চ
npx tsc --noEmit && npm run lint   # commit-এর আগে
git push -u origin feat/<topic>    # PR → Vercel preview URL দেখে মর্জি
```
- প্রতিটা PR-এ screenshot/ভিডিও দিন (বাংলা টাইপোগ্রাফির ভাঙা লাইন চোখেই ধরা পড়ে, টেস্টে নয়)।
- `docs/design-system.md` আর `docs/roadmap-bn.md` AI-কে context দেওয়ার কাজে ব্যবহার করুন — `পরিকল্পনা.md` §৫৮ ঠিক এই কারণেই লেখা।
- **এক PR-এ এক কাজ।** এখনকার সবচেয়ে বড় রিস্ক এই না যে কোড খারাপ — বড় রিস্ক হলো একসাথে locale migration + ডিজাইন + ডেটা বদলালে কোনো কিছু ডিবাগ করা অসম্ভব হয়ে যাওয়া।

---

## ৬. সবচেয়ে ছোট পরের ধাপ

1. S1-এর ১.৪ (ছবি) আর ১.৫ (EmailJS কী) — ৩০ মিনিটের কাজ, কিন্তু প্রভাব তাৎক্ষণিক।
2. ১.২ ডেড কোড সরানো — রিপো ছোট হবে, README আর কোড মিলে যাবে।
3. তারপর `[locale]` migration — এটাই আসলে "উন্নয়ন" শব্দটার মূল কাজ।
