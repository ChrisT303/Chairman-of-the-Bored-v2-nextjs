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
  mutation UpdateUserPreferences(
    $preferenceInput: UserPreferenceInput!
  ) {
    updateUserPreferences(
      preferenceInput: $preferenceInput
    ) {
      successMessage
      errorMessage
    }
  }
`;

