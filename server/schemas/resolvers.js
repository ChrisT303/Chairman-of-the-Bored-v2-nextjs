const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const resolvers = {
  Query: {
    user: async (_, { ID }) => await UserModel.findById(ID),
    users: async () => await UserModel.find(),
    authenticatedUser: async (_, __, context) => {
      const { user } = context;

      if (!user) {
        throw new Error("Authentication required to fetch authenticated user");
      }

      return await UserModel.findById(user._id);
    },
    getUserPreferences: async (_, { id }) => await UserModel.findById(id)

  },
  Mutation: {
    async registerUser(_, { registerInput: { username, email, password } }) {
      console.log("registerInput:", { username, email, password });

      const user = await UserModel.findOne({ email });

      if (user) {
        throw new Error(
          "A user with this email already exists" + email,
          "User_Already_Exists"
        );
      }

      var encryptedPassword = await bcrypt.hash(password, 10);

      const newUser = new UserModel({
        username: username,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });

      const token = jwt.sign(
        { user_id: newUser._id, email },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h",
        }
      );

      newUser.token = token;

      const res = await newUser.save();
      return {
        id: res.id,
        ...res._doc,
      };
    },
    async loginUser(_, { loginInput: { email, password } }) {
      const user = await UserModel.findOne({ email });
      console.log(user);

      if (user && (await bcrypt.compare(password, user.password))) {
        console.log("passwords match");
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.JWT_SECRET,
          {
            expiresIn: "2h",
          }
        );
        
        user.token = token;

        const res = await user;
        return {
          id: res.id,
          ...res._doc,
        };
      } else {
        throw new Error("Invalid login credentials", "INVALID_CREDENTIALS");
      }
    },
    async updateUserPreferences(_, { input }) {
      const { id, interest, age, location, skillLevel } = input;

      const user = await UserModel.findById(id);
      if (!user) {
        throw new Error('User not found');
      }

      user.interest = interest || user.interest;
      user.age = age || user.age;
      user.location = location || user.location;
      user.skillLevel = skillLevel || user.skillLevel;

      await user.save();

      return user;
    },
  },
};

module.exports = resolvers;

