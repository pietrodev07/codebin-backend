import { Context } from "hono";
import { snippets } from "@/db/orm";

export const deleteSnippet = async (c: Context) => {
  const { id } = c.req.param();
  const user = c.get("user_data");

  const fetchedSnippet = await snippets.get(id, user.id);
  if (!fetchedSnippet) {
    return c.json({
      success: false,
      message: "Snippet with given id does not exist!",
    });
  }

  await snippets.remove(user.id, fetchedSnippet.id);

  return c.json({
    success: true,
    message: "Snippet deleted successfully!",
  });
};
