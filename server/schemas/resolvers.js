const { User } = require("../models");
const { Activity } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { AuthenticationError } = require('apollo-server-errors');

require("dotenv").config();

const resolvers = {
  Query: {
    user: async (_, { ID }) => await User.findById(ID),
    users: async () => await User.find(),
    authenticatedUser: async (_, __, context) => {
      const { user } = context;

      if (!user) {
        throw new Error("Authentication required to fetch authenticated user");
      }

      return await User.findById(user._id);
    },
    getUserPreferences: async (_, { id }) => await User.findById(id),
  },
  Mutation: {
    async registerUser(_, { registerInput: { username, email, password } }) {
      console.log("registerInput:", { username, email, password });

      const user = await User.findOne({ email });

      if (user) {
        throw new Error(
          "A user with this email already exists" + email,
          "User_Already_Exists"
        );
      }

      var encryptedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username: username,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });

      const token = jwt.sign(
        { user_id: newUser._id, email, username: newUser.username },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h",
        }
      );
      console.log(token);  


      newUser.token = token;

      console.log(newUser);

      const res = await newUser.save();
      return {
        id: res.id,
        name: res.name,
        ...res._doc,
      };
    },
    async loginUser(_, { loginInput: { email, password } }) {
      const user = await User.findOne({ email });
      console.log(user);
    
      if (user && (await bcrypt.compare(password, user.password))) {
        console.log("passwords match");
        const token = jwt.sign(
          { user_id: user._id, email, username: user.username },
          process.env.JWT_SECRET,
          {
            expiresIn: "2h",
          }
        );
    
        user.token = token;
    
        const returnObject = {
          id: user.id,
          username: user.username,
          token: token,  // Include token explicitly
          ...user._doc,
        };
        console.log(returnObject);  // Add this
        return returnObject;
      } else {
        throw new Error("Invalid login credentials", "INVALID_CREDENTIALS");
      }
    },
    
    async updateUserPreferences(_, { input }) {
      const { id, interest, age, location, skillLevel } = input;

      const user = await User.findById(id);
      if (!user) {
        throw new Error("User not found");
      }

      user.interest = interest || user.interest;
      user.age = age || user.age;
      user.location = location || user.location;
      user.skillLevel = skillLevel || user.skillLevel;

      await user.save();

      return user;
    },
  
    saveActivity: async (_parent, { activityId }, context, _info) => {
      // Log the headers at the start of the resolver
      console.log(context.headers);
    
      if (!context.user) {
        throw new AuthenticationError("Authentication required to save activity");
      }
    
      // check if the user exists
      const userFromDb = await User.findById(context.user._id); // use user._id from context instead of userId from input
      if (!userFromDb) {
        throw new Error("User not found");
      }
    
      // check if the activity exists
      const activity = await Activity.findById(activityId);
      if (!activity) {
        throw new Error("Activity not found");
      }
    
      // check if the activity already exists in the user's saved activities
      const isActivityExists = userFromDb.savedActivities.some(
        (savedActivity) => savedActivity.toString() === activityId
      );
    
      // if the activity does not exist in user's saved activities, add it
      if (!isActivityExists) {
        userFromDb.savedActivities.push(activityId);
        await userFromDb.save();
      }
    
      return userFromDb;
    },
    
  },
};

module.exports = resolvers;


