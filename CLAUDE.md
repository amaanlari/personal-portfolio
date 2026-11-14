# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

This is a full-stack personal portfolio site with two independent deployable units:

- **Frontend** (`/` root): React 19 + Vite SPA, deployed to Vercel as a static site. `vercel.json` rewrites all routes to `index.html` for client-side routing.
- **Backend** (`/backend`): Express + MongoDB REST API, deployed separately to Vercel as a Node serverless function via `backend/vercel.json`.

The frontend calls the backend API at a base URL configured in the frontend source (not proxied via Vite). CORS in `backend/server.js` explicitly allows `https://amaanlari.me` and `http://localhost:5173`.

## Frontend Commands

Run from the repo root:

```bash
npm run dev        # start Vite dev server at localhost:5173
npm run build      # production build to dist/
npm run lint       # ESLint
npm run preview    # preview production build locally
```

## Backend Commands

Run from `/backend`:

```bash
npm run dev        # nodemon watch mode
npm start          # production start
npm run create-admin <username> <password>   # seed first admin user
```

Backend requires a `.env` file in `/backend` with:
- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — secret for signing JWT tokens
- `PORT` (optional, defaults to 5000)

## Key Frontend Structure

- `src/App.jsx` — app shell (fixed sidebar + main area) and router; routes: `/`, `/about`, `/work`, `/contact`, `/resume`, `/blog`, `/blog/:slug`, `/admin` (blog and admin are lazy-loaded; `/projects` and `/experience` redirect)
- `src/pages/` — one file per page (Home, About, Work, Contact, Resume, Blog, BlogPost, Admin)
- `src/components/` — Sidebar (bottom tab bar under 768px), Footer, ExperienceList, ProjectList, PostLines
- `src/index.css` — theme tokens (dark only) and shared layout/entry styles
- `content/*.json` — experience, projects and open source, stored oldest → newest by `id`; loaded and sorted newest-first by `src/lib/content.ts` (see `content/README.md`). Never name clients in content.
- `src/lib/usePosts.js` — fetches published posts from the blog API
- Each component/page has a co-located `.css` file

## Key Backend Structure

- `backend/server.js` — Express app entry; exports `app` for Vercel serverless
- `backend/routes/` — `blogRoutes.js` (public + admin blog CRUD), `authRoutes.js` (admin login)
- `backend/controllers/` — `blogController.js`, `authController.js`
- `backend/middleware/auth.js` — JWT `protect` middleware used on all `/api/admin/*` routes
- `backend/models/` — `BlogPost.js` (slug, title, excerpt, content, category, tags, featured, published), `Admin.js`

### API Routes

| Method | Path | Auth |
|--------|------|------|
| GET | `/api/posts` | public |
| GET | `/api/posts/:slug` | public |
| GET | `/api/admin/posts` | JWT |
| POST | `/api/admin/posts` | JWT |
| PUT | `/api/admin/posts/:id` | JWT |
| DELETE | `/api/admin/posts/:id` | JWT |
| POST | `/api/auth/login` | — |

`BlogPost.category` is an enum: `Engineering`, `Architecture`, `Infrastructure`, `Backend`.

## Blog Content

Blog posts are stored in MongoDB and rendered as Markdown via `react-markdown` + `remark-gfm` on the frontend. The `/admin` page is an authenticated CMS for creating and managing posts.
