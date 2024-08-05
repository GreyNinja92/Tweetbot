import { defineConfig, PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Post } from "./entities/Post";
import { __prod__ } from "./constants";
import { Migrator } from "@mikro-orm/migrations";
import { User } from "./entities/User";

export default defineConfig({
  entities: [Post, User],
  dbName: "Tweetbot",
  driver: PostgreSqlDriver,
  debug: !__prod__,
  extensions: [Migrator],
});
