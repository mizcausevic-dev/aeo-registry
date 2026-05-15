# Architecture

## Overview

`aeo-registry` is a TypeScript and Express application that treats AEO manifests as managed registry entries instead of as disconnected files.

The repo models three layers:

1. **manifest inventory**
   - publisher, version, canonical URL, and vertical
   - freshness, source coverage, entity count, and answer-surface coverage
   - readiness state across `ready`, `review`, and `blocked`

2. **claim review**
   - individual claim surfaces that can become stale or under-cited
   - source-count and freshness pressure
   - next-action guidance for registry operators

3. **publisher posture**
   - portfolio summaries for multi-manifest programs
   - blocked counts, average source coverage, and freshness risk
   - a quick view of which publisher programs need attention first

## Runtime shape

- `src/data/sampleRegistry.ts`
  - sample manifest, claim, and publisher state
- `src/services/registryService.ts`
  - summary, sorting, and payload composition logic
- `src/services/render.ts`
  - HTML control surfaces for the registry
- `src/app.ts`
  - Express routes for HTML and JSON outputs

## Primary routes

- `/`
  - overview and lead recommendation
- `/registry`
  - manifest inventory board
- `/claims`
  - claim-surface queue
- `/publishers`
  - publisher portfolio posture
- `/verification`
  - top-line proof summary
- `/docs`
  - route and payload map

## Validation approach

- `vitest`
  - verifies the registry summary and ordering logic
- `scripts/run_demo.ts`
  - renders a deterministic JSON snapshot of the current registry state
- `scripts/smoke_check.ts`
  - boots the app and confirms that core HTML and JSON routes respond correctly
- `scripts/render_readme_assets.ps1`
  - captures real browser screenshots from the running app for README proof
