export interface Downloads {
    url: string;
    name?: string;
}

interface StreamParams {
    url: string;
    name?: string;
    priority?: number;
    downloads?: Downloads;
}

export class Stream {
    public url: string;
    public name: string;
    public priority: number;
    public downloads: Downloads | undefined;

    constructor({ url, name = "", priority = 0, downloads }: StreamParams) {
        this.url = url;
        this.name = name;
        this.priority = priority;
        this.downloads = downloads;
    }
}
