# tsfred
A light 🪽 TypeScript wrapper for the FRED (Federal Reserve Economic Data) API 🏦.

## Installation

```sh
npm install tsfred
# or
pnpm install tsfred
# or
deno install npm:tsfred
# ...
```

## Quick usage

```ts
import { Fred } from 'tsfred';

const fred = Fred({ key: process.env.API_KEY! });

let series = await fred.series.get('SOFR');
console.log(series.title);
```

## Options

The `Fred` constructor supports the following options.

| Option     | Description                      | Default                              |
| :--------- | :------------------------------- | :----------------------------------- |
| `key`      | Your API secret key              | _None_ (required)                    |
| `baseUrl`  | The base endpoint URL            | `https://api.stlouisfed.org/fred/`   |
| `fileType` | The returned file type           | `json`                               |
| `validate` | Validates JSON and coerces data  | `true`                               |
| `debug`    | Logs the URL before the request  | `false`                              |
| `timeout`  | Requests timeout in milliseconds | `null`                               |

## Endpoints

This is the list of currently supported endpoints. If yours is not in this list, please [open a request](https://github.com/forwardcompany/tsfred/issues).

### Series

```ts
// Get an economic data series.
const series = await fred.series.get("SOFR");

// Get the categories for an economic data series.
const categories = await fred.series.categories("EXJPUS");

//Get the observations or data values for an economic data series.
const observations = await fred.series.observations({ series_id: "SOFR", limit: 1, sort_order: "desc" });

// Get the release for an economic data series.
const release = await fred.series.release("EXJPUS");

// Get economic data series that match keywords.
const search = await fred.series.search.get("monetary service index");

// Get the tags for a series search.
const tags = await fred.series.search.tags("monetary service index");

// Get the related tags for a series search.
const relatedTags = await fred.series.search.relatedTags({ series_search_text: "mortgage rate", tag_names: "30-year;frb" });

// Get the tags for an economic data series.
const tags = await fred.series.tags("STLFSI");

// Get economic data series sorted by when observations were updated on the FRED® server.
const updates = await fred.series.updates({ limit: 1 });
```
