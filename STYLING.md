# Styling architecture

hugolify-theme contains **no SASS or CSS**. All styling is delegated to an external **styling module**, swappable via `module.replacements`.

---

## Available styling modules

| Module | Technology | Use case |
|---|---|---|
| `hugolify-theme-bootstrap` | SASS + Bootstrap 5 | Default, production-ready |
| `hugolify-theme-design-system` | Vanilla CSS + CSS custom properties | Work in progress |

---

## How it works

Hugo merges `assets/` from all active modules. `partials/head/css.html` auto-detects the active styling module in this order:

1. `assets/sass/main.sass` → SASS indented syntax pipeline
2. `assets/sass/main.scss` → SCSS syntax pipeline
3. `assets/css/main.css` → native CSS pipeline

Each styling module must provide one of these three files as its entry point. The same detection applies to print stylesheets (`print.sass`, `print.scss`, `print.css`).

---

## CSS options (site params)

```yaml
# hugo.yaml
params:
  css:
    preload: true   # adds <link rel="preload"> for performance
    print: true     # loads sass/print.sass or css/print.css with media="print"
```

The active styling module provides `sass/print.sass` or `css/print.css` if it supports print.

---

## Creating a new styling module

Minimum required structure:

```
hugolify-theme-xxx/
├── go.mod
├── hugo.yaml                          ← module.mounts + imports
└── assets/
    ├── sass/main.sass                 ← SASS indented / main.scss for SCSS / css/main.css for native CSS
    └── sass/abstracts/
        └── _variables.sass            ← variables and CSS custom properties
```

Minimal `hugo.yaml`:

```yaml
module:
  mounts:
    - source: assets
      target: assets
```

---

## Migrating content modules to CSS-only

> **This is not planned in the near future.** All existing content modules (hugolify-theme-casestudies, hugolify-theme-docs, hugolify-theme-blog…) currently use SASS coupled to Bootstrap. They work as-is with hugolify-theme-bootstrap and require no changes.
>
> Migration will only become necessary if a content module needs to be compatible with hugolify-theme-design-system. It can be done progressively, one module at a time.

The principle: replace Bootstrap SASS dependencies with standard CSS using custom properties defined by the active styling module.

| Before (SASS + Bootstrap) | After (native CSS) |
|---|---|
| `@include media-breakpoint-down(md)` | `@media (max-width: 767px)` |
| `color: $primary` | `color: var(--color-primary)` |
| `margin: $spacer * 2` | `margin: var(--spacing-lg)` |
| `@extend .btn-link` | copy the CSS rules directly |
| `font-size: $font-size-sm` | `font-size: var(--font-size-sm)` |

The CSS custom properties (`--color-primary`, `--spacing-lg`…) must be defined by the active styling module so that content modules can consume them regardless of the underlying framework.
