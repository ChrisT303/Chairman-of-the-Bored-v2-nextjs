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

export const DELETE_ACTIVITY = gql`
  mutation DeleteActivity($activityId: ID!) {
    deleteActivity(activityId: $activityId) {
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

export const INCREMENT_USER_POINTS = gql`
  mutation IncrementUserPoints($userId: ID!) {
    incrementUserPoints(userId: $userId) {
      id
      points
    }
  }
`;

export const COMPLETE_ACTIVITY = gql`
  mutation CompleteActivity($activityId: ID!) {
    markActivityAsCompleted(activityId: $activityId) {
      id
      isCompleted
    }
  }
`;


export const MARK_ACTIVITY_AS_INCOMPLETE = gql`
  mutation MarkActivityAsIncomplete($activityId: ID!) {
    markActivityAsIncomplete(activityId: $activityId) {
      id
      isCompleted
      
    }
  }
`;

export const DEDUCT_POINTS = gql`
  mutation DeductPoints($userId: ID!) {
    deductPoints(userId: $userId) {
      id
      points
    }
  }
`;















