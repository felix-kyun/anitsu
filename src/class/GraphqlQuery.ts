import { GQLQuery } from "../type/GQLQuery.js";

export class GraphqlQuery {
    constructor(
        private url: string,
        private query: GQLQuery,
        private opts: Record<string, unknown> = { method: "GET" },
    ) { }

    async send(variables: Record<string, unknown> = {}): Promise<unknown> {
        // create param string
        const params: URLSearchParams = new URLSearchParams({
            query: this.query,
            variables: JSON.stringify(variables),
        });

        const response: Response = await fetch(
            `${this.url}?${params.toString()}`,
            this.opts,
        );

        if (!response.ok) {
            throw new Error(`GraphQL request failed: ${response.statusText}`);
        }

        return await response.json();
    }
}
