import { Context } from "hono";
import { UpdateSnippetBody } from "../schemas/update.schema";
import { snippets } from "@/db/orm";

export const editSnippet = async (c: Context) => {
  const snippetBody = await c.req.json<UpdateSnippetBody>();
  const user = c.get("user_data");
  const { id } = c.req.param();

  const fetchedSnippet = await snippets.get(id, user.id);
  if (!fetchedSnippet) {
    return c.json({
      success: false,
      message: "Snippet with given id does not exist!",
    });
  }

  await snippets.edit(user.id, fetchedSnippet.id, snippetBody);

  return c.json({
    success: true,
    message: "Snippet updated successfully",
  });
};
