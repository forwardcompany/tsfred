import { z } from "zod/mini";

export const seriesSchema = z.object({
    realtime_start: z.nullable(z.string()),
    realtime_end: z.nullable(z.string()),
    seriess: z.array(
        z.object({
            id: z.string(),
            realtime_start: z.nullable(z.string()),
            realtime_end: z.nullable(z.string()),
            title: z.string(),
            observation_start: z.string(),
            observation_end: z.string(),
            frequency: z.string(),
            frequency_short: z.string(),
            units: z.string(),
            units_short: z.string(),
            seasonal_adjustment: z.string(),
            seasonal_adjustment_short: z.string(),
            last_updated: z.string(),
            popularity: z.number(),
            notes: z.string(),
        }),
    ),
});

export const categoriesSchema = z.object({
    categories: z.array(
        z.object({
            id: z.number(),
            name: z.string(),
            parent_id: z.number(),
        }),
    ),
});

export const seriesObservationsSchema = z.object({
    realtime_start: z.nullable(z.string()),
    realtime_end: z.nullable(z.string()),
    observation_start: z.string(),
    observation_end: z.string(),
    units: z.string(),
    output_type: z.number(),
    file_type: z.string(),
    order_by: z.string(),
    sort_order: z.string(),
    count: z.number(),
    offset: z.number(),
    limit: z.number(),
    observations: z.array(
        z.object({
            realtime_start: z.nullable(z.string()),
            realtime_end: z.nullable(z.string()),
            date: z.string(),
            value: z.string(),
        }),
    ),
});

export const releaseSchema = z.object({
    realtime_start: z.string(),
    realtime_end: z.string(),
    releases: z.array(
        z.object({
            id: z.number(),
            realtime_start: z.string(),
            realtime_end: z.string(),
            name: z.string(),
            press_release: z.boolean(),
            link: z.string(),
        }),
    ),
});

export const searchSchema = z.object({
    realtime_start: z.string(),
    realtime_end: z.string(),
    order_by: z.string(),
    sort_order: z.string(),
    count: z.number(),
    offset: z.number(),
    limit: z.number(),
    seriess: z.array(
        z.object({
            id: z.string(),
            realtime_start: z.string(),
            realtime_end: z.string(),
            title: z.string(),
            observation_start: z.string(),
            observation_end: z.string(),
            frequency: z.string(),
            frequency_short: z.string(),
            units: z.string(),
            units_short: z.string(),
            seasonal_adjustment: z.string(),
            seasonal_adjustment_short: z.string(),
            last_updated: z.string(),
            popularity: z.number(),
            group_popularity: z.number(),
            notes: z.string(),
        }),
    ),
});

export const tagsSchema = z.object({
    realtime_start: z.string(),
    realtime_end: z.string(),
    order_by: z.string(),
    sort_order: z.string(),
    count: z.number(),
    offset: z.number(),
    limit: z.number(),
    tags: z.array(
        z.object({
            name: z.string(),
            group_id: z.string(),
            notes: z.union([z.string(), z.undefined(), z.null()]),
            created: z.string(),
            popularity: z.number(),
            series_count: z.number(),
        }),
    ),
});

export const updatesSchema = z.object({
    realtime_start: z.string(),
    realtime_end: z.string(),
    filter_variable: z.string(),
    filter_value: z.string(),
    order_by: z.string(),
    sort_order: z.string(),
    count: z.number(),
    offset: z.number(),
    limit: z.number(),
    seriess: z.array(
        z.object({
            id: z.string(),
            realtime_start: z.string(),
            realtime_end: z.string(),
            title: z.string(),
            observation_start: z.string(),
            observation_end: z.string(),
            frequency: z.string(),
            frequency_short: z.string(),
            units: z.string(),
            units_short: z.string(),
            seasonal_adjustment: z.string(),
            seasonal_adjustment_short: z.string(),
            last_updated: z.string(),
            popularity: z.number(),
        }),
    ),
});
