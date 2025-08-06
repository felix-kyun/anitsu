import { BaseProvider } from "../provider/BaseProvider.js";
import { EmbedData } from "./EmbedData.js";
import { Filters } from "./Filters.js";
import { Stream } from "./Stream.js";

export class Episode {
    constructor(
        public provider: BaseProvider,
        public animeId: string,
        public episodeId: string,
        public type: Filters.VideoType,
    ) {}

    async getStreams(): Promise<Array<Stream>> {
        return this.provider.streams(this);
    }

    async getEmbeds(): Promise<Array<EmbedData>> {
        return this.provider.embeds(this);
    }
}
