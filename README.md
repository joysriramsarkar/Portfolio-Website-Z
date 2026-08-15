# Joysriram Sarkar - Personal Portfolio

Welcome to the open-source repository for my personal portfolio website. This project showcases my skills, experience, and the projects I've built as a Web Developer, AI Content Writer, and Tech Enthusiast.

You can visit the live website here: [https://joysriram.com](https://joysriram.com)

## 🚀 Technology Stack

This portfolio is built with a modern and highly performant tech stack:

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database ORM**: [Prisma](https://www.prisma.io/) (with SQLite for local development)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Forms**: React Hook Form & Zod
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Email**: EmailJS

## ✨ Features

- **Bilingual Support**: Fully localized in English and Bengali using a custom translation system.
- **Dynamic Projects Showcase**: Detailed case studies for each project, fetched dynamically from a database using Prisma.
- **Interactive UI**: Smooth scrolling, micro-interactions, and page transitions powered by Framer Motion.
- **Dark/Light Mode**: Seamless theme switching.
- **Contact Form**: Integrated with EmailJS for direct communication.
- **Performance Optimized**: Uses Next.js `<Image>` component, lazy loading, and caching for optimal speed.
- **SEO & Accessibility**: Configured with comprehensive metadata, structured data, and accessible components.

## 🛠️ Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/joysriramsarkar/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup the Database:
   ```bash
   npx prisma generate
   npm run db:push
   npx prisma db seed
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 📦 Available Commands

- `npm run dev`: Starts the development server.
- `npm run build`: Creates an optimized production build.
- `npm start`: Starts the production server.
- `npm run lint`: Runs ESLint to catch errors.
- `npm run db:push`: Pushes the Prisma schema state to the database.
- `npm run db:generate`: Generates Prisma Client.
- `npm run db:migrate`: Creates a new Prisma migration.

## 🤝 Contact

Feel free to reach out to me for collaboration or inquiries:

- Email: joysriram.sarkar.56@gmail.com
- LinkedIn: [Joysriram Sarkar](https://www.linkedin.com/in/%E0%A6%9C%E0%A7%9F%E0%A6%B6%E0%A7%8D%E0%A6%B0%E0%A7%80%E0%A6%B0%E0%A6%BE%E0%A6%AE-%E0%A6%B8%E0%A6%B0%E0%A6%95%E0%A6%BE%E0%A6%B0-abb282110/)
- GitHub: [joysriramsarkar](https://github.com/joysriramsarkar)

---
© 2025 Joysriram Sarkar. All rights reserved.
