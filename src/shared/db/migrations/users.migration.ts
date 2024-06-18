import { Kysely, sql } from "kysely";
import { Database } from "../tables";

export const up = async (db: Kysely<Database>) => {
  await db.schema
    .createTable("users")
    .addColumn("id", "uuid", (cb) =>
      cb.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("email", "varchar", (cb) => cb.notNull())
    .addColumn("username", "varchar", (cb) => cb.notNull())
    .addColumn("password", "varchar", (cb) => cb.notNull())
    .addColumn("currentVerifyToken", "varchar", (cb) =>
      cb.notNull().defaultTo("")
    )
    .addColumn("currentResetToken", "varchar", (cb) =>
      cb.notNull().defaultTo("")
    )
    .addColumn("verified", "boolean", (cb) => cb.notNull().defaultTo(false))
    .addColumn("createdAt", "timestamp", (cb) =>
      cb.notNull().defaultTo(sql`now()`)
    )
    .addColumn("updatedAt", "timestamp", (cb) =>
      cb.notNull().defaultTo(sql`now()`)
    )
    .execute();
};
