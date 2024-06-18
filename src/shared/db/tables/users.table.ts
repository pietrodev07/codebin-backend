import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface UsersTable {
  id: Generated<string>;
  email: string;
  username: string;
  password: string;
  currentVerifyToken: Generated<string>;
  currentResetToken: Generated<string>;
  verified: Generated<boolean>;
  createdAt: ColumnType<Date, string | undefined, never>;
  updatedAt: ColumnType<Date, string | undefined, never>;
}

export type User = Selectable<UsersTable>;
export type NewUser = Insertable<UsersTable>;
export type UserUpdate = Updateable<UsersTable>;
