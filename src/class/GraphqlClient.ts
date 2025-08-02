import { GQLQuery } from "./GQLQuery.js";

export class GraphqlClient {
    constructor(
        private url: string,
        private opts: Record<string, unknown> = { method: "GET" },
    ) {}

    async query(
        query: GQLQuery,
        variables: Record<string, unknown> = {},
    ): Promise<Record<string, unknown>> {
        const response = await fetch(this.url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            ...this.opts,
            body: JSON.stringify({
                query: query.toString(),
                variables,
            }),
        });

        if (!response.ok) {
            throw new Error(`GraphQL query failed: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.errors) {
            throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
        }

        return data.data;
    }
}
