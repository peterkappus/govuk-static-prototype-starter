# GOV.UK static prototype starter

Bare **Eleventy + GOV.UK Frontend** starter for static prototypes that look like GOV.UK services but are **not** hosted as official government / GOV.UK products.

Clone this repo, rename the service in `src/_data/site.js`, and replace the home page copy.

---

## Quick start

```bash
npm install
npm start
```

Open [http://localhost:8080](http://localhost:8080).

```bash
npm run build   # writes static output to _site/
```

---

## Hard requirements (always)

1. **Use the GOV.UK Design System / GOV.UK Frontend** for layout, typography scale, spacing, components, and patterns.
2. **Do not use the crown** in the header — use `govukGenericHeader` with a text product name.
3. **Do not use the GDS Transport typeface.** Load **Schibsted Grotesk from Google Fonts**, with stack `"Schibsted Grotesk", arial, sans-serif`.
4. **Do not show crown copyright / crest branding in the footer.** Hide footer crown artwork; set `contentLicence: null`; write your own disclaimer — **do not mention GOV.UK** in footer chrome as if this were an official service.
5. **Build with Eleventy (11ty)** and ship a **static site** (`_site/`).
6. **Default host: AWS Amplify.** Keep `amplify.yml` in the repo (Node 20, `npm ci`, `npm run build`, publish `_site/`).

---

## Configure the prototype

Edit `src/_data/site.js`:

| Field | Purpose |
| --- | --- |
| `appSlug` | Short kebab-case id for `utm_source` on contact / attribution links |
| `serviceName` / `title` | Header and document titles |
| `description` | Meta description |
| `phase` | Phase banner tag (e.g. Alpha) |
| `gaMeasurementId` | GA4 id (`G-…`) to enable analytics; leave `""` to disable |
| `contactUrl` | Base contact form URL (default Peter’s contact page) |

**Report a problem** links go to:

`https://www.peterkappus.com/contact?utm_source=<appSlug>`

Do **not** default to GitHub Issues for feedback.

---

## Stack

| Layer | Choice |
| --- | --- |
| Generator | Eleventy 3 + Nunjucks |
| UI | `govuk-frontend` |
| Font | Schibsted Grotesk (Google Fonts) |
| CSS | Sass compiled in `eleventy.before` |
| Hosting | AWS Amplify via `amplify.yml` |

### Layout building blocks

- **Header:** `govukGenericHeader` (not crown `govukHeader`)
- **Nav:** `govukServiceNavigation`
- **Phase:** `govukPhaseBanner` with an honest prototype disclaimer
- **Footer:** `govukFooter` with crown/crest CSS-hidden and `contentLicence: null`
- **Start CTA:** green start button (`isStartButton: true`) on the home page

### Sass bootstrap

```scss
@use "govuk/index" as * with (
  $govuk-assets-path: "/assets/",
  $govuk-font-family: ("Schibsted Grotesk", arial, sans-serif),
  $govuk-global-styles: true
);

.govuk-footer__crown,
.govuk-footer__copyright-logo {
  display: none;
}
```

### Eleventy wiring (non-obvious)

- Nunjucks loads `src/_includes` **and** `node_modules/govuk-frontend/dist` so macros resolve.
- Sass compiles on `eleventy.before` so `--serve` picks up style changes.
- Passthrough-copy GOV.UK assets and `govuk-frontend.min.js`; call `initAll()` at the end of `base.njk`.

### Amplify

`amplify.yml` is required by default. In Amplify Console: Host web app → connect the GitHub repo → it picks up the file automatically.

---

## Product / trust conventions

1. Say it is **not an official government service** (phase banner + footer).
2. Prefer Design System patterns over invention (contents lists, sparingly used tags, etc.).
3. GOV.UK Frontend **≠** analytics — GA is optional via `gaMeasurementId`; add cookie consent before enabling GA where required.
4. Watch `[hidden]` vs GOV.UK `display: block` overrides on custom empty/error states.
5. Amplify/CloudFront can cache assets for a long time — hard-refresh or invalidate after JS-heavy deploys if behaviour looks stuck.
6. Keep the starter **content-agnostic** — add domain models only when the product needs them.

---

## New-app checklist

- [ ] Set `appSlug`, `serviceName`, description, phase in `src/_data/site.js`
- [ ] Optionally set `gaMeasurementId`
- [ ] Confirm Schibsted Grotesk Google Fonts links + Sass font stack
- [ ] Confirm footer crown hidden, `contentLicence: null`, no official-service branding
- [ ] Confirm “Report a problem” uses `contact?utm_source=<appSlug>`
- [ ] Replace home H1, lead paragraph, and start button `href`
- [ ] Push to GitHub and connect Amplify

---

## What this is *not*

- Permission to use the crown or imply government ownership of the prototype
- A substitute for accessibility, cookie, or production-service standards
