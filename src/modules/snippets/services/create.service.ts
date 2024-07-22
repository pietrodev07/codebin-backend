import { Context } from "hono";

import { snippets } from "@/db/orm";
import { CreateSnippetBody } from "../schemas/create.schema";

export const createSnippet = async (c: Context) => {
  const snippetBody = await c.req.json<CreateSnippetBody>();
  const user = c.get("user_data");

  const getUserSnippets = await snippets.getAll(user.id);
  if (getUserSnippets.length > 20) {
    return c.json({
      success: false,
      message: "You can create maximum 20 snippets with the free account",
    });
  }

  await snippets.create({
    ...snippetBody,
    userId: user.id,
  });

  return c.json({
    success: true,
    message: "Snippet created successfully!",
  });
};
