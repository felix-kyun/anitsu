import { GQLQuery } from "../../class/GQLQuery.js";
import { search } from "./search.js";

export const AllAnimeQueries: Record<string, GQLQuery> = {
    search,
};
