import { Context } from "hono";
import { snippets } from "@/db/orm";

export const getSnippets = async (c: Context) => {
  const user = c.get("user_data");
  const fetchedSnippets = await snippets.getAll(user.id);

  return c.json({
    success: true,
    message: "Snippets fetched successfully",
    data: fetchedSnippets,
  });
};
