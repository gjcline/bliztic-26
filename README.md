# Bliztic

Ownership group website. Four pages. Quiet on purpose.

This is not the old sales engine site. There is no Revenue Division as a Service homepage, no portfolio, and no `/dev` page.

## Information architecture

| Path | Page | Purpose |
| --- | --- | --- |
| `/` | Home | Wordmark, one positioning line, quiet links |
| `/gtm-fund` | GTM Fund | What the fund is, who it is for, what is covered, what qualify means |
| `/acquire` | Acquire | What Bliztic looks for, how a conversation starts, how we operate |
| `/qualify` | Inquire | Short form. `?intent=fund` and `?intent=acquire` prefill intent |

Visible labels never show hyphens. URL paths may keep them when the framework needs them.

Legacy shortcuts: `/fund` sends people to `/gtm-fund`. `/contact` sends people to `/qualify`.

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
| `INQUIRE_NOTIFY_TO` | No | `grant@dev.bliztic.com` |
| `RESEND_FROM` | No | `Bliztic <onboarding@resend.dev>` |

Production should set `RESEND_FROM` to a verified Bliztic domain sender. The onboarding address is only for local and early tests.

If Resend rejects the send, the route returns a safe `{ "ok": false }` with status 502. Missing `RESEND_API_KEY` in production returns 500. The API key is never logged.

This repo still has a `supabase/` folder if you want to persist submissions.
