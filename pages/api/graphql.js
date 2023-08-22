import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs, resolvers } from "../../server/schemas";
import dbConnect from "../../server/utils/dbConnect";
import AuthService from "../../server/utils/auth";
import expressPlayground from "graphql-playground-middleware-express";

const requestLoggerPlugin = {
  requestDidStart(requestContext) {
    console.log("Request context is:\n", requestContext.request.context);
    console.log("Request started! Query:\n", requestContext.request.query);
    console.log("Variables:\n", requestContext.request.variables);
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [requestLoggerPlugin],
});

const playground = expressPlayground({
  endpoint: "/api/graphql",
});


const onAppStart = async () => {
  try {
    await dbConnect();
    console.log("Connecting to database...");
  } catch (error) {
    console.error("Error in handler:", error);
  }
};

onAppStart();

const validateUser = (fn) => async (req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  if (req.method === "GET") {
    return playground(req, res);
  }

  console.log("Incoming request:", req.method);
  console.log("Request headers:", req.headers);

  // verify and attach user to req object
  if (req.headers) {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ").pop()
      : "";
    console.log("Authorization header:", req.headers.authorization);
    console.log("Token:", token);
    req.user = await AuthService.verifyToken(token);
    console.log("User from token:", req.user); // Log the user extracted from token
  }
  await fn(req, res);
};

export default validateUser(
  startServerAndCreateNextHandler(server, {
    context: async (req, res) => ({
      req,
      res,
      user: req.user,
    }),
  })
);

export const config = {
  api: {
    bodyParser: true,
  },
};
