const apiUrl = "https://api.allanime.day/api";

fetch(`${apiUrl}`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Referer: "https://allmanga.to/",
    },
    body: JSON.stringify({
        query: `
query Shows($search: SearchInput) {
  shows(search: $search) {
    edges {
      name
    }
  }
}
`,
        variables: {
            search: {
                query: "one piece",
            },
        },
    }),
})
    .then((res) => res.json())
    .then((data) => console.dir(data, { depth: null }));
