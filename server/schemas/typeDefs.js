const { gql } = require("apollo-server-micro");

const typeDefs = gql`
  type User {
    id: ID!
    username: String
    email: String
    password: String
    token: String
    interest: String
    age: Int
    location: String
    skillLevel: String
    savedActivities: [SavedActivity]
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

  input UserPreferenceInput {
    id: ID!
    interest: String
    age: Int
    location: String
    skillLevel: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
    authenticatedUser: User
    getUserPreferences(id: ID!): User
    getUserSavedActivities(userId: ID!): [SavedActivity]
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput!): User
    updateUserPreferences(input: UserPreferenceInput!): User
    saveActivity(userId: ID!, activity: ActivityInput!): User
  }

  input ActivityInput {
    activity: String!
    type: String!
    participants: Int!
    price: Float!
    link: String
    key: String
    accessibility: Float
  }

  type SavedActivity {
    id: ID!
    userId: ID!
    activity: Activity!
  }

  type Activity {
    activity: String!
    type: String!
    participants: Int!
    price: Float!
  }
`;

module.exports = typeDefs;
