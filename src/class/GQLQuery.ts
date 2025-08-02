// GQLQuery class to handle GraphQL queries with parameters
export class GQLQuery {
    // initialize with query string and fields set to @params
    constructor(
        private query: string,
        private _params: Array<string> = [],
    ) {}

    // method to set @params
    set params(params: Array<string>) {
        this._params.push(...params);
    }

    toString(): string {
        return this.query.replace("@params", this._params.join("\n"));
    }
}
