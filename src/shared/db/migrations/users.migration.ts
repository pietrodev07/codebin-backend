import { Kysely, sql } from "kysely";

import { Database } from "../tables";

export const up = async (db: Kysely<Database>) => {
  await db.schema
    .createTable("users")
    .addColumn("id", "uuid", (cb) =>
      cb.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("email", "varchar", (cb) => cb.notNull().unique())
    .addColumn("username", "varchar", (cb) => cb.notNull().unique())
    .addColumn("password", "varchar", (cb) => cb.notNull())
    .addColumn("verified", "boolean", (cb) => cb.notNull().defaultTo(false))
    .addColumn("currentVerifyToken", "varchar", (cb) =>
      cb.notNull().defaultTo("")
    )
    .addColumn("currentResetToken", "varchar", (cb) =>
      cb.notNull().defaultTo("")
    )
    .addColumn("createdAt", "timestamp", (cb) =>
      cb.notNull().defaultTo(sql`now()`)
    )
    .addColumn("updatedAt", "timestamp", (cb) =>
      cb.notNull().defaultTo(sql`now()`)
    )
    .execute();
};
