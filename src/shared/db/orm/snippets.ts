import { db } from "../db";
import { NewSnippet, SnippetUpdate } from "../tables";

export const getAll = async (userId: string) => {
  return await db
    .selectFrom("snippets")
    .where("userId", "=", userId)
    .selectAll()
    .execute();
};

export const get = async (snippetId: string, userId?: string) => {
  let baseQuery = db.selectFrom("snippets");

  if (userId) {
    baseQuery = baseQuery.where("userId", "=", userId);
  } else {
    baseQuery = baseQuery.where("type", "=", "public");
  }

  return await baseQuery
    .where("id", "=", snippetId)
    .selectAll()
    .executeTakeFirst();
};

export const create = async (snippet: NewSnippet) => {
  return await db
    .insertInto("snippets")
    .values(snippet)
    .returningAll()
    .executeTakeFirst();
};

export const edit = async (
  userId: string,
  snippetId: string,
  snippet: SnippetUpdate
) => {
  return await db
    .updateTable("snippets")
    .set(snippet)
    .where("userId", "=", userId)
    .where("id", "=", snippetId)
    .returningAll()
    .executeTakeFirst();
};

export const remove = async (userId: string, snippetId: string) => {
  return await db
    .deleteFrom("snippets")
    .where("userId", "=", userId)
    .where("id", "=", snippetId)
    .returningAll()
    .executeTakeFirst();
};
