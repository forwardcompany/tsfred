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
