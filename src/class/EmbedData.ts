export interface Downloads {
    name: string;
    url: string;
}

export class EmbedData {
    public url: string;
    public name: string;
    public priority: number;
    public className: string;
    public streamerId: string;
    public downloads?: Downloads | undefined;

    constructor({
        url,
        name,
        priority = 0,
        downloads,
        className = "",
        streamerId = "",
    }: {
        url: string;
        name: string;
        priority: number;
        downloads?: Downloads | undefined;
        className: string;
        streamerId: string;
    }) {
        this.url = url;
        this.name = name;
        this.priority = priority;
        this.downloads = downloads;
        this.className = className;
        this.streamerId = streamerId;
    }
}
