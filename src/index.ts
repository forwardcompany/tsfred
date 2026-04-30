import { z } from "zod/mini";
import { categoriesSchema, releaseSchema, searchSchema, seriesObservationsSchema, seriesSchema, tagsSchema, updatesSchema } from "./schemas.js";
import type {
    CategoriesParams,
    SearchRelatedTagsParams,
    ReleaseParams,
    SearchParams,
    SeriesObservationsParams,
    SeriesParams,
    SearchTagsParams,
    SeriesTagsParams,
    UpdatesParams,
} from "./types.js";

export type { SeriesParams };

export class FredClient {
    #apiKey: string = "";
    #baseUrl: string = "https://api.stlouisfed.org/fred";
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
        return typeof params === "string" ? ({ series_id: params } as SeriesParams) : params;
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
         * Get the categories for an economic data series.
         */
        categories: async (params: CategoriesParams | string) => {
            return this.#callEndpoint("/series/categories", categoriesSchema, this.#normalizeSeries(params));
        },

        /**
         * Get the observations or data values for an economic data series. (`/series/observations`).
         */
        observations: async (params: SeriesObservationsParams | string) => {
            return this.#callEndpoint("/series/observations", seriesObservationsSchema, this.#normalizeSeries(params));
        },

        /**
         * Get the release for an economic data series.
         */
        release: async (params: ReleaseParams | string) => {
            return this.#callEndpoint("/series/release", releaseSchema, this.#normalizeSeries(params));
        },

        search: {
            /**
             * Get economic data series that match keywords.
             */
            get: async (params: SearchParams | string) => {
                const normalized = typeof params === "string" ? ({ search_text: params } as SearchParams) : params;
                return this.#callEndpoint("/series/search", searchSchema, normalized);
            },

            /**
             * Get the tags for a series search.
             */
            tags: async (params: SearchTagsParams | string) => {
                const normalized = typeof params === "string" ? ({ series_search_text: params } as SearchTagsParams) : params;
                return this.#callEndpoint("/series/search/tags", tagsSchema, normalized);
            },

            /**
             * Get the related tags for a series search.
             */
            relatedTags: async (params: SearchRelatedTagsParams | string) => {
                const normalized = typeof params === "string" ? ({ series_search_text: params } as SearchRelatedTagsParams) : params;
                return this.#callEndpoint("/series/search/related_tags", tagsSchema, normalized);
            },
        },

        /**
         * Get the tags for an economic data series.
         */
        tags: async (params: SeriesTagsParams | string) => {
            const normalized = typeof params === "string" ? ({ series_id: params } as SeriesTagsParams) : params;
            return this.#callEndpoint("/series/tags", tagsSchema, normalized);
        },

        /**
         * Get economic data series sorted by when observations were updated on the FRED® server.
         */
        updates: async (params?: UpdatesParams) => {
            return this.#callEndpoint("/series/updates", updatesSchema, params);
        },
    };
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
