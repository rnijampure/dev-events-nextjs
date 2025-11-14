# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Core Commands

All commands are run from the project root (`my-app`). Use your preferred package manager; examples below use `npm`.

- **Start dev server** (Next.js App Router):
  - `npm run dev`
  - Serves the app on `http://localhost:3000/` by default.
- **Build for production**:
  - `npm run build`
- **Start production server** (after `npm run build`):
  - `npm run start`
- **Lint the project** (ESLint with `eslint-config-next`):
  - `npm run lint`

### Tests

There is **no `test` script configured** in `package.json`. Before asking Warp to run tests or a single test, first add a test runner (e.g. Jest, Vitest, Playwright) and a corresponding `test` script.

## High-Level Architecture

This is a Next.js 16 app using the App Router (`app/` directory) with TypeScript and React 19. Routing relies on **route groups** and **nested layouts**.

### App Router and Route Groups (`app/`)

- The application is organized under `app/` using **route groups**:
  - `app/(root)/` – main public pages and the root layout.
  - `app/(dashboard)/` – dashboard-specific layout and user pages (group name is **not** part of the URL path).
  - `app/dashboard1/` – an alternate dashboard tree that **is** part of the URL path (`/dashboard1/...`).

> Note on route groups: directories wrapped in parentheses (e.g. `(root)`, `(dashboard)`) are **grouping-only** and do not appear in the URL. When adding or updating links, be careful to use the actual URL segments, not the group name.

#### Root Group: Layout, Pages, Error Boundary

- **Root layout** – `app/(root)/layout.tsx`
  - Async **server component** that fetches data from `https://jsonplaceholder.typicode.com/posts` and `.../albums/1/photos` on each render.
  - Renders a simple navbar and then maps over the fetched posts to show a list of cards.
  - This layout currently mixes list rendering with attempts to access `data.id` / `data.title` as though `data` were a single object; be mindful of this when refactoring data handling.
- **Home page** – `app/(root)/page.tsx`
  - Simple React component, logs to the console, and renders a basic welcome message.
- **About page** – `app/(root)/about/page.tsx`
  - Async server component fetching a single post from `https://jsonplaceholder.typicode.com/posts/1`.
  - Demonstrates per-page data fetching separate from the layout.
- **Error boundary** – `app/(root)/error.tsx`
  - Marked as a client component (`"use client"`).
  - Uses `useEffect` to log errors and expose the error message in the UI.
  - Receives the standard `error` and `reset` props from Next.js and provides a "Try again" button to trigger `reset()`.

#### Dashboard Route Group: Shared Layout and User Pages

- **Dashboard layout (route group)** – `app/(dashboard)/layout.tsx`
  - Shared layout for pages in the `(dashboard)` group.
  - Renders a basic dashboard navbar and footer.
- **User list page** – `app/(dashboard)/users/page.tsx`
  - Static list of links for user IDs 1–3.
  - Uses `next/link` for client-side navigation.
- **User detail page** – `app/(dashboard)/users/[id]/page.tsx`
  - Async server component using the dynamic route parameter `id`.
  - Logs the user ID and renders a detail view placeholder.

> When adding additional dashboard pages, co-locate them under `app/(dashboard)/...` and ensure the dynamic route typings match the shape of `params` expected by Next.js.

#### Alternate Dashboard Tree (`dashboard1`)

- `app/dashboard1/layout.tsx` – alternate dashboard layout with a different shell.
- `app/dashboard1/users/page.tsx` and `app/dashboard1/users/[id]/page.tsx` – mirror the user list/detail pattern used in the `(dashboard)` group, but under the concrete URL prefix `/dashboard1`.

Use this area for experimentation or to maintain a second version of the dashboard without impacting the main route group.

### Shared Data and Types

- **Event constants** – `app/common/constants.ts`
  - Defines an `EventCardProps` interface describing the shape of event data (id, image, title, slug, location, date, time, theme, description, etc.).
  - Exports an `events` array of sample event objects with image paths and metadata.
  - Intended as a central place for event-like content; reuse these types and data when creating event listing/detail components instead of duplicating structures.

### Configuration and Tooling

- **Next.js config** – `next.config.ts`
  - Enables `reactCompiler: true` (React Compiler integration).
  - Configures `images.domains` to allow external images from `via.placeholder.com`.
  - Leaves room for additional experimental flags.
- **TypeScript config** – `tsconfig.json`
  - Strict TypeScript settings (`strict: true`, `noEmit: true`, modern module & lib targets).
  - Path alias: `@/*` mapped to the project root (`./*`). Prefer this alias when referencing app-level modules (e.g. `@/app/common/constants`).
  - Includes `app/**/*`, all `*.ts`/`*.tsx` files, and `.next` type declarations.
- **Styling/tooling dependencies** (from `package.json`):
  - Uses Tailwind CSS 4 (`tailwindcss`, `@tailwindcss/postcss`) and related tooling like `tailwind-merge` and `tw-animate-css`.
  - When adjusting build or PostCSS configuration, keep these dependencies in mind so class-based styling continues to work.

## Deployment

The project follows the standard Next.js deployment model described in the default README:

- Built as a Next.js App Router app suitable for deployment on **Vercel**.
- For deployment details and platform-specific configuration, refer to the official Next.js deployment docs linked from `README.md`.
