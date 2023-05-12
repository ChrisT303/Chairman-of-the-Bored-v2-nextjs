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
