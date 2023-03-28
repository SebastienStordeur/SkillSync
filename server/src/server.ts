import express from "express";
import mongoose from "mongoose";
import path from "path";
import helmet from "helmet";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { loadFilesSync } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";

require("dotenv").config();

const PORT = process.env.PORT || 4000;

/** GraphQL config */
const typesArray = loadFilesSync(path.join(__dirname, "**/*.graphql"));
const resolversArray = loadFilesSync(path.join(__dirname, "**/*.resolvers.ts"));

/** mongoDB connection */
const MONGO_URL = process.env.MONGO_URL!;

mongoose.connection.on("open", (err) => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function startAppoloServer() {
  const app = express();

  const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray,
  });

  const server = new ApolloServer({ schema });

  await server.start();
  await mongoose.connect(MONGO_URL);
  server.applyMiddleware({ app, path: "/graphql" });

  app.use(helmet());
  app.use(cors());

  app.listen(PORT, () => {
    console.log(`GraphQL server is running on port ${PORT}`);
  });
}

startAppoloServer();
