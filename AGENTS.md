# AGENTS.md

## Project Summary
This repo is a static, single-page academic website for a PhD student in Maya archaeology. It is hosted on GitHub Pages and highlights research, CV, and upcoming talks.

## Stack And Structure
- Static HTML/CSS/JS only. No build step or package manager.
- Main entry: `index.html`
- Styles: `styles.css`
- Behavior (tab navigation, section toggling): `script.js`
- Assets (images, logo, PDFs): `assets/`
- GitHub Pages uses the root `index.html`.

## How To Run/Preview
- Open `index.html` in a browser.
- Optional local server for relative asset testing:
  - `python -m http.server` from repo root.

## Editing Content
- Page sections are in `index.html` with `section.route` IDs:
  - `home`, `research`, `cv`, `presentations`, `teaching`, `contact`
- Update text directly in the relevant section.
- Navigation buttons use `data-target` that must match section IDs.

## Updating CV And Talks
- CV link in the home section points to a PDF in `assets/`.
- “Presentations” section in `index.html` is the canonical list of upcoming talks.
- Keep dates explicit (e.g., "March 12, 2026") and in chronological order.

## Images And Assets
- Place new images under `assets/` (prefer subfolders like `assets/photos/`).
- Use web-friendly formats: JPG/PNG/WebP.
- Include meaningful `alt` text for accessibility.
- Keep filenames ASCII and avoid spaces.

## Style/UX Guidelines
- Maintain the current visual style (colors, typography, spacing).
- Ensure contrast and legibility for academic content.
- Avoid heavy animations; this is a professional academic site.

## Accessibility
- Keep the skip link (`a.skip`) intact.
- Use semantic headings in order (`h1` then `h2`, etc.).
- Provide `alt` text for all non-decorative images.
- Preserve keyboard navigation for tabs.

## Deploying
- GitHub Pages serves from the repo root.
- No build artifacts or generated files required.

## What Not To Do
- Do not add frameworks or a build pipeline unless requested.
- Do not remove the tab routing behavior in `script.js`.
- Do not delete placeholder comments unless the content is replaced.
