import { GQLQuery } from "../../class/GQLQuery";

export const episodes = new GQLQuery(
    `
query Episode($id: String!) {
  show(_id: $id) {
    availableEpisodesDetail
  }
}
`,
);
