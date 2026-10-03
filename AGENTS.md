# Repository Guidelines

## Structure

This repository ships dependency-free TypeScript easing functions as ESM,
CommonJS, declarations, and a generated curve gallery. Source is in the root
TypeScript modules; tests are in `test.mjs` and `test/`; generated distribution
trees are `dist/` and `cjs/`; `docs/curves.svg` is tracked documentation.

## Environment and validation

The standard Linux host is a Basaltwater-managed agent VM. Use a supported
Node release (22.22.1+) and keep related repositories beside this checkout
below `~/repos`.

Select `.nvmrc` with `nvm use` before npm commands. On Basaltwater,
`basaltw node exec -- npm run check` selects the project runtime without
changing the host default; `basaltw node install` installs a missing pin.

- `npm ci`: install dependencies.
- `npm run check`: build, run runtime/type tests, verify the curve gallery,
  lint, and check formatting.
- `npm run docs:curves`: intentionally regenerate `docs/curves.svg` after a
  curve or gallery change.
- `npm pack --dry-run`: inspect the release payload.

Run `npm run check` before pushing. Treat an unexpected gallery diff as a test
failure; include an intentional gallery update with the curve change. Keep
untracked reports and scratch evidence under ignored `local-artifacts/`.

## Releases

Use `npm run release` and Antistatic's `sister-repository-maintenance`
guidance. Never move an existing tag or update a consumer to unpublished code.
AI-assisted commits append `w/llm`.
