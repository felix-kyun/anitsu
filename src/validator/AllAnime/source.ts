import {
    AllAnimeSources,
    allAnimeSourcesSchema,
} from "../../type/AllAnimeTypes";

export function validateAllAnimeSources(obj: unknown): obj is AllAnimeSources {
    allAnimeSourcesSchema.parse(obj);
    return true;
}
