import { Context } from "hono";
import { snippets } from "@/db/orm";

export const getPublicSnippet = async (c: Context) => {
  const { id } = c.req.param();

  const fetchedSnippet = await snippets.get(id);
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
