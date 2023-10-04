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

export const GET_USER_SAVED_ACTIVITIES = gql`
  query GetUserSavedActivities($userId: ID!) {
    getUserSavedActivities(userId: $userId) {
      id
      activity {
        activity
        type
        participants
        price
      }
      isCompleted
    }
  }
`;


export const GET_TOP_USERS = gql`
  query GetTopUsers {
    getTopUsers {
      id
      username
      points
    }
  }
`;


