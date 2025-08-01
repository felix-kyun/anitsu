import { GQLQuery } from "../../type/GQLQuery.js";

export const search: GQLQuery = `
query (
    $search: SearchInput
    $limit: Int
    $page: Int
    $translationType: VaildTranslationTypeEnumType
    $countryOrigin: VaildCountryOriginEnumType
) {
    shows(
        search: $search
        limit: $limit
        page: $page
        translationType: $translationType
        countryOrigin: $countryOrigin
    ) {
        edges {
            _id
            name
            availableEpisodes
        }
    }
}
`;
