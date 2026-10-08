---
# The block library. Its entries are displayed by the reusable block,
# layouts/partials/blocks/templates/reusable.html, never on their own: they are
# neither rendered nor listed, so they reach no sitemap, no search index and no
# list of pages, while the library still lists them locally for the block to
# look them up.
#
# Shipped once for every language, so a project keeps no copy of it. A project
# writing its own content/reusables/_index.md takes this one over, and has to
# carry the same build options.
title: Block library
sites:
  matrix:
    languages: ['**']
build:
  list: never
  render: never
cascade:
  build:
    list: local
    render: never
---
