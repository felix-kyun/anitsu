import { Filters } from "../class/Filters.js";
import { GraphqlClient } from "../class/GraphqlClient.js";
import { AllAnimeQueries } from "../query/AllAnime/index.js";
import {
    AllAnimeEpisode,
    AllAnimeInfo,
    AllAnimeSearchResult,
    AllAnimeSource,
} from "../type/AllAnimeTypes.js";
import { AllAnimeValidation } from "../validator/AllAnime/index.js";

export class AllAnime {
    private url: string = "https://api.allanime.day/api";
    private requestOpts: Record<string, unknown> = {
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

    async episodes(
        id: string,
        type: Filters.VideoType,
    ): Promise<Array<AllAnimeEpisode>> {
        const episodeResponse = await this.gqlClient.query(
            AllAnimeQueries.episodes,
            {
                id,
            },
        );

        if (!AllAnimeValidation.episodes(episodeResponse)) {
            throw new Error("Invalid episodes data");
        }

        const episodes = episodeResponse.show.availableEpisodesDetail;

        switch (type) {
            case Filters.VideoType.Sub:
                return episodes.sub ?? [];
            case Filters.VideoType.Dub:
                return episodes.dub ?? [];
            case Filters.VideoType.Raw:
                return episodes.raw ?? [];
        }
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

    async episodeSource(
        id: string,
        episode: string,
        translation: Filters.VideoType = Filters.VideoType.Sub,
    ): Promise<Array<AllAnimeSource>> {
        const sources = await this.gqlClient.query(AllAnimeQueries.stream, {
            showId: id,
            episodeString: episode,
            translationType: translation,
        });

        if (!AllAnimeValidation.sources(sources)) {
            throw new Error("Invalid source data");
        }

        return sources.episode.sourceUrls;
    }
}
