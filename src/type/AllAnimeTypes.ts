import z from "zod";

export const allAnimeSearchResultSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
});

export const allAnimeSearchResultsSchema = z.object({
    shows: z.object({
        edges: z.array(allAnimeSearchResultSchema),
    }),
});

export type AllAnimeSearchResult = z.infer<typeof allAnimeSearchResultSchema>;
export type AllAnimeSearchResults = z.infer<typeof allAnimeSearchResultsSchema>;
