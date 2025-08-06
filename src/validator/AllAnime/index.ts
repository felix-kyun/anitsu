import { validateAllAnimeEpisodes } from "./episodes";
import { validateAllAnimeInfo } from "./info";
import { validateAllAnimeSearchResults } from "./searchResult";
import { validateAllAnimeSources } from "./source";

export const AllAnimeValidation = {
    search: validateAllAnimeSearchResults,
    episodes: validateAllAnimeEpisodes,
    sources: validateAllAnimeSources,
    info: validateAllAnimeInfo,
};
