import { GraphqlQuery } from "../class/GraphqlQuery.js";
import { AllAnimeQueries } from "../query/AllAnime/index.js";
import { BaseProvider } from "./BaseProvider.js";
import { AnimeInfo } from "../class/AnimeInfo.js";
import { Episode } from "../class/Episode.js";
import { SearchResult } from "../class/SearchResult.js";
import { Stream } from "../class/Stream.js";

export class AllAnimeProvider extends BaseProvider {
    protected name: string = "AllAnime";
    protected url: string = "https://api.allanime.day/api";
    protected requestOpts: Record<string, unknown> = {
        headers: {
            "Content-Type": "application/json",
            Referer: "https://allmanga.to/",
        },
        method: "GET",
    };

    async search(searchString: string): Promise<Array<SearchResult>> {
        const query: GraphqlQuery = new GraphqlQuery(
            this.url,
            AllAnimeQueries.search,
            this.requestOpts,
        );

        const response = await query.send({
            search: { query: searchString },
            limit: 30,
            page: 1,
            countryOrigin: "ALL",
        });
        console.dir((response as { data: object }).data, { depth: null });

        return [];
    }

    async info(id: string): Promise<AnimeInfo> {
        // Implementation for getting anime info
        return {} as AnimeInfo;
    }

    async episodes(id: string): Promise<Array<Episode>> {
        // Implementation for getting episodes
        return [];
    }

    async streams(episode: Episode): Promise<Array<Stream>> {
        // Implementation for getting streams
        return [];
    }
}
