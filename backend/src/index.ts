import { MikroORM } from "@mikro-orm/core";
import { __prod__, COOKIE_ID } from "./constants";
import config from "./mikro-orm.config";
// import { Post } from "./entities/Post";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolvers/Post";
import RedisStore from "connect-redis";
import session from "express-session";
import { createClient } from "redis";
import { MyContext } from "./types";
import { UserResolver } from "./resolvers/User";

const main = async () => {
  const orm = await MikroORM.init(config);
  await orm.getMigrator().up();

  const app = express();
  const redisClient = createClient();
  redisClient.connect().catch(console.error);

  const redisStore = new RedisStore({
    client: redisClient,
    prefix: "Tweetbot:",
    disableTouch: true,
  });

  app.use(
    session({
      name: COOKIE_ID,
      store: redisStore,
      resave: false, // required: force lightweight session keep alive (touch)
      saveUninitialized: false, // recommended: only save session when data exists
      secret: "a very difficult to keep secret",
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: "none",
        secure: __prod__,
      },
    }),
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({
      em: orm.em.fork(),
      req: req,
      res: res,
    }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: ["https://studio.apollographql.com", "http://localhost:3000"],
    },
  });

  app.get("/", (_, res) => {
    res.send("hello");
  });

  app.listen(4000, () => {
    console.log("Listening on Port 4000");
  });
};

main().catch((error) => {
  console.log(error);
});
