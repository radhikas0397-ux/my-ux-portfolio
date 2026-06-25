# Radhika Sharma — UX Portfolio

A premium, dark, minimal portfolio for **Radhika Sharma, UI/UX Designer**. Built as a
high-end, editorial single-page experience with reusable case study pages.

## Tech stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4** (CSS-first `@theme` config in `app/globals.css`)
- **Framer Motion** (page load, scroll reveals, hover, cursor glow)
- **Lucide React** icons
- **next/font** (Inter, Space Grotesk, Instrument Serif)

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (defaults to `http://localhost:3000`).

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Structure

```
app/
  layout.tsx            # fonts, metadata, dark theme shell
  globals.css           # design tokens, utilities, animations
  page.tsx              # landing page (composes all sections)
  components/           # Navbar, Hero, About, SelectedWork, ProjectCard,
                        # Process, Skills, Contact, Footer, Reveal, CursorGlow…
  lib/
    projects.ts         # case study content (single source of truth)
    site.ts             # name, role, email, links
  work/[slug]/page.tsx  # reusable case study template
public/
  resume.pdf            # placeholder — replace with the real resume
```

## Sections

Hero · About · Selected Work · Design Process · Experience & Skills · Contact,
plus a reusable case study template at `/work/[slug]` for each project
(Buyer Web App, Carbon Wallet, Partner Dashboard, Virtual Field Tour).

## Customising

- **Content / case studies:** edit `app/lib/projects.ts`.
- **Contact details & nav:** edit `app/lib/site.ts`.
- **Colors, fonts, glow:** edit the tokens at the top of `app/globals.css`.
- **Real images:** the large gradient placeholders live in `ProjectCard.tsx` and
  the case study hero — swap them for `next/image` when assets are ready.
- **Resume:** replace `public/resume.pdf`.
```
