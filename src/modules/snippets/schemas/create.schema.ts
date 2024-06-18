import { z } from "zod";

export interface CreateSnippetBody {
  title: string;
  description: string;
  language: string;
  code: string;
  type: "public" | "private";
}

export const createSnippetBodySchema = z.object({
  title: z.string().min(5),
  description: z.string().min(5),
  language: z.string(),
  code: z.string(),
  type: z.union([z.literal("public"), z.literal("private")]),
});
