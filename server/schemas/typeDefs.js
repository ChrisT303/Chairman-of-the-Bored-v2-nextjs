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
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput!): User
    updateUserPreferences(input: UserPreferenceInput!): User
  }
`;

module.exports = typeDefs;
