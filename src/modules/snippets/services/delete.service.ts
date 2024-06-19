import { Context } from "hono";
import { deleteSnippet, getSnippet } from "@/db/orm/snippets";

export const deleteSnippetService = async (c: Context) => {
  const { id } = c.req.param();
  const user = c.get("user_data");

  const fetchedSnippet = await getSnippet(user.id, id);
  if (!fetchedSnippet) {
    return c.json({
      success: false,
      message: "Snippet given not exist!",
    });
  }

  await deleteSnippet(user.id, fetchedSnippet.id);

  return c.json({
    success: true,
    message: `Snippet ${fetchedSnippet?.title} deleted successfully!`,
  });
};
