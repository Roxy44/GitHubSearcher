import { gql } from '@apollo/client';

export const SEARCH_REPOSITORIES = gql`
  query SearchRepositories($query: String!) {
    search(query: $query, type: REPOSITORY, first: 100) {
      edges {
        node {
          ... on Repository {
            name
            stargazerCount
            pushedAt
            url
          }
        }
      }
    }
  }
`;