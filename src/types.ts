type Units = "lin" | "chg" | "ch1" | "pch" | "pc1" | "pca" | "cch" | "cca" | "log";
type Frequency = "d" | "w" | "bw" | "m" | "q" | "sa" | "a" | "wef" | "weth" | "wew" | "wetu" | "wem" | "wesu" | "wesa" | "bwew" | "bwem";
type AggregationMethod = "avg" | "sum" | "eop";

export type SeriesParams = {
    series_id: string;
    realtime_start?: string;
    realtime_end?: string;
};

export type CategoriesParams = {
    series_id: string;
    realtime_start?: string;
    realtime_end?: string;
};

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

export type ReleaseParams = {
    series_id: string;
    realtime_start?: string;
    realtime_end?: string;
};

export type SearchParams = {
    search_text: string;
    search_type?: "full_text" | "series_id";
    realtime_start?: string;
    realtime_end?: string;
    limit?: number;
    offset?: number;
    order_by?:
        | "search_rank"
        | "series_id"
        | "title"
        | "units"
        | "frequency"
        | "seasonal_adjustment"
        | "realtime_start"
        | "realtime_end"
        | "last_updated"
        | "observation_start"
        | "observation_end"
        | "popularity"
        | "group_popularity";
    sort_order?: "asc" | "desc";
    filter_variable?: "frequency" | "units" | "seasonal_adjustment";
    filter_value?: string;
    tag_names?: string;
    exclude_tag_names?: string;
};

export type TagsParams = {
    series_search_text: string;
    realtime_start?: string;
    realtime_end?: string;
    tag_names?: string;
    tag_group_id?: "freq" | "gen" | "geo" | "geot" | "rls" | "seas" | "src";
    tag_search_text?: string;
    limit?: number;
    offset?: number;
    order_by?: "series_count" | "popularity" | "created" | "name" | "group_id";
    sort_order?: "asc" | "desc";
};
