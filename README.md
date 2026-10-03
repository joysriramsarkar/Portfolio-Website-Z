# Joysriram Sarkar — Personal Portfolio & Engineering Workshop

Canonical open-source repository for my personal engineering portfolio. Built with Bengali computing in mind — honest status badges, no vanity metrics, fully documented engineering decisions, and bilingual architecture.

**Live site**: [https://joysriram.com](https://joysriram.com) · **Repository**: [joysriramsarkar/my-portfolio](https://github.com/joysriramsarkar/my-portfolio)

> **Notice**: This is the single, active canonical repository for joysriram.com. All legacy prototypes, microservices, and unused scaffoldings have been removed in favor of a lean, production-grade Next.js App Router architecture.

---

## 🚀 Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Static Generation + Server Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type safety)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) — bespoke design system, Hind Siliguri + Poppins typography
- **UI Primitives**: Curated [shadcn/ui](https://ui.shadcn.com/) components (`button`, `input`, `textarea`, `toast`, `toaster`)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes) (Light / Dark mode with system synchronization)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms & Validation**: React Hook Form, Zod, and honeypot bot trap
- **Email Delivery**: EmailJS integration via environment variables
- **Continuous Integration**: GitHub Actions (`.github/workflows/ci.yml`)

**Strictly pruned**: Zero dead dependencies. Excised 24 unused npm libraries (Prisma, TanStack Query/Table, Zustand, Recharts, Socket.io, etc.), saving ~70 MB and drastically reducing bundle size and attack surface.

---

## ✨ Architectural Highlights

- **Global Language Persistence**: Bengali (primary) & English. Seamlessly synchronizes state across routes via `LanguageProvider`, `localStorage`, URL search params (`?lang=en`), and dynamic `<html lang>` synchronization.
- **Deep Technical Case Studies**: Detailed breakdowns of Bangla Typing, POS, Chalao, and Nilang — architecture decisions, failure modes, grapheme segmentation, and lessons learned.
- **Dynamic SEO & Metadata**: 
  - Dynamic `generateMetadata` for case studies and writing pieces.
  - Multilingual sitemap (`sitemap.ts`) with `alternates.languages` (`bn` and `en`).
  - Strict HTTP security headers (CSP, HSTS, X-Content-Type-Options, Permissions-Policy).
  - Valid Schema.org `Person` JSON-LD structured data.
- **Optimized Media Assets**: 100% WebP image pipelines with explicit dimensions and modern responsive srcset.
- **Accessibility (a11y)**: Accessible skip-to-content mechanism (`#main-content`), proper ARIA labels, semantic landmark hierarchy, and screen-reader tested status badges.

---

## 🛠️ Getting Started

```bash
# Clone the repository
git clone https://github.com/joysriramsarkar/my-portfolio.git
cd my-portfolio

# Install production dependencies
npm install

# Run local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

All portfolio content is statically typed in `src/data/` — no external database required.

---

## 📦 Scripts

- `npm run dev` — Start Next.js development server
- `npm run build` — Build production bundle
- `npm start` — Run production server
- `npm run lint` — Run ESLint across entire repository
- `npx tsc --noEmit` — Run TypeScript type-checker

---

## 🤝 Connect

- **Email**: joysriram.sarkar.56@gmail.com
- **GitHub**: [@joysriramsarkar](https://github.com/joysriramsarkar)
- **LinkedIn**: [Joysriram Sarkar](https://www.linkedin.com/in/joyshriramsarkar/)
- **X (Twitter)**: [@SarkarJoysriram](https://x.com/SarkarJoysriram)

---

© 2026 Joysriram Sarkar. Released under the MIT License.
