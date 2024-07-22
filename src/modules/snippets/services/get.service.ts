import { Context } from "hono";
import { snippets } from "@/db/orm";

export const getPrivateSnippet = async (c: Context) => {
  const user = c.get("user_data");
  const { id } = c.req.param();

  const fetchedSnippet = await snippets.get(id, user.id);
  if (!fetchedSnippet) {
    return c.json({
      success: false,
      message: "Snippet with given id does not exist!",
    });
  }

  return c.json({
    success: true,
    message: "Snippet fetched successfully!",
    data: fetchedSnippet,
  });
};
