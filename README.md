# CreatOK API docs

Public developer documentation for the CreatOK API, built with [Mintlify](https://mintlify.com) and published at `docs.creatok.ai`.

## Structure

- `docs.json`: site configuration and navigation
- `index.mdx`, `quickstart.mdx`: getting started
- `guides/`: authentication, jobs, idempotency, errors, concurrency, models and pricing
- `api-reference/openapi.json`: OpenAPI 3.1 spec that generates the endpoint pages

## Sync the OpenAPI spec

`api-reference/openapi.json` is a copy of the spec generated from `lib/api-platform/openapi-document.ts` in the CreatOK app repository. After the app changes its public contract, refresh the copy from the deployed endpoint:

```bash
curl -fsS https://api.creatok.ai/v1/openapi.json | jq . > api-reference/openapi.json
```

Prices and model limits in `guides/video-models.mdx` mirror `lib/api-platform/pricing-config.ts` and the model settings in the app repository. Update both together.

## Local preview

```bash
npm i -g mint
mint dev
```

Open `http://localhost:3000`. Run `mint broken-links` before pushing.

## Publishing

Pushing to `main` deploys through the Mintlify GitHub app.
