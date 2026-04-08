# cmlabs-frontend-parttime-test

A Next.js application that displays meal recipes from [TheMealDB API](https://www.themealdb.com/api.php), built with HeroUI, Tailwind CSS, React Query, and Axios.

## Prerequisites

- Node.js 18.x or later
- npm

## Installation

```bash
npm install
```

Then start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser, or visit the live version at [https://renaldykharisma95.github.io/cmlabs-frontend-parttime-test/](https://renaldykharisma95.github.io/cmlabs-frontend-parttime-test/).

> **Note:** This project uses `basePath: "/cmlabs-frontend-parttime-test"` in `next.config.ts`, so all routes are served under `/cmlabs-frontend-parttime-test`.

## Scripts

| Command         | Description                        |
|-----------------|------------------------------------|
| `npm run dev`   | Start the development server       |
| `npm run build` | Build the app for production       |
| `npm run start` | Start the production server        |
| `npm run lint`  | Run ESLint                         |

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** HeroUI
- **Styling:** Tailwind CSS
- **Data Fetching:** TanStack Query + Axios
- **API:** TheMealDB
