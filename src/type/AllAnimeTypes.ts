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

// streams
export const allAnimeStreamSchema = z.object({
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

export const allAnimeStreamsSchema = z.object({
    episode: z.object({
        sourceUrls: z.array(allAnimeStreamSchema),
    }),
});

export type AllAnimeStream = z.infer<typeof allAnimeStreamSchema>;
export type AllAnimeStreams = z.infer<typeof allAnimeStreamsSchema>;
