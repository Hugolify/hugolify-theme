# Hugolify theme

[![banner](https://github.com/user-attachments/assets/a74f1b37-e24f-4762-971d-fe7824b23cb8)](https://www.hugolify.io/)

## Performance & SEO

* 100/100 Google PageSpeed Insights
* Lazy loading and JS defer
* PostCSS + [PurgeCSS](https://www.hugolify.io/docs/getting-started/purgecss/)
* Responsive images and WebP
* SEO friendly

## Content & UX

* Accessibility friendly
* [Blocks](https://www.hugolify.io/docs/blocks/)
* [Forms](https://www.hugolify.io/docs/getting-started/form/) (Netlify or other)
* Responsive design
* [Search](https://www.hugolify.io/docs/getting-started/search/)
* [Shortcodes](https://www.hugolify.io/docs/shortcodes/)

## Architecture

hugolify-theme provides **layouts, content types, i18n and archetypes only** — no CSS, no JavaScript.

Styling and JS are provided by a separate **styling module**, declared in the site config. This makes it possible to swap the entire CSS/JS layer without touching the theme or templates.

### Official modules

| Module | CSS | JS |
| --- | --- | --- |
| [hugolify-theme-bootstrap](https://github.com/hugolify/hugolify-theme-bootstrap) | Bootstrap 5 + SASS | Bootstrap 5 + Vanilla JS |
| hugolify-theme-design-system | Vanilla CSS / Design tokens | Vanilla JS |

### Custom styling

You can build your own styling layer in two ways:

**As a Hugo module** (`hugolify-theme-tailwind`, `hugolify-theme-bulma`…) — sharable, versionable, swappable via the site config:

```yaml
imports:
  - path: github.com/yourorg/hugolify-theme-tailwind
```

**Directly in the site** — add `assets/sass/` and `assets/js/` to your project. Hugo merges assets from all sources, so your files take priority over the module.

The contracts to respect in either case:

* CSS classes used by templates are semantic (`btn`, `col-small`, `modal`, `badge-primary`…) — no framework-specific names
* JS hooks are `js-*` CSS classes — no `data-framework-*` attributes
* JS entry point: `assets/js/main.js`
* SASS entry point: `assets/sass/main.sass` (or `main.scss` or `main.css`)

## JS libraries

* Chart.js
* CookieConsent
* LeafletJS OpenStreetMap
* SplideJS Carousel
* Tobii Lightbox
* Pagefind
* Rellax parallax

## Multilingual Support

* English
* French

## Install

Use the Hugolify starter template:

<https://github.com/Hugolify/hugolify-template/>

Or add as Hugo modules. Edit `config/_default/module.yaml`:

```yaml
imports:
  - path: github.com/hugolify/hugolify-theme
  - path: github.com/hugolify/hugolify-theme-bootstrap
```

To switch styling module, replace the second import:

```yaml
imports:
  - path: github.com/hugolify/hugolify-theme
  - path: github.com/hugolify/hugolify-theme-design-system
```

## Migration from v1

In v1, Bootstrap (CSS and JS) was bundled directly inside `hugolify-theme`. In v2, the theme is framework-agnostic — styling is provided by a separate module declared explicitly in the site config (see Install above).

Other breaking changes:

* JS hooks: `data-bs-toggle/target` → `class="js-*"` + `data-target`
* Grid classes: `col-md-*` → `col-small`, `col-medium`, `col-large`, `col-xsmall`
* Badge states: `text-bg-*` → `badge-*`

## Demo

<https://demo.hugolify.io/>

## Documentation

<https://www.hugolify.io/docs/>

## Licensing

Hugolify is free for personal or commercial projects (MIT license)
