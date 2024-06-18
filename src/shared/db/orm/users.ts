import { db } from "../db";
import { NewUser, UserUpdate } from "../tables";

export const getUserById = async (id: string) => {
  return await db
    .selectFrom("users")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
};

export const getUserByEmail = async (email: string) => {
  return await db
    .selectFrom("users")
    .where("email", "=", email)
    .selectAll()
    .executeTakeFirst();
};

export const getUserByUsername = async (username: string) => {
  return await db
    .selectFrom("users")
    .where("username", "=", username)
    .selectAll()
    .executeTakeFirst();
};

export const createUser = async (user: NewUser) => {
  return await db
    .insertInto("users")
    .values(user)
    .returningAll()
    .executeTakeFirst();
};

export const updateUser = async (id: string, user: UserUpdate) => {
  return await db.updateTable("users").set(user).where("id", "=", id).execute();
};

export const deleteUser = async (id: string) => {
  return await db
    .deleteFrom("users")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
};
