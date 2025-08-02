import { AnimeInfo } from "../class/AnimeInfo.js";
import { Episode } from "../class/Episode.js";
import { Stream } from "../class/Stream.js";
import { GraphqlClient } from "../class/GraphqlClient.js";
import { AllAnimeQueries } from "../query/AllAnime/index.js";
import { AllAnimeSearchResult } from "../type/AllAnimeTypes.js";
import { AllAnimeValidation } from "../validator/AllAnime/index.js";

export class AllAnimeProvider {
    protected name: string = "AllAnime";
    protected url: string = "https://api.allanime.day/api";
    protected requestOpts: Record<string, unknown> = {
        headers: {
            "Content-Type": "application/json",
            Referer: "https://allmanga.to/",
        },
    };
    private gqlClient = new GraphqlClient(this.url, this.requestOpts);

    async search(searchString: string): Promise<Array<AllAnimeSearchResult>> {
        const searchResults = await this.gqlClient.query(
            AllAnimeQueries.search,
            {
                search: {
                    query: searchString,
                },
            },
        );

        if (!AllAnimeValidation.search(searchResults)) {
            throw new Error("Invalid search results");
        }

        return searchResults.shows.edges;
    }

    async episodes(id: string): Promise<Array<Episode>> {
        return [];
    }

    async info(id: string): Promise<AnimeInfo> {
        // Implementation for getting anime info
        return {} as AnimeInfo;
    }

    async streams(episode: Episode): Promise<Array<Stream>> {
        // Implementation for getting streams
        return [];
    }
}
