import { BaseProvider } from "../provider/BaseProvider";
import { AnimeInfo } from "./AnimeInfo";
import { Episode } from "./Episode";
import { Filters } from "./Filters";

export class SearchResult {
    constructor(
        public provider: BaseProvider,
        public id: string,
        public title: string,
    ) {}

    async getInfo(): Promise<AnimeInfo> {
        return this.provider.info(this.id);
    }

    async getEpisodes(type: Filters.VideoType): Promise<Array<Episode>> {
        return this.provider.episodes(this.id, type);
    }
}
