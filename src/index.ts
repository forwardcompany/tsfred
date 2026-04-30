import { z } from "zod/mini";
import { seriesObservationsSchema, seriesSchema } from "./schemas.js";
import type { SeriesObservationsParams, SeriesParams } from "./types.js";

export type { SeriesParams };

export class FredClient {
    #apiKey: string = "";
    #baseUrl: string = "https://api.stlouisfed.org/fred/";
    #fileType: "json" | "xml" = "json";
    #validate: boolean = true;
    #debug: boolean = false;
    #timeout: number | null = null;

    /**
     * Internal method to set the API key. Called by the exported setup function.
     */
    setup({ key, baseUrl, validate, debug, timeout, fileType }: FredOptions) {
        if (!key) throw new Error("FRED API key must be provided.");
        this.#apiKey = key;
        if (baseUrl !== undefined) this.#baseUrl = baseUrl;
        if (validate !== undefined) this.#validate = validate;
        if (debug !== undefined) this.#debug = debug;
        if (timeout !== undefined) this.#timeout = timeout;
        if (fileType !== undefined) this.#fileType = fileType;
    }

    /**
     * Constructs the full URL for a FRED API call.
     */
    #buildUrl(endpoint: string, params: Record<string, any> = {}): string {
        const url = new URL(this.#baseUrl + endpoint);
        for (const key in params) {
            if (params[key] !== undefined) {
                url.searchParams.append(key, String(params[key]));
            }
        }
        url.searchParams.append("file_type", this.#fileType);
        url.searchParams.append("api_key", this.#apiKey);
        if (this.#debug) console.log("CALLING", url.href);
        return url.toString();
    }

    /**
     * Sends a request and returns the raw JSON body.
     */
    async #fetch(url: string): Promise<any> {
        const response = await fetch(url, {
            signal: this.#timeout ? AbortSignal.timeout(this.#timeout) : undefined,
        });
        if (!response.ok) throw new Error(`FRED HTTP Error ${response.status} for ${url}`);
        return response.json();
    }

    /**
     * Calls an endpoint, unwraps `{ data, meta }` and returns only `data`.
     */
    async #callEndpoint<T extends z.ZodMiniType<any>>(endpoint: string, schema: T | null, params: Record<string, any> = {}): Promise<z.infer<T>> {
        const url = this.#buildUrl(endpoint, params);
        const json = await this.#fetch(url);
        const data = json.data ?? json;
        if (schema && this.#validate) {
            return schema.parse(data);
        }
        return data;
    }

    /**
     * Normalizes series parameters to ensure `series_id` is always present.
     */
    #normalizeSeries(params: SeriesParams | string): SeriesParams {
        return typeof params === "string" ? { series_id: params } : params;
    }

    /**
     * Calls any endpoint — useful for unsupported or new endpoints.
     */
    async any<T extends z.ZodMiniType<any>>(endpoint: string, schema: T | null = z.any() as unknown as T, params: Record<string, any> = {}) {
        return this.#callEndpoint(endpoint, schema, params);
    }

    /**
     * Get an economic data series (`/series/*`).
     */
    series = {
        /**
         * Get a series (`/series`).
         */
        get: async (params: SeriesParams | string) => {
            return this.#callEndpoint("/series", seriesSchema, this.#normalizeSeries(params));
        },
        /**
         * Get the observations or data values for an economic data series. (`/series/observations`).
         */
        observations: async (params: SeriesObservationsParams | string) => {
            return this.#callEndpoint("/series/observations", seriesObservationsSchema, this.#normalizeSeries(params));
        },
    };

    // /**
    //  * Historical vessel data (`/vessel_history`).
    //  *
    //  * Returns past positions, speed, course, heading, destination, etc.
    //  * Specify a time range with `{ from, to }` (dates) or `{ days }`. `from` and `to` are formatted to `YYYY-MM-DD` automatically.
    //  */
    // async vesselHistory(params: string) {
    //     const formatted: Record<string, any> = { ...params };
    //     if ("from" in formatted && formatted.from !== undefined) {
    //         formatted.from = formatDay(formatted.from);
    //     }
    //     if ("to" in formatted && formatted.to !== undefined) {
    //         formatted.to = formatDay(formatted.to);
    //     }
    //     return this.#callEndpoint("/vessel_history", null, formatted);
    // }
}

const client = new FredClient();

export interface FredOptions {
    key: string;
    baseUrl?: string;
    fileType?: "json" | "xml";
    validate?: boolean;
    debug?: boolean;
    timeout?: number | null;
}

export function Fred(params: FredOptions) {
    client.setup(params);
    return client;
}
