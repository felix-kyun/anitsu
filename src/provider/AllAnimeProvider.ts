import { AnimeInfo } from "../class/AnimeInfo";
import { Episode } from "../class/Episode";
import { SearchResult } from "../class/SearchResult";
import { Stream } from "../class/Stream";
import { AllAnimeSource } from "../source/AllAnimeSource";
import { AllAnimeSearchResult } from "../type/AllAnimeTypes";
import { BaseProvider } from "./BaseProvider";

export class AllAnimeProvider extends BaseProvider {
    private source = new AllAnimeSource();
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

        return new AnimeInfo({ ...info, id: info._id });
    }

    async episodes(id: string): Promise<Array<Episode>> {
        return [];
    }

    async streams(episode: Episode): Promise<Array<Stream>> {
        return [];
    }
}
