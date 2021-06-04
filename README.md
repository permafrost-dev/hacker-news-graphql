# Hacker News GraphQL server

<p align="center">
    <img src="https://codecov.io/gh/permafrost-dev/hacker-news-graphql/branch/main/graph/badge.svg?token=7QchRpYsX1" alt="codecov" />
</p>

## Development setup

```bash
npm install
npm run start:dev
```

Browse to `http://127.0.0.1:3000/graphql` in your browser to open the GraphiQL explorer.


## Examples

Return the first 5 top stories from HN:

```gql
query {
  stories(first: 5, kind: TOP}) {
    title
    url
    time
    author {
      id
    }
  }
}
```
