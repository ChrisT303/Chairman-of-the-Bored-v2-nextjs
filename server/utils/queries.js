import { gql } from "@apollo/client";

export const AUTHENTICATED_USER = gql`
  query AuthenticatedUser {
    authenticatedUser {
      id
      username
      email
      token
    }
  }
`;

export const GET_USER_PREFERENCES = gql`
  query GetUserPreferences($id: ID!) {
    getUserPreferences(id: $id) {
      interest
      age
      location
      skillLevel
    }
  }
`;
