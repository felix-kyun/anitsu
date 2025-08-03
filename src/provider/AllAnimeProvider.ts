import { AnimeInfo } from "../class/AnimeInfo.js";
import { Episode } from "../class/Episode.js";
import { Filter } from "../class/Filter.js";
import { SearchResult } from "../class/SearchResult.js";
import { Downloads, Stream } from "../class/Stream.js";
import { AllAnimeSource } from "../source/AllAnimeSource.js";
import { AllAnimeSearchResult } from "../type/AllAnimeTypes.js";
import { BaseProvider } from "./BaseProvider.js";

export class AllAnimeProvider extends BaseProvider {
    public source = new AllAnimeSource();
    public name: string = "All Anime";

    async search(query: string): Promise<Array<SearchResult>> {
        const searchResults: Array<AllAnimeSearchResult> =
            await this.source.search(query);

        // convert to expected type
        return searchResults.map(
            ({ _id, name }: AllAnimeSearchResult): SearchResult =>
                new SearchResult(this, _id, name)
        );
    }

    async info(id: string): Promise<AnimeInfo> {
        const info = await this.source.info(id);

        return new AnimeInfo(this, { ...info, id: info._id });
    }

    async episodes(
        id: string,
        type: Filter.VideoType
    ): Promise<Array<Episode>> {
        const episodes = await this.source.episodes(id, type);

        return episodes.map(
            (episodeId) => new Episode(this, id, episodeId, type)
        );
    }

    async streams({
        animeId,
        episodeId,
        type,
    }: Episode): Promise<Array<Stream>> {
        const streams = await this.source.streams(animeId, episodeId, type);

        return streams.map(({ sourceUrl, sourceName, priority, downloads }) => {
            const downloadsObject: Downloads | undefined = downloads
                ? {
                      name: downloads.sourceName,
                      url: downloads.downloadUrl,
                  }
                : undefined;

            return new Stream({
                url: sourceUrl,
                name: sourceName,
                priority,
                downloads: downloadsObject,
            });
        });
    }
}
