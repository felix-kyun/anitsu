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

/*
 * extracted schema
shows(
    search: SearchInput
    page: Int
    offset: Int
    limit: Int
    translationType: VaildTranslationTypeEnumType
    countryOrigin: VaildCountryOriginEnumType
    queryAt: String
): ShowsConnection!

type ShowsConnection {
  edges: [Show!]
  pageInfo: PageInfo!
}

type Show {
  _id: String
  updateQueue: BigInt
  isAdult: Boolean
  manualUpdated: Boolean
  dailyUpdateNeeded: Boolean
  hidden: Boolean
  lastUpdateStart: DateTime
  lastUpdateEnd: DateTime
  name: String
  englishName: String
  nativeName: String
  nameOnlyString: String
  countryOfOrigin: VaildCountryOriginEnumType
  malId: BigInt
  aniListId: BigInt
  status: String
  altNames: [String]
  trustedAltNames: [String]
  description: String
  prevideos: [String]
  thumbnail: String
  banner: String
  thumbnails: [String]
  musics: [Object]
  score: Float
  type: String
  averageScore: Float
  genres: [String]
  tags: [String]
  popularity: BigInt
  airedStart: Object
  airedEnd: Object
  season: Object
  rating: String
  broadcastInterval: BigInt
  relatedShows: [Object]
  relatedMangas: [Object]
  characters: [Object]
  pageStatus: PageStatus
  determinedInterval: Object
  slugTime: BigInt
  episodeCount: BigInt
  episodeDuration: BigInt
  studios: [String]
  nextAiringEpisode: Object
  lastEpisodeDate: Object
  lastEpisodeTimestamp: Object
  lastEpisodeInfo: Object
  availableEpisodes: Object
  availableEpisodesDetail: Object
  disqusIds: Object
}

type PageInfo {
  hasNextPage: Boolean
  nextPage: Int
  prevPage: Int
  total: Int
  offset: Int
  limit: Int
  totalPages: Int
  page: Int
  hasPrevPage: Boolean
}

 */
