import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($loginInput: LoginInput!) {
    loginUser(loginInput: $loginInput) {
      email
      username
      token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation Mutation($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      email
      username
      token
    }
  } 
`;


export const UPDATE_USER_PREFERENCES = gql`
  mutation UpdateUserPreferences($userPreferenceInput: UserPreferenceInput!) {
    updateUserPreferences(input: $userPreferenceInput) {
      id
      interest
      age
      location
      skillLevel
    }
  }
`;

export const SAVE_ACTIVITY = gql`
  mutation SaveActivity($userId: ID!, $activity: ActivityInput!) {
    saveActivity(userId: $userId, activity: $activity) {
      id
      savedActivities {
        id
        activity {
          activity
          type
          participants
          price
        }
      }
    }
  }
`;





