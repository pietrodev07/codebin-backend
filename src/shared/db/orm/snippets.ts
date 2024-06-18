import { db } from "../db";
import { NewSnippet, SnippetUpdate } from "../tables";

export const getSnippets = async (userId: string) => {
  return await db
    .selectFrom("snippets")
    .where("userId", "=", userId)
    .selectAll()
    .execute();
};

export const getSnippet = async (userId: string, snippetId: string) => {
  return await db
    .selectFrom("snippets")
    .where("userId", "=", userId)
    .where("id", "=", snippetId)
    .selectAll()
    .executeTakeFirst();
};

export const createSnippet = async (snippet: NewSnippet) => {
  return await db
    .insertInto("snippets")
    .values(snippet)
    .returningAll()
    .executeTakeFirst();
};

export const updateSnippet = async (
  userId: string,
  snippetId: string,
  snippet: SnippetUpdate
) => {
  return await db
    .updateTable("snippets")
    .set(snippet)
    .where("userId", "=", userId)
    .where("id", "=", snippetId)
    .execute();
};

export const deleteSnippet = async (userId: string, id: string) => {
  return await db
    .deleteFrom("snippets")
    .where("userId", "=", userId)
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
};
