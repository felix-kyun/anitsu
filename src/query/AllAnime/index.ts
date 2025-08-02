import { GQLQuery } from "../../class/GQLQuery.js";
import { episodes } from "./episodes.js";
import { info } from "./info.js";
import { search } from "./search.js";
import { stream } from "./stream.js";

export const AllAnimeQueries: Record<string, GQLQuery> = {
    search,
    info,
    episodes,
    stream,
};
