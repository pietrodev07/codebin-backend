import { z } from "zod";

export interface UpdateSnippetBody {
  title: string;
  description: string;
  language: string;
  code: string;
  type: "public" | "private";
}

export const updateSnippetBodySchema = z.object({
  title: z.string(),
  description: z.string(),
  language: z.string(),
  code: z.string(),
  type: z.union([z.literal("public"), z.literal("private")]),
});
