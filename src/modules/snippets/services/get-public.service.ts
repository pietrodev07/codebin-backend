import { Context } from "hono";
import { getPublicSnippet } from "@/db/orm/snippets";

export const getPublicSnippetService = async (c: Context) => {
  const { id } = c.req.param();

  const fetchedSnippet = await getPublicSnippet(id);
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
