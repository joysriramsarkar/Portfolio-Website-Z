# Joysriram Engineering Lab — Portfolio Design System

> **Aesthetic Philosophy**: Editorial + Technical + Bengali.
> Quiet confidence, evidence-first, warm paper texture, no generic neon cyan glows.

---

## 1. Brand Identity
- **Wordmark**: জয়শ্রীরাম সরকার / Joysriram Sarkar
- **Tagline**: AI-assisted builder · Bengali-first technologist · Open-source experimenter
- **Concept**: Digital Workshop & Engineering Laboratory rather than agency portfolio.

---

## 2. Color Palette & Design Tokens

### Base Palette (Light Mode - Paper Texture)
- `--bg`: `#F7F5F0` (warm off-white / editorial paper)
- `--surface`: `#EFECE4` (warm card surface)
- `--surface-2`: `#E5E1D6` (secondary subtle background)
- `--border`: `#DCD9D1` (clean dividing border)
- `--border-strong`: `#BCB8AD` (hover border state)
- `--text`: `#171717` (near black primary typography)
- `--text-muted`: `#6B6B67` (balanced secondary text)
- `--text-faint`: `#9B9A93` (metadata & captions)

### Cultural & Technical Accents
- `--accent-bengali`: `#A33A2B` (deep terracotta / Bengali clay red)
- `--accent-bengali-light`: `#BD4B3B` (hover accent)
- `--accent-bengali-bg`: `rgba(163, 58, 43, 0.08)`
- `--accent-tech`: `#234A84` (deep technical navy blue)
- `--accent-tech-bg`: `rgba(35, 74, 132, 0.08)`

### Dark Mode Tokens
- `--bg`: `#10110F` (deep obsidian paper)
- `--surface`: `#181916` (dark card surface)
- `--surface-2`: `#22241F`
- `--border`: `#2A2C27`
- `--border-strong`: `#3D4039`
- `--text`: `#F3F1EA` (warm ivory text)
- `--text-muted`: `#A7A69F`
- `--text-faint`: `#6E6D67`

---

## 3. Typography Rules
- **Bengali Primary Font**: `Hind Siliguri` (`--font-hind-siliguri`)
- **English UI Font**: `Poppins` (`--font-poppins`)
- **Code / Metrics / Metadata Font**: Monospace (`ui-monospace`, `SFMono-Regular`, `Menlo`, `monospace`)
- **Bengali Line Height**: Minimum `1.6` for body text to allow room for matras (মাত্রা) and conjuncts (যুক্তবর্ণ).
- **Scale Hierarchy**:
  - Hero Display: `text-4xl` to `text-7xl`
  - Section Headings: `text-2xl` to `text-3xl`
  - Card Titles: `text-base` to `text-lg`
  - Body: `text-sm` to `text-base`
  - Metadata / Section Numbers: `text-xs` font-mono

---

## 4. Border Radius
- Container & Card radius: `4px` - `8px` (`rounded`, `rounded-md`)
- Badges & Pills: `rounded` or `rounded-full` for status dots
- Avoid overly rounded `rounded-2xl` / `rounded-3xl` unless for avatars.

---

## 5. Project States & Status Badges
Every project in `src/data/projects.ts` uses one of these states:
- `live`: `#1E5E3A` (Green)
- `building`: `#A85A00` (Amber)
- `experiment`: `#5C3A9E` (Purple)
- `paused`: `#6B6B67` (Neutral)
- `archived`: `#4A4A48` (Slate)
- `idea`: `#234A84` (Tech Blue)

---

## 6. Architecture & Directory Structure
```text
src/
├── app/
│   ├── page.tsx               # Homepage client shell
│   ├── layout.tsx             # Fonts, metadata & global providers
│   ├── globals.css            # Token definitions & utilities
│   ├── projects/              # Projects catalogue
│   │   ├── page.tsx           # Search & filterable catalogue
│   │   └── [id]/page.tsx      # Case study layout
│   ├── lab/page.tsx           # Digital lab & research topics
│   ├── now/page.tsx           # Derek Sivers /now page
│   ├── about/page.tsx         # Story, timeline & capability matrix
│   ├── writing/page.tsx       # Technical essays & reader
│   ├── open-source/page.tsx   # GitHub repos + Wikimedia summary
│   ├── designs/page.tsx       # Visual design gallery with lightbox
│   └── contributions/page.tsx # Live Wikimedia API dashboard
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx         # SiteHeader
│   │   └── Footer.tsx         # SiteFooter
│   └── sections/
│       ├── Hero.tsx
│       ├── FeaturedProjects.tsx (Selected Work)
│       ├── HowIBuild.tsx
│       ├── LabTeaser.tsx
│       ├── OpenSourceStrip.tsx
│       ├── BuildLogStrip.tsx
│       ├── AboutTeaser.tsx
│       ├── WritingTeaser.tsx
│       └── Contact.tsx
└── data/
    ├── projects.ts            # Master project database
    ├── content.ts             # Build log, timeline, lab items
    ├── writing.ts             # Authentic technical essays
    └── designs.ts             # Visual gallery data
```
