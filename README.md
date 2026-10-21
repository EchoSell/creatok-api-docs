# CreatOK API docs

Public developer documentation for the CreatOK API, built with [Mintlify](https://mintlify.com).

## Structure

- `docs.json`: site configuration and navigation
- `index.mdx`, `quickstart.mdx`: getting started
- `guides/`: authentication, files, jobs, idempotency, errors, concurrency, and model comparison
- `models/video/`: Seedance 2 family and Seedance 2.5 scenario guides
- `api-reference/openapi.json`: generated OpenAPI 3.1 specification
- `scripts/sync-openapi.mjs`: export the specification from an app checkout

## Sync the OpenAPI specification

Use the app's routes, request validators, and services as the source of truth. Never edit `api-reference/openapi.json` by hand. From this documentation repository, run:

```bash
node scripts/sync-openapi.mjs /path/to/creatok-app
```

The app checkout must have its dependencies installed, including `tsx`. The script loads `lib/api-platform/openapi-document.ts` without starting the app or loading credentials. It validates the export before replacing the documentation copy. Inspect the diff after every export.

After deployment, compare the public `/v1/openapi.json` response with the local export. Do not overwrite the current specification with an older deployment or an HTTP error page.

Model limits in `guides/video-models.mdx` also depend on the app's model settings and media validators. Keep these in sync when updating the API contract. Link prices to the [API console pricing page](https://www.creatok.ai/app/api-platform/pricing). When the public API landing page with synced prices ships, update every pricing link.

## Validate and preview

Use Node.js 22 or later:

```bash
npx --yes --registry=https://registry.npmjs.org mint validate
npx --yes --registry=https://registry.npmjs.org mint broken-links
npx --yes --registry=https://registry.npmjs.org mint dev --port 3000
```

Open `http://localhost:3000`. Check Quickstart, Files, Video models, Jobs, and the generated generation/upload reference pages. Check code blocks, tables, navigation, and request schemas. Link validation does not prove that authenticated external console pages or deployed API capabilities are ready.

## Publishing

Pushing to `main` deploys through the Mintlify GitHub app. On 2026-10-21, the maintainer approved publishing these docs before the production API deployment. The introduction, quickstart, and API overview explicitly label production availability as pending. Keep production readiness separate from test-environment results.

## Capability audit (2026-10-21)

The audit targets app branch `feat/openapi` at `baf21531d`. The local export is OpenAPI `1.1.0` and matches the specification already committed in this repository. No app code was changed.

Reviewed all six route handlers under `app/api/v1`, request contracts, input mapping, submission and billing services, model/media constraints, token pricing, job serialization, listing, and caching. The guides cover signed uploads, all supported reference modes, adaptive editing, token-based USD charges, refunds, idempotency, and workspace concurrency.

Release checks and unresolved items:

- Production `https://api.creatok.ai/v1/openapi.json` returned HTTP `404` in this audit. Production capability parity is unconfirmed. The production URLs in the guides describe the intended release target.
- The handoff reports test deployment `6cc20da78`, OpenAPI `1.1.0`, and six successful real generation cases: single image, multiple images, video, mixed media, frames, and adaptive editing. These are test-environment results, not production verification. This audit's unauthenticated test-schema request returned HTTP `302`; the earlier result was not independently reproduced.
- The generated upload endpoint descriptions still name the storage implementation. Fix those descriptions in the app's OpenAPI source in a follow-up, then re-export. Do not patch the generated JSON in this repository.
- The generated request schema leaves some model-specific restrictions to descriptions and runtime validation, including duration ranges, prompt length, supported resolutions, and media limits. The model guide documents those restrictions; schema validation alone does not prove media acceptance.
- Before announcing production API availability, confirm production routes, upload and generation flows, job completion/refunds, and console pricing. Compare the production schema, repeat documentation validation, and remove the pending-deployment notices only after verification.

Audit validation completed:

- `mint validate`: passed, including OpenAPI validation.
- `mint broken-links`: passed with no broken links.
- Parsed every JSON code block and checked JavaScript and shell syntax. Forty generation examples, including the Seedance 2 family scenarios with Fast and Mini model substitutions, passed the app's request schema, input mapping, and model parameter validators. Media uploads and paid generation were not repeated.
- Previewed Quickstart, Files, Video models, Jobs, API overview, and generated generation/upload reference pages in Chrome. Also previewed the Seedance 2 family selection table and Seedance 2.5 adaptive editing section. Checked nested input fields, scenario anchors, navigation, and rendered code blocks. The local preview used port `3001` because `3000` was occupied.
