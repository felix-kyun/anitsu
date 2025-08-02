import { GQLQuery } from "../../class/GQLQuery";

export const info = new GQLQuery(
    `
query Show($id: String!) {
  show(_id: $id) {
    altNames
    description
    genres
    name
    score
    status
    thumbnail
    _id
  }
}
`,
);
