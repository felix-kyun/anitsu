import { validateAllAnimeEpisodes } from "./episodes";
import { validateAllAnimeInfo } from "./info";
import { validateAllAnimeSearchResults } from "./searchResult";
import { validateAllAnimeStreams } from "./streams";

export const AllAnimeValidation = {
    search: validateAllAnimeSearchResults,
    episodes: validateAllAnimeEpisodes,
    stream: validateAllAnimeStreams,
    info: validateAllAnimeInfo,
};
