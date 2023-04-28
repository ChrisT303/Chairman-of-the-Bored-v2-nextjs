import { ApolloServer } from "apollo-server-micro";
import { typeDefs, resolvers } from "../../server/schemas";
import dbConnect from "../../server/utils/dbConnect"; 
import AuthService from "../../server/utils/auth";
import expressPlayground from "graphql-playground-middleware-express";


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    if (!req.headers) {
      console.warn("Request has no headers, skipping context.");
      return {};
    }
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ").pop()
      : "";
    const user = AuthService.verifyToken(token);
    return { req, user };
  },
});

const startServer = server.start();

const playground = expressPlayground({
  endpoint: "/api/graphql",
});


export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  if (req.method === "GET") {
    return playground(req, res);
  }

  try {
    await startServer;
    await dbConnect();
    console.log("Server is starting up...");

    return server.createHandler({ path: "/api/graphql" })(req, res);
  } catch (error) {
    console.error("Error in handler:", error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
}



export const config = {
  api: {
    bodyParser: false,
  },
};