import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { getGithubAuthHeaders } from "../shared/lib/githubAuth";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.github.com/graphql",
    headers: getGithubAuthHeaders(),
  }),
  cache: new InMemoryCache(),
});

export default client;
