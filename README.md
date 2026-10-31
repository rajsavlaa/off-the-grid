# OFF THE GRID — starter website

A responsive, dark-futuristic personal internet playground built with plain HTML, CSS and JavaScript.

## Run it locally
1. Extract the ZIP.
2. Open `index.html` in a modern browser.
3. For best results, use a local static server or deploy to Netlify.

## Publish free with Netlify
1. Create a GitHub account and a new repository.
2. Upload `index.html`, `style.css`, `app.js`.
3. Sign in to Netlify and choose **Add new site → Import an existing project**.
4. Connect the GitHub repository and deploy. No build command is needed; publish directory is `/`.
5. Netlify gives you a public `*.netlify.app` address. You can later connect a custom domain.

## Included in this first version
- Responsive mobile-first OFF THE GRID landing page.
- Arcade cards with starter game links.
- Local 10K step logger, progress bar, 14-day calendar, streak and personal best.
- PS5 collection section.
- Random discovery button and discovery links.
- YouTube channel uploads embed and channel link.
- Achievements and secret-room interaction.
- Starter Control Room for adding games, PS5 titles and discovery links.

## Important limitations before public launch
This is **Version 1 / front-end prototype**. It is interactive, but the 10K tracker and admin changes are stored in the visitor's own browser using localStorage. They are NOT shared between visitors or devices. There are no real user accounts, public leaderboard, shared community totals, or secure admin authentication yet.

The demo admin key is `gridmode` in `app.js`. It is visible in browser source and is not secure. Do not use this as a real private admin login or put sensitive data here.

For the real public 10K Club, connect Supabase (authentication + database + row-level security) and replace local storage with authenticated server-backed entries. A public leaderboard should use opt-in display names and validated daily records.

## Customise
- Change the admin demo password near the top of `app.js` (only for local demo use).
- Change the default game and discovery links in `index.html`.
- Change the YouTube channel URL in `index.html`.
- Edit colours and typography in `style.css` under `:root`.
