# Shrutivanam

A premium, fast, and responsive spiritual learning platform built to provide authentic Vedic education including courses in Vedic Mathematics, Yoga, Sanskrit, and Indian Philosophy. 

## Tech Stack
* **Framework:** Next.js 15 (App Router)
* **Styling:** Tailwind CSS v4
* **Animations:** Framer Motion (Hardware-accelerated CSS animations)
* **Icons:** Lucide React
* **Typography:** Cinzel (Headings), Cormorant Garamond (Quotes), Inter (Body)
* **Deployment:** Vercel

## Project Structure
- `src/app/` - The Next.js App Router containing pages, layouts, and global CSS.
  - `page.tsx` - The landing/home page.
  - `courses/` - The course catalog and dynamic course route (`[slug]`).
  - `about/` - The origin story and teacher profiles.
  - `contact/` - Client-side contact form with WhatsApp integration.
- `src/components/` - Reusable UI components.
  - `FadeIn.tsx` - Framer motion scroll wrapper.
  - `MouseOrb.tsx` - Interactive glowing pointer background.
  - `WhatsAppStrip.tsx`, `Navbar.tsx`, `Footer.tsx` - Persistent UI elements.
- `src/data/` - Lightweight database files (`courses.ts` and `teachers.ts`) to manage content without needing a headless CMS.

## Local Development

1. **Install Dependencies:**
```bash
npm install
```

2. **Run the Development Server:**
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Content Management
If you need to update course information, fees, or add a new teacher, you do not need to hunt through UI code. Simply update the arrays located in:
* `src/data/courses.ts`
* `src/data/teachers.ts`

These changes will automatically propagate nicely to the course grids and detail pages.

## Theme & Styles
The core theme (colors, spacing, and glowing ambient gradients) is managed in `src/app/globals.css` using modern Tailwind v4 `@theme` directives. The distinctive noise-texture overlay is also injected globally from this file to ensure the site retains its premium, organic feel.
