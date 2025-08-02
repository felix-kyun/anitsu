import { GraphqlClient } from "../class/GraphqlClient.js";
import { AllAnimeQueries } from "../query/AllAnime/index.js";
import {
    AllAnimeEpisode,
    AllAnimeInfo,
    AllAnimeSearchResult,
    AllAnimeStream,
} from "../type/AllAnimeTypes.js";
import { AllAnimeValidation } from "../validator/AllAnime/index.js";

export class AllAnimeSource {
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
            }
        );

        if (!AllAnimeValidation.search(searchResults)) {
            throw new Error("Invalid search results");
        }

        return searchResults.shows.edges;
    }

    async episodes(id: string): Promise<Array<AllAnimeEpisode>> {
        const episodes = await this.gqlClient.query(AllAnimeQueries.episodes, {
            id,
        });

        if (!AllAnimeValidation.episodes(episodes)) {
            throw new Error("Invalid episodes data");
        }

        const sub = episodes.show.availableEpisodesDetail.sub ?? [];

        return sub;
    }

    async info(id: string): Promise<AllAnimeInfo> {
        const info = await this.gqlClient.query(AllAnimeQueries.info, {
            id,
        });

        if (!AllAnimeValidation.info(info)) {
            throw new Error("Invalid info data");
        }

        return info.show;
    }

    async streams(
        id: string,
        episode: string,
        translation: string = "sub"
    ): Promise<Array<AllAnimeStream>> {
        const streams = await this.gqlClient.query(AllAnimeQueries.stream, {
            showId: id,
            episodeString: episode,
            translationType: translation,
        });

        if (!AllAnimeValidation.stream(streams)) {
            throw new Error("Invalid streams data");
        }

        return streams.episode.sourceUrls;
    }
}
