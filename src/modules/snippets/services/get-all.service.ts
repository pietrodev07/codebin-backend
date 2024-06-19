import { Context } from "hono";
import { getSnippets } from "@/db/orm/snippets";

export const getSnippetsService = async (c: Context) => {
  const user = c.get("user_data");
  const fetchedSnippets = await getSnippets(user.id);

  return c.json({
    success: true,
    message: "Snippets fetched successfully",
    data: fetchedSnippets,
  });
};
