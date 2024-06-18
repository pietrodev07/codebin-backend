import { Kysely, sql } from "kysely";
import { Database } from "../tables";

export const up = async (db: Kysely<Database>) => {
  await db.schema
    .createTable("snippets")
    .addColumn("id", "uuid", (cb) =>
      cb.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("title", "varchar", (cb) => cb.notNull())
    .addColumn("description", "varchar", (cb) => cb.notNull())
    .addColumn("language", "varchar", (cb) => cb.notNull())
    .addColumn("code", "varchar", (cb) => cb.notNull())
    .addColumn("type", "varchar", (cb) => cb.notNull())
    .addColumn("userId", "uuid", (cb) => cb.notNull())
    .addColumn("createdAt", "timestamp", (cb) =>
      cb.notNull().defaultTo(sql`now()`)
    )
    .addColumn("updatedAt", "timestamp", (cb) =>
      cb.notNull().defaultTo(sql`now()`)
    )
    .execute();
};
