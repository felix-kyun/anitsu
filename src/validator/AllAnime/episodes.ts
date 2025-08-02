import {
    AllAnimeEpisodes,
    allAnimeEpisodesSchema,
} from "../../type/AllAnimeTypes";

export function validateAllAnimeEpisodes(
    obj: unknown,
): obj is AllAnimeEpisodes {
    allAnimeEpisodesSchema.parse(obj);
    return true;
}
