import {
    AllAnimeInfo,
    AllAnimeInfoResponse,
    allAnimeInfoResponseSchema,
    allAnimeInfoSchema,
} from "../../type/AllAnimeTypes";

export function validateAllAnimeInfo(
    obj: unknown,
): obj is AllAnimeInfoResponse {
    allAnimeInfoResponseSchema.parse(obj);
    return true;
}
