import { UsersTable } from "./users.table";

export interface Database {
  users: UsersTable;
}

export { User, UserUpdate, NewUser } from "./users.table";
