# Hugolify theme

[![banner](https://github.com/user-attachments/assets/a74f1b37-e24f-4762-971d-fe7824b23cb8)](https://www.hugolify.io/)

## Features

* 100/100 Google PageSpeed Insights
* Accessibility friendly
* [Blocks](https://www.hugolify.io/docs/blocks/)
* [Forms](https://www.hugolify.io/docs/getting-started/form/) (Netlify or other)
* Lazy loading and JS defer
* [PurgeCSS](https://www.hugolify.io/docs/getting-started/purgecss/)
* Responsive design
* Responsive images (and WebP)
* [Search](https://www.hugolify.io/docs/getting-started/search/)
* SEO friendly
* [Shortcodes](https://www.hugolify.io/docs/shortcodes/)

## Styling

hugolify-theme contains no CSS or SASS. Styling is provided by a separate **styling module**, swappable without touching the theme or templates.

The default module is `hugolify-theme-bootstrap` (Bootstrap 5 + SASS). It can be replaced by `hugolify-theme-design-system` (vanilla CSS) via `module.replacements` in the site config.

See [STYLING.md](STYLING.md) for the full architecture and how to switch modules.

## Framework front

* Bootstrap (via hugolify-theme-bootstrap)

## Plugins

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

Use Hugolify starter template

https://github.com/Hugolify/hugolify-template/

Or add as a Hugo Module

Edit `config/_default/module.yaml` to install the `hugolify-theme` module:

```yml
imports:
  - path: github.com/hugolify/hugolify-theme
```

## Demo

https://demo.hugolify.io/

## Documentation

https://www.hugolify.io/docs/

## Licensing

Hugolify is free for personal or commercial projects (MIT license)
