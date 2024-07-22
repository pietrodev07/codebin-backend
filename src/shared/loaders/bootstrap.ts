import { Hono } from "hono";
import { cors } from "hono/cors";

import { corsConfig } from "@/config/*";
import { authRouter } from "@/auth/routes/auth.routes";
import { brief } from "@/middlewares/brief.middleware";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { snippetsRouter } from "@/snippets/routes/snippets.routes";

export const bootstrapApplication = () => {
  const app = new Hono();

  app.use(cors(corsConfig), brief(app));

  app.use("auth/me", authMiddleware);
  app.use("auth/logout", authMiddleware);
  app.use("snippets/private/*", authMiddleware);

  app.route("/auth", authRouter);
  app.route("/snippets", snippetsRouter);

  app.onError((_, c) => {
    return c.json({ success: false, message: "Internal Server Error" });
  });

  return app;
};
