import {
    AllAnimeStreams,
    allAnimeStreamsSchema,
} from "../../type/AllAnimeTypes";

export function validateAllAnimeStreams(obj: unknown): obj is AllAnimeStreams {
    allAnimeStreamsSchema.parse(obj);
    return true;
}
