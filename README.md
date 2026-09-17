# AI Agent Workshop website

A static multi-page site with no build step.

| Page | What's on it |
|---|---|
| `index.html` | Hero, why attend, agenda summary, example agents |
| `agenda.html` | Full timeline with what happens in each session |
| `build.html` | The Codex/Claude + Skills + MCP approach, detailed example agents, prep checklist |
| `faq.html` | Grouped FAQ |
| `register.html` | Registration form (`?agent=refinement` / `test` / `bug` preselects a choice) |

Shared files: `assets/styles.css`, `assets/site.js` (nav, footer, form, calendar), `assets/config.js` (event details).

## Run locally
Open `index.html` in a browser, or run `python3 -m http.server 8000` in this folder.

## Edit event details
In `assets/config.js`, edit `CONFIG` for the name, host, start time, venue, city, fee, seats, cost, closing date, hashtag and contact email. Edit `AGENDA` for the sessions. Times are calculated from `start`.

## Registration
- **Built-in form:** set `formEndpoint` to a Formspree URL (for example `https://formspree.io/f/xxxx`) or a Google Apps Script web app that writes to a Sheet.
- **External page (Luma or Google Form):** set `externalRegisterUrl`.
- If both are empty, submitting opens an email to `contactEmail`.

## LinkedIn preview
1. Export the poster as `og-image.png` (1200×627) and put it next to `index.html`.
2. Replace `https://YOUR-DOMAIN/` in the `og:` meta tags with the live URL.
3. Check the preview with https://www.linkedin.com/post-inspector/

## Deploy
Use Netlify Drop (drag the folder in), Vercel (`vercel`), or GitHub Pages (push and enable Pages).
