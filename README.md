# FitLog — Workout Library

A dark, no-nonsense gym companion built with Next.js. Browse a library of lifts,
drill into detailed instructions and specs, lock exercises into **Today's Plan**,
save others for later, and track a live summary of your session — all backed by
the FitLog API and persisted locally so your plan survives a page reload.

**Live data:** [`https://api.abcz.workers.dev/api/fitlog`](https://api.abcz.workers.dev/api/fitlog)

---

## ✨ Features

1. **Responsive workout library** — a 3×4 grid on desktop that collapses gracefully
   down to a single column on mobile, with category tags, equipment, and a
   duration / calories / rating stats row on every card.
2. **Sort & search** — sort the library by Duration, Calories, or Rating, and
   search by name, muscle group, or equipment — live, client-side, no reload.
3. **Workout detail pages** — a two-column layout with a full spec panel
   (equipment, difficulty, sets, reps, duration, calories, rating) and a
   numbered instructions list for every lift.
4. **Today's Plan & Saved, with a 5-lift cap** — add a workout to today's plan
   or save it for later from the detail page; the navbar badges update live,
   toast notifications confirm every action, and the plan page shows live
   Exercises / Minutes / Calories totals plus Mark as Done / Remove actions.
5. **Persistent state** — Today's Plan and Saved are stored in `localStorage`,
   so they survive a full page reload or a fresh visit.
6. **Resilient API layer** — a normalization layer maps whatever field names
   the API returns (e.g. `muscleGroups` or `categories`, `caloriesBurned` or
   `calories`) onto one consistent `Workout` shape, so the UI never breaks on
   a missing or renamed field.
7. **Polished empty/loading/error/404 states** — a themed loading spinner while
   the library fetches, an empty-state card with a CTA back to the library, and
   a custom 404 page for any unknown route.

---

## 🛠️ Technologies Used

| Technology | Purpose |
| --- | --- |
| **Next.js 14 (App Router)** | Routing, layouts, and page structure |
| **TypeScript** | Type-safe components, data model, and API layer |
| **Tailwind CSS** | Styling, theming, and responsive layout |
| **sonner** | Toast notifications |
| **lucide-react** | Icon set |
| **@fontsource/oswald & @fontsource/inter** | Self-hosted display/body fonts (no external font fetch at build time) |
| **React Context + localStorage** | Today's Plan / Saved state, persisted client-side |

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables (optional)

The app reads workouts from the live FitLog API by default. To point it at a
different endpoint (e.g. for local testing), create a `.env.local`:

```bash
NEXT_PUBLIC_API_BASE=https://your-api.example.com/api/fitlog
```

### Build

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
src/
  app/
    page.tsx                # Home: hero + library
    workouts/[id]/page.tsx   # Workout detail
    my-plan/page.tsx         # Today's Plan / Saved
    not-found.tsx            # 404
    layout.tsx, globals.css
  components/                # Navbar, Footer, Hero, cards, tabs, etc.
  context/plan-context.tsx   # Plan/Saved state + localStorage
  lib/
    api.ts                   # Fetch + field-normalization layer
    types.ts                 # Shared Workout / PlanItem types
public/
  logo.png, banner.png, assets/  # Provided design assets + fallback art
```

---

## 📱 Responsive Design

Every page — navbar, hero, library grid, detail layout, and the plan page —
is built mobile-first with Tailwind's responsive utilities and verified across
mobile, tablet, and desktop breakpoints.
