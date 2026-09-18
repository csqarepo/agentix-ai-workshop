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

## Registration → Google Sheet
Every submission is saved as a new row in a Google Sheet, with Status set to **Pending** so you can review it.

One-time setup (about 5 minutes):
1. Create a Google Sheet, for example "AgentiX Registrations", signed in with the account that should own the data.
2. In the Sheet, open **Extensions → Apps Script**. Delete the sample code and paste in everything from `google-apps-script/Code.gs`. Save.
3. Click **Deploy → New deployment**. For type, choose **Web app**. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy** and approve the permissions Google asks for.
5. Copy the **Web app URL** (it ends in `/exec`) and paste it as `formEndpoint` in `assets/config.js`.
6. Open that URL in a browser. You should see `"AgentiX registration endpoint is running"`.
7. Submit a test registration on the site. A "Registrations" tab appears in the Sheet with the row.

If you edit `Code.gs` later, use **Deploy → Manage deployments → Edit → New version** so the same URL keeps working.

Columns saved: Submitted at, Status, Full name, Work email, Company, Role, AI experience, Preferred agent, LinkedIn, Teammates, Dietary needs, Consent, Duplicate email (flags a repeat email), Notes (for your team), Phone number, AI workflow/automation/agent experience, and AI usage statement.

Status has a dropdown: Pending, Approved, Rejected, Paid, Ticket sent.

If `formEndpoint` is empty or saving fails, the visitor sees an error and can try again. The success message only shows after the row is saved.

To send everyone to an external page instead (Luma or Google Form), set `externalRegisterUrl`.

## LinkedIn preview
1. Export the poster as `og-image.png` (1200×627) and put it next to `index.html`.
2. Replace `https://YOUR-DOMAIN/` in the `og:` meta tags with the live URL.
3. Check the preview with https://www.linkedin.com/post-inspector/

## Deploy
Use Netlify Drop (drag the folder in), Vercel (`vercel`), or GitHub Pages (push and enable Pages).
