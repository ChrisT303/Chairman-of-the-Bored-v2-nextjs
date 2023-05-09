const { gql } = require("apollo-server-micro");

const typeDefs = gql`
  type User {
    id: ID!
    username: String
    email: String
    password: String
    token: String
  }

  input RegisterInput {
    username: String
    email: String
    password: String
  }

  input LoginInput {
    email: String
    password: String
  }

  type Task {
    activity: String
    type: String
    participants: Int
    price: Int
    link: String
    key: String
    accessibility: Float
  }

  input SavedTaskInput {
    activity: String
    type: String
    participants: Int
    price: Int
    link: String
    key: String
    accessibility: Float
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput!): User
    saveTask(input: SavedTaskInput!): User
    removeTask(key: String!): User
    updateUserPreferences(preferenceInput: UserPreferenceInput!): UpdateUserPreferencesPayload!
  }

  input UserPreferenceInput {
    interest: String
    age: Int
    location: String
    skillLevel: String
  }
  
  type UpdateUserPreferencesPayload {
    successMessage: String
    errorMessage: String
  }
`;

module.exports = typeDefs;
