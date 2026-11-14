# Content

Experience and projects are plain JSON, loaded at build time by `src/lib/content.ts`.
Types live in `src/types.ts`.

## The one rule: append with the next id

Entries are stored **oldest → newest**. The oldest entry is `id: 1`; the newest has
the highest id. To add something, append it at the bottom with `id` = last id + 1.
The site sorts by `id` descending, so the newest shows first automatically.

## `experience.json`

| Field | Required | Notes |
|---|---|---|
| `id` | yes | Next number in sequence |
| `company` | yes | |
| `roles` | yes | `{ "title", "start", "end" }`, oldest → newest (newest role last). Dates are `"YYYY-MM"`; `end: null` means Present. An unknown month (`"2026-XX"`) renders as just the year |
| `highlights` | yes | Bullets. `**text**` renders bold |
| `companyUrl`, `location`, `type`, `tech` | no | `type`: `Full-time`, `Internship`, `Training`, `Freelance` |

## `projects.json`

| Field | Required | Notes |
|---|---|---|
| `id`, `title`, `description`, `tech` | yes | `description` is one line; it is what the home page shows |
| `details` | no | Extra bullets, shown on `/work` and `/about` |
| `status` | no | `Live`, `In progress`, `Archived` |
| `featured` | no | The newest 3 featured projects appear on the home page; all featured ones are emphasized on `/work` |
| `links` | no | `{ "github", "live", "caseStudy" }`; empty strings are ignored |
| `context`, `year` | no | Small label next to the title, e.g. `"Personal Project"`, `"2026"` |

## `opensource.json`

| Field | Required | Notes |
|---|---|---|
| `id`, `org`, `role`, `highlights` | yes | |
| `orgUrl`, `start`, `end` | no | Same date format as roles; a bare year (`"2023"`) is fine |

## Example: new project

```json
{
  "id": 6,
  "title": "Rate Limiter",
  "description": "Distributed token-bucket rate limiter backed by Redis.",
  "tech": ["Java", "Redis"],
  "status": "In progress",
  "featured": true,
  "links": { "github": "https://github.com/amaanlari/rate-limiter" }
}
```

## Example: new experience

```json
{
  "id": 4,
  "company": "Acme Corp",
  "location": "Bengaluru, India",
  "type": "Full-time",
  "roles": [{ "title": "Senior Software Engineer", "start": "2027-03", "end": null }],
  "highlights": ["Led the redesign of the order pipeline."],
  "tech": ["Java", "Kafka"]
}
```

## Confidentiality

Never name clients. Use generic descriptors such as "a global industrial
manufacturing client" or "a fintech client".
