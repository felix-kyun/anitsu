import { BaseProvider } from "../provider/BaseProvider.js";
import { Filter } from "./Filter.js";
import { Stream } from "./Stream.js";

export class Episode {
    constructor(
        public provider: BaseProvider,
        public animeId: string,
        public episodeId: string,
        public type: Filter.VideoType
    ) {}

    async getStreams(): Promise<Array<Stream>> {
        return this.provider.streams(this);
    }
}
