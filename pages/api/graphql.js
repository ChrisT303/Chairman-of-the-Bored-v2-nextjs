import { ApolloServer } from "apollo-server-micro";
import { typeDefs, resolvers } from "../../server/schemas";
import dbConnect from "../../server/utils/dbConnect";
import AuthService from "../../server/utils/auth";
import expressPlayground from "graphql-playground-middleware-express";
import nextConnect from 'next-connect';

// Add the requestLoggerPlugin
const requestLoggerPlugin = {
  requestDidStart(requestContext) {
    console.log("Request started! Query:\n", requestContext.request.query);
    console.log("Variables:\n", requestContext.request.variables);
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    if (!req || !req.headers) {
      console.warn("Request has no headers, skipping context.");
      return {};
    }
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ").pop()
      : "";
    console.log('Token from headers:', token);
    const user = await AuthService.verifyToken(token);
    console.log('User from token:', user);
    return { req, user };
  },
  
  
  plugins: [requestLoggerPlugin], // Add the plugin to the server instance
});


const playground = expressPlayground({
  endpoint: "/api/graphql",
});

const apiRoute = nextConnect();

apiRoute.all(async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  if (req.method === "GET") {
    return playground(req, res);
  }

  try {
    await dbConnect();
    console.log("Connecting to database...");

    const { method, body } = req;
    const response = await server.executeOperation({
      query: body.query,
      variables: body.variables,
      operationName: body.operationName,
      context: { req },
    });
    
    
    
    

    return res.json(response);
  } catch (error) {
    console.error("Error in handler:", error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: true,
  },
};
