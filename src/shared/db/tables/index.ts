import { SnippetsTable } from "./snippets.table";
import { UsersTable } from "./users.table";

export interface Database {
  users: UsersTable;
  snippets: SnippetsTable;
}

export { User, UserUpdate, NewUser } from "./users.table";
export { Snippet, SnippetUpdate, NewSnippet } from "./snippets.table";
