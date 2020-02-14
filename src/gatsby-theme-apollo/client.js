import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { createUploadLink } from "apollo-upload-client"
import { onError } from "apollo-link-error"
import { ApolloLink } from "apollo-link"
import fetch from "isomorphic-fetch"

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        )
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }),
    new createUploadLink({
      uri: "http://localhost:4000/graphql",
      credentials: "include",
      fetch,
    }),
  ]),
  cache: new InMemoryCache(),
})

export default client