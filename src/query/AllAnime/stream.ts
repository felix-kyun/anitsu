import { GQLQuery } from "../../class/GQLQuery";

export const stream = new GQLQuery(
    `
query Episode(
    $showId: String!, 
    $episodeString: String!,
    $translationType: VaildTranslationTypeEnumType!) 
{
    episode(
        showId: $showId, 
        episodeString: $episodeString, 
        translationType: $translationType) 
    {
        sourceUrls
    }
}
`,
);
