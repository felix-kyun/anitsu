import { Filter } from "../class/Filter.js";
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
        type: Filter.VideoType,
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
            case Filter.VideoType.Sub:
                return episodes.sub ?? [];
            case Filter.VideoType.Dub:
                return episodes.dub ?? [];
            case Filter.VideoType.Raw:
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

    async streams(
        id: string,
        episode: string,
        translation: string = "sub",
    ): Promise<Array<AllAnimeStream>> {
        const streams = await this.gqlClient.query(AllAnimeQueries.stream, {
            showId: id,
            episodeString: episode,
            translationType: translation,
        });

        if (!AllAnimeValidation.stream(streams)) {
            throw new Error("Invalid streams data");
        }

        console.log(streams.episode.sourceUrls);
        const providers: Array<string> = [
            "Yt-mp4",
            "Luf-Mp4",
            "S-Mp4",
            "Default",
        ];
        const availableStreams = [];

        for (const provider of streams.episode.sourceUrls) {
            if (providers.includes(provider.sourceName)) {
                const decrypted_path: string = this.decrypt(
                    provider.sourceUrl.replace("--", ""),
                ).replace("clock", "clock.json");

                // tools.fast4speed.rsvp
                if (decrypted_path.includes("tools.fast4speed.rsvp")) {
                    availableStreams.push({
                        url: decrypted_path,
                        resolution: 1080,
                        episode: episode,
                        id: id,
                        language: translation,
                        referrer: this.url,
                    });

                    continue;
                }
            }
        }

        return streams.episode.sourceUrls;
    }

    decrypt(providerId: string) {
        let decrypted = "";
        for (let i = 0; i < providerId.length; i += 2) {
            const hexValue = providerId.slice(i, i + 2);
            const dec = parseInt(hexValue, 16);
            const xor = dec ^ 56;
            // Convert to octal string, pad to 3 digits
            const octValue = xor.toString(8).padStart(3, "0");
            decrypted += String.fromCharCode(parseInt(octValue, 8));
        }
        return decrypted;
    }
}
