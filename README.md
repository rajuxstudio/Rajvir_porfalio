# Rajveer — Portfolio

**Live site → [rajuxstudio.github.io/Rajvir_porfalio](https://rajuxstudio.github.io/Rajvir_porfalio/)**

UX/UI Designer & Developer — 4+ years designing SaaS and enterprise platforms across Agriculture, Government & Civic Services, Education, Healthcare (mHealth), FinTech, mCommerce, Retail, and Real Estate.

This repo is the source for my personal portfolio site: a home page with an interactive project carousel, in‑depth UX case studies for real client work (CloudGavel, UtilityPlus, CaraStone, Bumper Mandi, Echelon Constructors, and more), and a developer projects section with live, playable demos.

## Highlights

- **Case studies** — real product screenshots, user flows, and outcomes for shipped design work, built on a shared theming/component kit so every project reads consistently.
- **Dev projects** — actual code, not just screenshots. E.g. **Snake Water Gun** is a fully playable browser port of a Python/Tkinter game, with a VS Code‑style viewer for the real source files.
- **3D project carousel** on the home page, with light/dark theme support throughout.

## Tech stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/) for animation
- [React Router](https://reactrouter.com/) for routing
- [next-themes](https://github.com/pacocoursey/next-themes) for light/dark mode

## Getting started

Requires Node.js & npm ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)).

```sh
# Clone the repository
git clone https://github.com/rajuxstudio/Rajvir_porfalio.git

# Navigate to the project directory
cd Rajvir_porfalio

# Install dependencies
npm i

# Start the dev server with hot reload
npm run dev
```

Other useful scripts:

```sh
npm run build      # production build (+ writes dist/404.html and dist/.nojekyll)
npm run build:dev  # development-mode build
npm run preview    # preview the production build locally
npm run lint       # run ESLint
npm test           # run the test suite (Vitest)
```

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the
project and publishes `dist/` to GitHub Pages.

Because Pages serves this repo as a project page under `/Rajvir_porfalio/`:

- `vite.config.ts` sets `base: "/Rajvir_porfalio/"` so built asset URLs carry that prefix.
- `BrowserRouter` uses `basename={import.meta.env.BASE_URL}` so routes still match.
- The build writes `dist/404.html` (a copy of `index.html`) so deep links resolve client-side,
  and `.nojekyll` so Pages doesn't run Jekyll over the output.
- Files in `public/` referenced from JS go through `publicUrl()` in `src/lib/utils.ts`, since Vite
  doesn't rewrite absolute paths written as plain strings.

## Contact

- **LinkedIn** — [linkedin.com/in/rajuxstudio](https://www.linkedin.com/in/rajuxstudio/)
- **GitHub** — [github.com/rajuxstudio](https://github.com/rajuxstudio)
- **Email** — raju@xstudio.com

Or use the contact form on the live site.
