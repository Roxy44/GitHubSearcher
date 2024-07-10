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
            owner {
              login
            }
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORY_INFO = gql`
  query GetRepositoryInfo($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      name
      stargazerCount
      pushedAt
      owner {
        login
        avatarUrl
        url
      }
      languages(first: 10) {
        nodes {
          name
        }
      }
      description
    }
  }
`;