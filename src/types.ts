type Units = "lin" | "chg" | "ch1" | "pch" | "pc1" | "pca" | "cch" | "cca" | "log";
type Frequency = "d" | "w" | "bw" | "m" | "q" | "sa" | "a" | "wef" | "weth" | "wew" | "wetu" | "wem" | "wesu" | "wesa" | "bwew" | "bwem";
type AggregationMethod = "avg" | "sum" | "eop";

/** Get an economic data series. */
export type SeriesParams = {
    series_id: string;
    realtime_start?: string;
    realtime_end?: string;
};

/**
 * Get the observations or data values for an economic data series.
 */
export type SeriesObservationsParams = {
    series_id: string;
    realtime_start?: string;
    realtime_end?: string;
    limit?: number;
    offset?: number;
    sort_order?: "asc" | "desc";
    observation_start?: string;
    observation_end?: string;
    units?: Units;
    frequency?: Frequency;
    aggregation_method?: AggregationMethod;
    output_type?: "1" | "2" | "3" | "4";
};
