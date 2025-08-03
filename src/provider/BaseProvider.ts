import { AnimeInfo } from "../class/AnimeInfo.js";
import { Episode } from "../class/Episode.js";
import { Filter } from "../class/Filter.js";
import { SearchResult } from "../class/SearchResult.js";
import { Stream } from "../class/Stream.js";

export abstract class BaseProvider {
    public name: string = "";

    /*
     * Query the provider for a list of anime.
     */
    abstract search(query: string): Promise<Array<SearchResult>>;

    /*
     * Query the provider for a list of anime by id.
     */
    abstract info(id: string): Promise<AnimeInfo>;

    /*
     * Query the provider for a list of episodes by id.
     */
    abstract episodes(
        id: string,
        type: Filter.VideoType
    ): Promise<Array<Episode>>;

    /*
     * Get list of video streams for an episode.
     */
    abstract streams(episode: Episode): Promise<Array<Stream>>;
}
