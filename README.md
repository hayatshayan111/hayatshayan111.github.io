
# Purrfect Care — Cat Care Website

A simple, accessible, multi-page static website with two interactive tools (Feeding Calculator and Litter Log). Designed for GitHub Pages.

## Pages
- Home (`index.html`)
- Care Basics (`care.html`)
- Nutrition (`nutrition.html`)
- Health & Vet (`health.html`)
- Behavior & Training (`behavior.html`)
- Tools (`tools.html`) — Feeding Calculator + Litter Log (localStorage)
- About (`about.html`)
- Contact (`contact.html`) — uses Formspree

## Deploy on GitHub Pages
1. Create a repository named `<your-username>.github.io`.
2. Upload all files in this folder to the repo root (or push via git).
3. Go to **Settings → Pages**. If needed, choose **Deploy from branch**, branch `main`, folder `/root`.
4. Your site will appear at `https://<your-username>.github.io` within a minute or two.

## Contact form (Formspree)
- Sign in at https://formspree.io/ and create a form to get an endpoint like `https://formspree.io/f/abcdwxyz`.
- Open `contact.html` and replace `your_form_id` with your Formspree form ID.

## Customize
- Edit text within each HTML page.
- Styles: `assets/css/styles.css`
- Scripts: `assets/js/main.js`, `assets/js/tools.js`
- Icons: `favicon.svg`
- SEO: `sitemap.xml`, `robots.txt` (replace `<your-username>`).

## Accessibility
- Semantic HTML, skip link, keyboard focus styles, and color contrast ≥ 4.5:1.
- Forms have labels; dynamic regions use `aria-live` when applicable.

---

Built as a student project.
