import { GQLQuery } from "../../type/GQLQuery.js";
import { search } from "./search.js";

export const AllAnimeQueries: Record<string, GQLQuery> = {
    search,
};
