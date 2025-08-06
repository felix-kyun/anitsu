export interface StreamParams {
    url: string;
    name?: string;
    referrer?: string;
}

export class Stream {
    public url: string;
    public name: string;
    public referrer: string;

    constructor({ url, name = "", referrer = "" }: StreamParams) {
        this.url = url;
        this.name = name;
        this.referrer = referrer;
    }
}
