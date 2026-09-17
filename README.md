# AI Agent Workshop website

A single-file static site (`index.html`) with no build step.

## Run locally
Open `index.html` in a browser, or run `python3 -m http.server 8000` in this folder.

## Edit event details
At the bottom of `index.html`, edit `CONFIG` for the name, host, start time, venue, seats, cost, closing date, hashtag and contact email. Edit `AGENDA` for the sessions. Times are calculated from `start`.

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
