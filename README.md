# Bliztic

Ownership group website. The homepage is the Bliztic Group static design, served by Next.js. Inquire still posts through Resend.

## Information architecture

| Path | Page | Purpose |
| --- | --- | --- |
| `/` | Home | New Bliztic Group homepage. Octopus artwork, operating principles, Wake, contact |
| `/gtm-fund` | GTM Fund | Same chrome as the homepage. What the fund is, who it is for, what is covered, what qualify means |
| `/acquire` | Acquire | Same chrome as the homepage. What Bliztic looks for, how a conversation starts, how we operate |
| `/qualify` | Inquire | Same chrome as the homepage. Short form. `?intent=fund` and `?intent=acquire` prefill intent |
| `/privacy` | Privacy | How inquire details are used |
| `/terms` | Terms | How to read this site |

Visible labels never show hyphens. URL paths may keep them when the framework needs them.

Legacy shortcuts: `/fund` sends people to `/gtm-fund`. `/contact` sends people to `/qualify`.

## Homepage assets

The header, favicon, and Open Graph image use the historical white Bliztic B mark at `/LIZTIC_logo_white.webp` (also stored as `Assets/LIZTIC_logo_white.webp`). Hero and contact use `/assets/octopus.webp` with a `/assets/octopus.jpg` fallback. There are no `/media/*.mp4` files. The homepage does not request missing video.

Styles live in `src/app/home.css`. Behaviour lives in `public/home.js`. Markup lives in `src/content/home.html` and is rendered at `/`. Inquire reuses that chrome through `GroupShell`.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run check:copy
npm run build
npm start
```

`npm run check:copy` fails if `src/lib/copy.ts` contains a hyphen, en dash, or em dash.

## Inquire backend

The form posts JSON to `POST /api/inquire`:

```json
{
  "intent": "fund",
  "company": "",
  "name": "",
  "email": "",
  "phone": "",
  "note": "",
  "sizeOrStage": ""
}
```

`intent` is `fund`, `acquire`, or `other`. `phone` is required. `note` is only used when intent is `other`, and even then it is optional.

On a valid submit, `POST /api/inquire` sends a notification email with Resend. Set these server env vars (never commit the API key):

| Variable | Required | Default |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes in production | none. Local, preview, and other non production runs log the payload instead when this is unset |
| `INQUIRE_NOTIFY_TO` | No | `grant@dev.bliztic.com`. Comma separated addresses become multiple Resend recipients |
| `RESEND_FROM` | No | `Bliztic <onboarding@resend.dev>` |

For Preview, set `RESEND_API_KEY` if you want a real email. If it is unset, the route still accepts a valid inquire and logs the payload. `INQUIRE_NOTIFY_TO` and `RESEND_FROM` are optional and use the defaults above.

Production should set `RESEND_FROM` to a verified Bliztic domain sender. The onboarding address is only for local and early tests.

If Resend rejects the send, the route returns a safe `{ "ok": false }` with status 502. Missing `RESEND_API_KEY` in production returns 500. The API key is never logged.

This repo still has a `supabase/` folder if you want to persist submissions.
