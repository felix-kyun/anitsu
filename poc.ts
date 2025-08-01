const searchQuery = `
    query( $search: SearchInput
           $limit: Int
           $page: Int
           $translationType: VaildTranslationTypeEnumType
           $countryOrigin: VaildCountryOriginEnumType )
    {
        shows( search: $search
                limit: $limit
                page: $page
                translationType: $translationType
                countryOrigin: $countryOrigin )
        {
            edges 
            {
                _id,
                name,
                availableEpisodes
            }
        }
    }
`;
const apiUrl = "https://api.allanime.day/api";

const variables = {
    search: {
        query: "Naruto",
    },
    limit: 10,
    page: 1,
    // translationType: "SUB",
    countryOrigin: "ALL",
};

const params = new URLSearchParams({
    variables: JSON.stringify(variables),
    query: searchQuery,
}).toString();

console.log(params);

fetch(`${apiUrl}?${params}`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Referer: "https://allmanga.to/",
    },
})
    .then((res) => res.json())
    .then((data) => console.log(data.data.shows.edges));
