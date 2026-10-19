# CreatOK API docs

Public developer documentation for the CreatOK API, built with [Mintlify](https://mintlify.com) and published at `docs.creatok.ai`.

## Structure

- `docs.json`: site configuration and navigation
- `index.mdx`, `quickstart.mdx`: getting started
- `guides/`: authentication, jobs, idempotency, errors, concurrency, models
- `api-reference/openapi.json`: OpenAPI 3.1 spec that generates the endpoint pages

## Sync the OpenAPI spec

`api-reference/openapi.json` is a copy of the spec generated from `lib/api-platform/openapi-document.ts` in the CreatOK app repository. After the app changes its public contract, refresh the copy from the deployed endpoint:

```bash
curl -fsS https://api.creatok.ai/v1/openapi.json | jq . > api-reference/openapi.json
```

Model limits in `guides/video-models.mdx` mirror the model settings in the app repository. Do not publish prices here; link to the [pricing page](https://www.creatok.ai/app/api-platform/pricing) in the API console instead. When the public API landing page with synced prices ships, point the pricing links in `quickstart.mdx` and `guides/video-models.mdx` there.

## Local preview

```bash
npm i -g mint
mint dev
```

Open `http://localhost:3000`. Run `mint broken-links` before pushing.

## Publishing

Pushing to `main` deploys through the Mintlify GitHub app.
