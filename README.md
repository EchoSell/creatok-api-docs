# CreatOK API docs

Public developer documentation for the CreatOK API, built with [Mintlify](https://mintlify.com).

## Structure

- `docs.json`: site configuration and navigation
- `index.mdx`, `quickstart.mdx`: getting started
- `guides/`: authentication, files, jobs, idempotency, errors, concurrency, and model comparison
- `models/image/`: GPT Image 2 generation guide
- `models/video/`: Seedance and Veo model generation guides
- `api-reference/openapi.json`: generated OpenAPI 3.1 specification
- `scripts/sync-openapi.mjs`: export the specification from an app checkout

## Sync the OpenAPI specification

Use the app's routes, request validators, and services as the source of truth. Never edit `api-reference/openapi.json` by hand. From this documentation repository, run:

```bash
node scripts/sync-openapi.mjs /path/to/creatok-app
```

The app checkout must have its dependencies installed, including `tsx`. The script exports the specification without starting the app or loading credentials. It validates the export before replacing the documentation copy. Inspect the diff after every export.

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

Pushing to `main` deploys through the Mintlify GitHub app. Verify API availability before updating public release notices.
