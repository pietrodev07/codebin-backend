import { SnippetsTable } from "./snippets.table";
import { UsersTable } from "./users.table";

export interface Database {
  users: UsersTable;
  snippets: SnippetsTable;
}

export * from "./users.table";
export * from "./snippets.table";
