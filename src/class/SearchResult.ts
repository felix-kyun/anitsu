import { BaseProvider } from "../provider/BaseProvider";
import { AnimeInfo } from "./AnimeInfo";

export class SearchResult {
    constructor(
        public provider: BaseProvider,
        public id: string,
        public title: string
    ) {}

    async getInfo(): Promise<AnimeInfo> {
        return this.provider.info(this.id);
    }
}
