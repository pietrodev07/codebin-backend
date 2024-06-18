import { Context } from "hono";
import { CreateSnippetBody } from "../schemas/create.schema";
import { createSnippet, getSnippets } from "../../../shared/db/orm/snippets";

export const createSnippetService = async (c: Context) => {
  const { title, description, language, type, code } =
    await c.req.json<CreateSnippetBody>();

  const user = c.get("user_data");
  const getUserSnippets = await getSnippets(user.id);

  if (getUserSnippets.length > 20) {
    return c.json({
      success: false,
      message: "You can create maxium 20 snippets with the free account",
    });
  }

  const newSnippet = await createSnippet({
    title,
    description,
    language,
    code,
    type,
    userId: user.id,
  });

  return c.json({
    success: true,
    message: `Snippet ${newSnippet?.title} created successfully!`,
  });
};
