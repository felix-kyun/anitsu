import {
    AllAnimeSearchResults,
    allAnimeSearchResultsSchema,
} from "../../type/AllAnimeTypes";

export function validateAllAnimeSearchResults(
    obj: unknown,
): obj is AllAnimeSearchResults {
    allAnimeSearchResultsSchema.parse(obj);
    return true;
}
