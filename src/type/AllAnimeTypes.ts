import z from "zod";

// search
export const allAnimeSearchResultSchema = z.object({
    _id: z.string(),
    name: z.string(),
});

export const allAnimeSearchResultsSchema = z.object({
    shows: z.object({
        edges: z.array(allAnimeSearchResultSchema),
    }),
});

export type AllAnimeSearchResult = z.infer<typeof allAnimeSearchResultSchema>;
export type AllAnimeSearchResults = z.infer<typeof allAnimeSearchResultsSchema>;

// episodes

export const allAnimeEpisodeSchema = z.string();
export const allAnimeEpisodesSchema = z.object({
    show: z.object({
        availableEpisodesDetail: z.object({
            sub: z.array(allAnimeEpisodeSchema).optional(),
            dub: z.array(allAnimeEpisodeSchema).optional(),
            raw: z.array(allAnimeEpisodeSchema).optional(),
        }),
    }),
});

export type AllAnimeEpisode = z.infer<typeof allAnimeEpisodeSchema>;
export type AllAnimeEpisodes = z.infer<typeof allAnimeEpisodesSchema>;

// info

export const allAnimeInfoSchema = z.object({
    _id: z.string(),
    altNames: z.array(z.string()),
    description: z.string().optional(),
    genres: z.array(z.string()),
    name: z.string(),
    status: z.string(),
    thumbnail: z.string(),
});

export const allAnimeInfoResponseSchema = z.object({
    show: allAnimeInfoSchema,
});

export type AllAnimeInfo = z.infer<typeof allAnimeInfoSchema>;
export type AllAnimeInfoResponse = z.infer<typeof allAnimeInfoResponseSchema>;

// source
export const allAnimeSourceSchema = z.object({
    sourceUrl: z.string(),
    sourceName: z.string(),
    priority: z.number(),
    type: z.string(),
    className: z.string(),
    streamerId: z.string(),
    sandbox: z.string().optional(),
    downloads: z
        .object({
            sourceName: z.string(),
            downloadUrl: z.string(),
        })
        .optional(),
});

export const allAnimeSourcesSchema = z.object({
    episode: z.object({
        sourceUrls: z.array(allAnimeSourceSchema),
    }),
});

export type AllAnimeSource = z.infer<typeof allAnimeSourceSchema>;
export type AllAnimeSources = z.infer<typeof allAnimeSourcesSchema>;

// streams
export interface AllAnimeStream {
    url: string;
    resolution: number;
    episode: string;
    language: string;
    id: string;
    referrer: string;
}

// embeds
export interface AllAnimeEmbed {
    sourceUrl: string;
    sourceName: string;
    priority: number;
    type: string;
    className: string;
    streamerId: string;
    sandbox?: string;
    downloads?: {
        sourceName: string;
        downloadUrl: string;
    };
}

export interface Downloads {
    url: string;
    name?: string;
}
