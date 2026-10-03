# Joysriram Sarkar — Personal Portfolio

Open-source repository for my personal engineering portfolio. Built with Bengali computing in mind — honest status badges, no vanity metrics, documented decisions.

**Live site**: [https://joysriram.com](https://joysriram.com) · **Repository**: [joysriramsarkar/my-portfolio](https://github.com/joysriramsarkar/my-portfolio)

---

## 🚀 Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) — custom design system, no component library styling
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (selected components only)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes) (dark/light mode)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms**: React Hook Form & Zod
- **Email**: EmailJS

**Intentionally removed**: socket.io, next-auth, next-intl, @mdxeditor/editor, @dnd-kit, recharts, prisma, @prisma/client, embla-carousel, axios, uuid, z-ai-web-dev-sdk — none of these were used in production.

---

## ✨ Features

- **Bilingual Support**: Bengali (primary) and English — custom translation system, no i18n framework.
- **Dark Mode**: Toggled via Navbar — preference stored in localStorage via next-themes.
- **Writing with URLs**: Each article has its own route (`/writing/[slug]`) — shareable, indexable, refresh-safe.
- **Deep Case Studies**: Bangla Typing and POS include the actual problem, architecture decisions, what broke, and what was learned.
- **JSON-LD Structured Data**: Person schema in `layout.tsx` for Google rich results.
- **Dynamic OG Image**: `opengraph-image.tsx` generates a social preview card using next/og edge API.
- **Mobile NOW strip**: The hero NOW section is visible on phones (not just `hidden lg:block`).
- **SEO**: sitemap includes all project and writing article routes.

---

## 🛠️ Getting Started

```bash
git clone https://github.com/joysriramsarkar/my-portfolio.git
cd my-portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

No database setup needed — all data is statically typed in `src/data/`.

---

## 📦 Commands

- `npm run dev` — Development server on port 3000
- `npm run build` — Production build
- `npm start` — Production server
- `npm run lint` — ESLint

---

## 🤝 Contact

- **Email**: joysriram.sarkar.56@gmail.com
- **GitHub**: [joysriramsarkar](https://github.com/joysriramsarkar)
- **LinkedIn**: [Joysriram Sarkar](https://www.linkedin.com/in/joysriram-sarkar-abb282110/)

---

© 2026 Joysriram Sarkar.
