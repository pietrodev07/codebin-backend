import { Context } from "hono";
import { UpdateSnippetBody } from "../schemas/update.schema";
import { getSnippet, updateSnippet } from "@/db/orm/snippets";

export const updateSnippetService = async (c: Context) => {
  const { title, description, language, type, code } =
    await c.req.json<UpdateSnippetBody>();

  const { id } = c.req.param();
  const user = c.get("user_data");

  const fetchedSnippet = await getSnippet(user.id, id);
  if (!fetchedSnippet) {
    return c.json({
      success: false,
      message: "Snippet given not exist!",
    });
  }

  const updatedSnippet = await updateSnippet(user.id, fetchedSnippet.id, {
    title,
    description,
    language,
    type,
    code,
  });

  return c.json({
    success: true,
    message: `Snippet ${updatedSnippet?.title} updated successfully!`,
  });
};
