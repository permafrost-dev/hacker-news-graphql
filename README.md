# Hacker News GraphQL server

<p align="center">
    <img src="https://codecov.io/gh/permafrost-dev/hacker-news-graphql/branch/main/graph/badge.svg?token=7QchRpYsX1" alt="codecov" />
</p>

## Development setup

Create a `.env` file in the project directory:

```
NODE_ENV=development
PORT=3000
HACKERNEWS_API_URL=https://hacker-news.firebaseio.com/v0
CACHE_DRIVER=memory
```

_The `CACHE_DRIVER` variable can be either `memory` or `redis` - if `redis`, then a Redis service is assumed to be running._


Then install the dependencies and run `start:dev`, which both builds the application using `esbuild` and runs it:

```bash
npm install
npm run start:dev
```

Browse to `http://127.0.0.1:3000/graphql` in your browser to open the GraphiQL explorer.


## Examples

Return the first 5 top stories from HN:

```gql
query {
  stories(first: 5, kind: TOP) {
    title
    url
    time
    commentCount
    score
    author {
      id
      karma
    }
    comments(first: 2) {
      author {
        id
        karma
      }
      time
      text
    }
  }
}
```


## Running tests

To run the tests successfully, you need to start the test http server first, which returns the data stored in `tests/fixtures`.

Once the test http server is running, you may run the jest test suite using `npm run test`.

```bash
cd tests/server
npm install
cd -
node tests/server/index.js &
npm run test
```

