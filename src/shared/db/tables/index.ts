import { UsersTable } from "./users.table";
import { SnippetsTable } from "./snippets.table";

export interface Database {
  users: UsersTable;
  snippets: SnippetsTable;
}

export * from "./users.table";
export * from "./snippets.table";
