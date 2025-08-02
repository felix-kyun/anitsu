import { SearchResult } from "./SearchResult";

export interface AllAnimeSearchResult extends SearchResult {
    id: string;
    name: string;
    description: string;
}
