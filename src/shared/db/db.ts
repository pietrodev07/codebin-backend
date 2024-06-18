import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";
import { Database } from "./tables";
import { databaseConfig } from "../config";

const { database, host, user, password, port } = databaseConfig;

const dialect = new PostgresDialect({
  pool: new Pool({
    database,
    host,
    user,
    password,
    port,
  }),
});

export const db = new Kysely<Database>({ dialect });
