# AGENTS.md — Portfolio + Blog CMS

This file is the authoritative guide for any AI agent (Claude, Copilot, Cursor, etc.) working on
this codebase. Read it fully before making any changes. It describes the project architecture,
coding conventions, the planned Node.js backend, and the rules agents must follow.

---

## 1. Project Overview

This is **Mohammad Amaan Lari's personal portfolio** — a 3-page React frontend with a Node.js
backend that powers a mini Blog CMS. The system has two distinct parts:

| Layer    | Tech                                   | Purpose                                      |
|----------|----------------------------------------|----------------------------------------------|
| Frontend | React 19 + Vite + React Router DOM v7  | Home, Resume, Blog pages                     |
| Backend  | Node.js + Express                      | Blog CRUD API, auth, image upload, CMS admin |
| Database | PostgreSQL (primary) + Redis (cache)   | Blog post storage + read caching             |
| Storage  | Cloudinary or local /uploads           | Blog cover images and embedded media         |

The frontend lives in `/` (this directory). The backend will live in `/server` (to be created).

---

## 2. Monorepo Layout

```
portfolio/                         ← React frontend (Vite)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx + .css
│   │   └── Footer.jsx + .css
│   ├── pages/
│   │   ├── Home.jsx + .css        ← Landing page
│   │   ├── Resume.jsx + .css      ← Full professional resume
│   │   └── Blog.jsx + .css        ← Blog listing (consumes backend API)
│   ├── App.jsx                    ← BrowserRouter + Routes
│   ├── main.jsx
│   └── index.css                  ← Global design tokens and animations
├── index.html
├── vite.config.js
├── package.json
└── AGENTS.md                      ← You are here

server/                            ← Node.js backend (to be created)
├── src/
│   ├── routes/
│   │   ├── posts.js               ← Public blog CRUD routes
│   │   └── admin.js               ← Protected CMS admin routes
│   ├── controllers/
│   │   ├── postsController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── auth.js                ← JWT verification middleware
│   │   ├── errorHandler.js        ← Global error handler
│   │   └── validate.js            ← Request validation (Joi or Zod)
│   ├── models/
│   │   └── Post.js                ← DB model / query layer (pg or Prisma)
│   ├── services/
│   │   ├── cache.js               ← Redis read-through caching
│   │   └── upload.js              ← Image upload (Cloudinary SDK)
│   ├── config/
│   │   └── db.js                  ← PostgreSQL connection pool
│   └── app.js                     ← Express app setup
├── server.js                      ← Entry point (starts HTTP server)
├── .env.example                   ← All required env vars documented
└── package.json
```

---

## 3. Frontend — Coding Conventions

### 3.1 Design System (do not break these)

All design tokens are CSS custom properties defined in `src/index.css`. Never hardcode colors,
fonts, or spacing values in component files. Always reference tokens:

```css
/* ✅ Correct */
color: var(--accent);
font-family: var(--serif);

/* ❌ Wrong */
color: #1a3a2a;
font-family: 'DM Serif Display', serif;
```

**Token reference:**

| Token           | Value       | Usage                              |
|-----------------|-------------|------------------------------------|
| `--bg`          | `#f5f3ee`   | Page background                    |
| `--surface`     | `#eceae4`   | Card / section backgrounds         |
| `--ink`         | `#0f0f0d`   | Primary text                       |
| `--ink-2`       | `#3a3a36`   | Secondary text                     |
| `--ink-3`       | `#7a7a74`   | Muted text, labels                 |
| `--accent`      | `#1a3a2a`   | Primary accent (forest green)      |
| `--accent-light`| `#2d6b48`   | Hover state of accent              |
| `--accent-pale` | `#e8f0eb`   | Accent tint for hover backgrounds  |
| `--border`      | `#d4d1c8`   | Borders and dividers               |
| `--serif`       | DM Serif Display | Headlines                     |
| `--sans`        | DM Sans     | Body text                          |
| `--mono`        | DM Mono     | Labels, tags, code, metadata       |

### 3.2 Component Rules

- Each page/component has its own `.css` file co-located next to the `.jsx` file.
- No CSS Modules, no Tailwind, no styled-components — plain CSS with BEM-like class names.
- No inline `style={{}}` except for dynamic values (e.g., `animationDelay`).
- All animations use the pre-defined `.fade-up`, `.fade-up-2` … `.fade-up-6` utility classes
  defined in `index.css`. Do not add new keyframes without documenting them there.
- Components must be functional. No class components.
- All external links must have `target="_blank" rel="noreferrer"`.

### 3.3 Routing

React Router DOM v7 is used. Routes are defined in `src/App.jsx`:

```
/           → Home.jsx
/resume     → Resume.jsx
/blog       → Blog.jsx
/blog/:slug → BlogPost.jsx   ← to be created when blog posts are wired up
```

When adding the blog post detail page, create `/src/pages/BlogPost.jsx` and register the route
in `App.jsx`. Do not create nested routers.

### 3.4 Blog API Integration (Frontend Side)

Currently, `Blog.jsx` uses hardcoded `posts` array. When the backend is ready, replace with API
calls. Use a dedicated `src/api/` directory:

```
src/api/
├── client.js      ← base fetch wrapper (sets baseURL, handles errors)
└── posts.js       ← getAllPosts(), getPostBySlug(), etc.
```

Use the native `fetch` API — do not install axios. All API calls must handle loading and error
states explicitly. Never leave components in a silent failure state.

```js
// src/api/client.js — example pattern
const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`)
  return res.json()
}
```

The env var `VITE_API_URL` must be set in `.env.local` for development and as an environment
variable in production. Never hardcode the backend URL.

---

## 4. Backend — Node.js Blog CMS

### 4.1 Stack Decisions

| Concern           | Choice                  | Reason                                              |
|-------------------|-------------------------|-----------------------------------------------------|
| Framework         | Express 5               | Minimal, familiar, async error handling built-in    |
| Database          | PostgreSQL via `pg`     | Structured blog data, relations, full-text search   |
| ORM / Query       | Raw `pg` with helpers   | Keep it simple; avoid Prisma overhead for this scope|
| Caching           | Redis (`ioredis`)       | Cache public post listings and individual posts     |
| Auth              | JWT (`jsonwebtoken`)    | Stateless admin auth — no sessions needed           |
| Validation        | Zod                     | Schema validation on all incoming request bodies    |
| Image upload      | Cloudinary SDK          | Free tier sufficient; avoid storing blobs in Postgres|
| Markdown          | `marked` + `DOMPurify`  | Parse and sanitise blog post markdown body          |

### 4.2 Database Schema

```sql
-- Posts table
CREATE TABLE posts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,
  excerpt     TEXT NOT NULL,
  body        TEXT NOT NULL,           -- Raw markdown
  body_html   TEXT NOT NULL,           -- Pre-rendered HTML (generated on write)
  category    TEXT NOT NULL,
  tags        TEXT[] DEFAULT '{}',
  cover_url   TEXT,                    -- Cloudinary URL
  featured    BOOLEAN DEFAULT FALSE,
  published   BOOLEAN DEFAULT FALSE,   -- Draft vs published
  read_time   TEXT,                    -- e.g. "8 min read" (computed on write)
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Slug must be URL-safe: lowercase, hyphens only, no spaces
-- Example: 'rfid-bulk-scanning-tracki8'

CREATE INDEX idx_posts_slug      ON posts (slug);
CREATE INDEX idx_posts_published ON posts (published);
CREATE INDEX idx_posts_category  ON posts (category);
CREATE INDEX idx_posts_featured  ON posts (featured, published);
```

No user table needed — there is a single admin user authenticated via a hardcoded env secret
(`ADMIN_PASSWORD`). JWT is issued on successful login. No registration endpoint.

### 4.3 API Routes

#### Public Routes (no auth required)

| Method | Path                    | Description                                           |
|--------|-------------------------|-------------------------------------------------------|
| GET    | `/api/posts`            | List all published posts (paginated, filterable)      |
| GET    | `/api/posts/featured`   | List published + featured posts only                  |
| GET    | `/api/posts/:slug`      | Get single published post by slug                     |
| GET    | `/api/posts/category/:cat` | Filter published posts by category                |

Query params for `/api/posts`:
- `?page=1&limit=10` — pagination (default: page 1, limit 20)
- `?category=Engineering` — filter by category
- `?q=kafka` — full-text search on title + excerpt

#### Admin Routes (JWT required)

| Method | Path                    | Description                                           |
|--------|-------------------------|-------------------------------------------------------|
| POST   | `/api/admin/login`      | Exchange password for JWT                             |
| GET    | `/api/admin/posts`      | List ALL posts (including drafts)                     |
| POST   | `/api/admin/posts`      | Create a new post                                     |
| PUT    | `/api/admin/posts/:id`  | Update a post by ID                                   |
| DELETE | `/api/admin/posts/:id`  | Delete a post by ID                                   |
| PATCH  | `/api/admin/posts/:id/publish`   | Toggle published status            |
| PATCH  | `/api/admin/posts/:id/feature`   | Toggle featured status             |
| POST   | `/api/admin/upload`     | Upload a cover image → returns Cloudinary URL         |

#### Response Shape

All API responses use a consistent envelope:

```json
// Success
{ "success": true, "data": { ... } }

// List with pagination
{ "success": true, "data": [ ... ], "meta": { "page": 1, "limit": 20, "total": 6 } }

// Error
{ "success": false, "error": "Post not found" }
```

Never return raw database rows. Always map to a clean response DTO.

### 4.4 Caching Strategy

Use Redis for read-through caching on public endpoints only. Admin writes must always invalidate
the relevant cache keys.

| Cache Key Pattern            | TTL     | Invalidated on           |
|------------------------------|---------|--------------------------|
| `posts:list`                 | 5 min   | Any post create/update/delete/publish |
| `posts:featured`             | 5 min   | Featured toggle          |
| `posts:slug:{slug}`          | 10 min  | Update or delete of that post |
| `posts:category:{category}`  | 5 min   | Any post change          |

Cache miss → fetch from Postgres → write to Redis → return. Never cache admin (protected) routes.

### 4.5 Auth Flow

```
POST /api/admin/login
Body: { "password": "..." }

1. Compare body.password against ADMIN_PASSWORD env var (use bcrypt.compare if hashed)
2. On match → sign JWT: { role: 'admin' }, secret: JWT_SECRET, expiresIn: '7d'
3. Return: { "success": true, "data": { "token": "eyJ..." } }

Client stores token in memory (not localStorage). Sends as:
Authorization: Bearer <token>

Middleware (auth.js) verifies token on every /api/admin/* route.
```

### 4.6 Read Time Calculation

Compute `read_time` on the server when a post is created or updated. Do not let the client send
this value.

```js
function computeReadTime(markdownBody) {
  const words = markdownBody.trim().split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return `${minutes} min read`
}
```

### 4.7 Slug Generation

Auto-generate slug from title on create if not explicitly provided. Slug must be:
- Lowercase
- Hyphens instead of spaces
- Alphanumeric + hyphens only (strip all other characters)
- Unique (check DB before inserting; append `-2`, `-3` if collision)

```js
function slugify(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}
```

### 4.8 Environment Variables

Document every env var in `server/.env.example`. Agents must never hardcode secrets.

```bash
# server/.env.example

# Server
PORT=4000
NODE_ENV=development

# PostgreSQL
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio_db

# Redis
REDIS_URL=redis://localhost:6379

# Auth
JWT_SECRET=change_this_to_a_long_random_string
ADMIN_PASSWORD=change_this_too

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# CORS
CORS_ORIGIN=http://localhost:5173
```

---

## 5. Agent Rules & Constraints

These rules apply to every AI agent working in this repository. Follow them without exception.

### 5.1 General

- **Read before writing.** Always read the relevant source files before modifying them. Never
  assume file contents from memory.
- **One concern per file.** Do not add backend logic to frontend files or vice versa.
- **No new dependencies without justification.** If you add a package, add a comment in the
  relevant `package.json` explaining why. Prefer packages already in the stack.
- **No `console.log` in committed code.** Use a proper logger on the backend (e.g. `pino`).
  Remove all debug logs before finalising.
- **Never commit secrets.** If you need to show a secret value in an example, use a placeholder:
  `your_jwt_secret_here`.

### 5.2 Frontend Agents

- Do not install Tailwind, styled-components, or any CSS-in-JS library. The design system is
  plain CSS with custom properties.
- Do not change font families, color tokens, or spacing scales without explicit instruction.
- Do not touch `Resume.jsx` content (names, bullet text, dates, numbers) without explicit
  instruction — this is production resume data.
- When connecting the Blog page to the backend API, preserve the existing component structure.
  Replace the hardcoded `posts` array with an API call but keep all JSX and CSS identical.
- The Blog page currently shows a `handlePostClick` alert for "coming soon" posts. When adding
  individual blog post pages (`/blog/:slug`), create a new `BlogPost.jsx` page and remove the
  alert — do not add new alerts or placeholder UI.

### 5.3 Backend Agents

- All route handlers must be `async`. Use `try/catch` or Express 5's built-in async error
  propagation. Never leave unhandled promise rejections.
- All incoming request bodies must be validated with Zod before touching the database.
- Never use `SELECT *` in SQL queries. Always select only the columns needed for the response DTO.
- Every database query must go through the connection pool in `config/db.js`. Never open a
  standalone `pg.Client` in a controller.
- Redis cache writes must never block the response. If Redis is down, the API must still work
  (degrade gracefully — log the error, skip cache, return from DB).
- Admin routes must check the JWT on every request via the `auth.js` middleware. Never skip auth
  for convenience.
- The `body_html` column must be generated server-side using `marked` + `DOMPurify`. Never
  accept raw HTML from the client.
- Slug uniqueness must be enforced at the DB level (UNIQUE constraint) and checked in the
  service layer with a friendly error message before the DB throws.

### 5.4 Database Agents

- Never drop or truncate tables in migration scripts without an explicit `-- DESTRUCTIVE` comment
  at the top of the file.
- Every migration must have a corresponding rollback (`down`) script.
- Schema changes must be backward compatible unless explicitly marked as breaking.
- Always add indexes for columns used in `WHERE`, `ORDER BY`, or `JOIN` clauses.

### 5.5 What Agents Must NOT Do

- ❌ Do not refactor the entire codebase in one pass. Make targeted, minimal changes.
- ❌ Do not change the visual design (colors, fonts, spacing, layout) without explicit instruction.
- ❌ Do not add authentication to the public-facing frontend — the admin CMS is backend-only.
- ❌ Do not store JWTs in `localStorage` — keep them in memory on the client.
- ❌ Do not add a user registration system. There is one admin, authenticated by env secret.
- ❌ Do not use `eval()` or `innerHTML` with unsanitised content anywhere.
- ❌ Do not install `moment.js` — use native `Intl.DateTimeFormat` or `date-fns` if needed.
- ❌ Do not use `*` wildcard in CORS configuration in production.

---

## 6. Development Setup

### Frontend

```bash
cd portfolio        # this directory
npm install
npm run dev         # starts Vite at http://localhost:5173
```

### Backend (once created)

```bash
cd server
npm install
cp .env.example .env   # fill in your values
npm run dev            # starts Express at http://localhost:4000
```

### Database (local)

```bash
# Start PostgreSQL and Redis (Docker recommended)
docker run -d --name pg -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres:16
docker run -d --name redis -p 6379:6379 redis:7

# Run migrations (once migration scripts exist)
node server/scripts/migrate.js up
```

### Connecting Frontend to Backend in Development

Add a `.env.local` file in the portfolio root:

```bash
VITE_API_URL=http://localhost:4000
```

Vite will inject this at build time. Never commit `.env.local`.

---

## 7. File Naming Conventions

| Type                  | Convention              | Example                         |
|-----------------------|-------------------------|---------------------------------|
| React pages           | PascalCase `.jsx`       | `BlogPost.jsx`                  |
| React components      | PascalCase `.jsx`       | `PostCard.jsx`                  |
| CSS files             | Same name as component  | `PostCard.css`                  |
| Backend routes        | camelCase `.js`         | `posts.js`                      |
| Backend controllers   | camelCase `.js`         | `postsController.js`            |
| Backend middleware    | camelCase `.js`         | `auth.js`                       |
| Migration scripts     | `NNN_description.sql`   | `001_create_posts.sql`          |
| Environment files     | `.env.example` (committed), `.env` / `.env.local` (gitignored) |

---

## 8. Git Conventions

- Branch naming: `feature/blog-api`, `fix/post-slug-collision`, `chore/add-redis-cache`
- Commit messages: imperative mood, present tense: `Add Redis cache for post listings`
- Never commit directly to `main`. Use branches + PR even when working solo.
- The following are always gitignored: `node_modules/`, `dist/`, `.env`, `.env.local`,
  `*.log`, `uploads/`

---

## 9. Current Status & What's Next

| Status | Item                                              |
|--------|---------------------------------------------------|
| ✅ Done | React frontend — Home, Resume, Blog pages         |
| ✅ Done | Navbar, Footer, routing, design system            |
| ✅ Done | Blog page with hardcoded posts + category filter  |
| ⬜ Todo | Create `/server` — Express app scaffold           |
| ⬜ Todo | PostgreSQL schema + migration scripts             |
| ⬜ Todo | Blog CRUD API (`/api/posts`)                      |
| ⬜ Todo | Admin auth + protected CMS routes (`/api/admin`)  |
| ⬜ Todo | Redis caching layer                               |
| ⬜ Todo | Cloudinary image upload integration               |
| ⬜ Todo | Wire Blog.jsx to real API (replace hardcoded data)|
| ⬜ Todo | Individual blog post page (`/blog/:slug`)         |
| ⬜ Todo | Deploy: frontend on Vercel, backend on Railway    |

---

*Last updated: April 2026 · Mohammad Amaan Lari*
