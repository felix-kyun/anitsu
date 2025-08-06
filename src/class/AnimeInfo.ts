import { BaseProvider } from "../provider/BaseProvider.js";
import { Episode } from "./Episode.js";
import { Filters } from "./Filters.js";

interface AnimeInfoParams {
    id: string;
    name: string;
    description?: string;
    genres?: Array<string>;
    status?: string;
    thumbnail?: string;
    altName?: string;
}
export class AnimeInfo {
    public id: string;
    public description: string;
    public genres: Array<string>;
    public status: string;
    public thumbnail: string;
    public name: string;
    public altName: string | null;

    constructor(
        public provider: BaseProvider,
        {
            id,
            description = "No Info",
            genres = [],
            status = "",
            thumbnail = "",
            name,
            altName,
        }: AnimeInfoParams,
    ) {
        this.id = id;
        this.name = name;
        this.altName = altName ?? this.name;
        this.description = description;
        this.genres = genres;
        this.thumbnail = thumbnail;
        this.status = status;
    }

    async getEpisodes(type: Filters.VideoType): Promise<Array<Episode>> {
        return this.provider.episodes(this.id, type);
    }
}
