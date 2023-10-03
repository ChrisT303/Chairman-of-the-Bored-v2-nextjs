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
    points: Int!
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
    getTopUsers: [User]
    completedActivities: [Activity]
    getUserSavedActivities(userId: ID!): [SavedActivity]
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput!): User
    updateUserPreferences(input: UserPreferenceInput!): User
    markActivityAsCompleted(activityId: ID!): Activity
    markActivityAsIncomplete(activityId: ID!): Activity
    saveActivity(userId: ID!, activity: ActivityInput!): User
    incrementUserPoints(userId: ID!): User
    deleteActivity(activityId: ID!): User
  }

  input ActivityInput {
    activity: String!
    type: String!
    participants: Int!
    price: Float!
    link: String
    key: String
    accessibility: Float
    isCompleted: Boolean  
  }

  type SavedActivity {
    id: ID!
    userId: ID!
    activity: Activity!
  }

  type Activity {
    id: ID!
    activity: String!
    type: String!
    participants: Int
    price: Float
    isCompleted: Boolean   
  }
`;

module.exports = typeDefs;

