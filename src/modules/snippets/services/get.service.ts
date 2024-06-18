import { Context } from "hono";
import { getSnippet } from "../../../shared/db/orm/snippets";

export const getSnippetService = async (c: Context) => {
  const user = c.get("user_data");
  const { id } = c.req.param();

  const fetchedSnippet = await getSnippet(user.id, id);
  if (!fetchedSnippet) {
    return c.json({
      success: false,
      message: "Snippet given not exist!",
    });
  }

  return c.json({
    success: true,
    message: `Snippet ${fetchedSnippet?.title} fetched successfully!`,
    data: fetchedSnippet,
  });
};
