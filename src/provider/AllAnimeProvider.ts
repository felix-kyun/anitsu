import { AnimeInfo } from "../class/AnimeInfo.js";
import { EmbedData } from "../class/EmbedData.js";
import { Episode } from "../class/Episode.js";
import { Filters } from "../class/Filters.js";
import { SearchResult } from "../class/SearchResult.js";
import { Stream } from "../class/Stream.js";
import { AllAnime } from "../source/AllAnime.js";
import { AllAnimeSearchResult } from "../type/AllAnimeTypes.js";
import { BaseProvider } from "./BaseProvider.js";

export class AllAnimeProvider extends BaseProvider {
    public source = new AllAnime();
    public name: string = "All Anime";

    async search(query: string): Promise<Array<SearchResult>> {
        const searchResults: Array<AllAnimeSearchResult> =
            await this.source.search(query);

        // convert to expected type
        return searchResults.map(
            ({ _id, name }: AllAnimeSearchResult): SearchResult =>
                new SearchResult(this, _id, name),
        );
    }

    async info(id: string): Promise<AnimeInfo> {
        const info = await this.source.info(id);

        return new AnimeInfo(this, { ...info, id: info._id });
    }

    async episodes(
        id: string,
        type: Filters.VideoType,
    ): Promise<Array<Episode>> {
        const episodes = await this.source.episodes(id, type);

        return episodes.map(
            (episodeId) => new Episode(this, id, episodeId, type),
        );
    }

    async embeds({
        animeId,
        episodeId,
        type,
    }: Episode): Promise<Array<EmbedData>> {
        const sources = await this.source.episodeSource(
            animeId,
            episodeId,
            type,
        );

        return sources
            .filter((source) => source.sourceUrl.startsWith("https://"))
            .map(
                (source) =>
                    new EmbedData({
                        url: source.sourceUrl,
                        name: source.sourceName,
                        priority: source.priority,
                        className: source.className,
                        streamerId: source.streamerId,
                        downloads: source.downloads // if downloads are available
                            ? {
                                  url: source.downloads.downloadUrl,
                                  name: source.downloads.sourceName,
                              }
                            : undefined,
                    }),
            );
    }

    async streams({
        animeId,
        episodeId,
        type,
    }: Episode): Promise<Array<Stream>> {
        const sources = await this.source.episodeSource(
            animeId,
            episodeId,
            type,
        );
        const streams: Array<Stream> = [];

        const providers: Array<string> = [
            "Yt-mp4",
            "Luf-Mp4",
            "S-Mp4",
            "Default",
        ];

        for (const source of sources)
            if (providers.includes(source.sourceName)) {
                const decrypted_path: string = this.decrypt(
                    source.sourceUrl.replace("--", ""),
                ).replace("clock", "clock.json");

                // tools.fast4speed.rsvp
                if (decrypted_path.includes("tools.fast4speed.rsvp")) {
                    streams.push(
                        new Stream({
                            url: decrypted_path,
                            name: source.sourceName,
                            referrer: "https://allanime.day",
                        }),
                    );
                    continue;
                }
            }

        return streams;
    }

    private decrypt(providerId: string) {
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
