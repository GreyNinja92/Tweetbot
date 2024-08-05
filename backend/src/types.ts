import {
  EntityManager,
  PostgreSqlDriver,
  SqlEntityManager,
} from "@mikro-orm/postgresql";
import { Request, Response } from "express";
import { Session } from "express-session";

export type MyContext = {
  em: EntityManager & SqlEntityManager<PostgreSqlDriver>;
  req: Request & { session?: Session & { userId?: number } };
  res: Response;
};
