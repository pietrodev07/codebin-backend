import { Hono } from "hono";
import { authRoutes } from "@/auth/routes/auth.routes";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { snippetsRoutes } from "@/snippets/routes/snippets.routes";
import { cors } from "hono/cors";
import { corsConfig } from "../config";

export const bootstrapApplication = () => {
  const app = new Hono();

  app.use(cors(corsConfig));

  app.use("/auth/me", authMiddleware);
  app.use("/auth/logout", authMiddleware);
  app.use("/snippets/private/*", authMiddleware);

  app.route("/auth", authRoutes);
  app.route("/snippets", snippetsRoutes);

  app.onError((_, c) => {
    return c.json({ success: false, error: "Internal Server Error" });
  });

  return app;
};
