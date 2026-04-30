# fredts
A light 🪽 TypeScript wrapper for the FRED (Federal Reserve Economic Data) API 🏦.

## Installation

```sh
npm install fredts
# or
pnpm install fredts
# or
deno install npm:fredts
# ...
```

## Quick usage

```ts
import { Fred } from 'fredts';

const fred = Fred({ key: process.env.API_KEY! });

let sofr = await fred.series.get('SOFR');
console.log(data.title);
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

This is the list of currently supported endpoints. If yours is not in this list, please [open a request](https://github.com/forwardcompany/fredts/issues).

### Series

```ts
// Get an economic data series.
const series = await fred.series.get('SOFR');

//Get the observations or data values for an economic data series.
const observations = await fred.series.observations({ series_id: "SOFR", limit: 1, sort_order: "desc" })
```
