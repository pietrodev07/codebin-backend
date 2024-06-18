import * as path from "path";
import { promises as fs } from "fs";
import { error, success } from "kittylog";
import { Migrator, FileMigrationProvider } from "kysely";
import { db } from "./db";
import { migrationFolder } from "../config";

export async function migrateToLatest() {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, migrationFolder),
    }),
  });

  const { error: err, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === "Success") {
      success(`Migration "${it.migrationName}" was executed successfully!`);
    } else if (it.status === "Error") {
      error(`Failed to execute migration "${it.migrationName}"!`);
    }
  });

  if (err) {
    error("Failed to apply migrations!");
    console.log(err);
    process.exit(1);
  }
}
