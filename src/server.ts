import { readFileSync } from "fs";
import { join, resolve } from "path";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import http from "http";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
require("dotenv").config();

// LOCAL MODULES
import connectDB from "./config/connectDB";
import resolvers from "./graphql/resolvers";
import context from "./graphql/context";
import verifyUserAuthorization from "./middlewares/verifyUserAuthorization";

const typeDefs = readFileSync(
  join(__dirname, "/graphql/schema.graphql"),
  "utf-8"
);

const startApolloServer = async (
  typeDefs: string,
  resolvers: any,
  context: any
) => {
  const app = express();
  const PORT = process.env.PORT || 4000;

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    introspection: true,
  });

  await server.start();
  app.use(cookieParser());
  app.use(verifyUserAuthorization);

  app.use(express.static("client/build"));
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(resolve(__dirname, "../client/build", "index.html"));
  });

  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: "https://captured-socmed.vercel.app",
    },
  });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );

  console.log(`Server ready at port ${PORT}`);
};

connectDB().then(() => {
  startApolloServer(typeDefs, resolvers, context);
});
