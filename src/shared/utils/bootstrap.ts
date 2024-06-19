import { Hono } from "hono";
import { authRoutes } from "@/auth/routes/auth.routes";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { snippetsRoutes } from "@/snippets/routes/snippets.routes";

export const bootstrapApplication = () => {
  const app = new Hono();

  app.use("/auth/me", authMiddleware);
  app.use("/snippets", authMiddleware);

  app.route("/auth", authRoutes);
  app.route("/snippets", snippetsRoutes);

  app.onError((_, c) => {
    return c.json({ success: false, error: "Internal Server Error" });
  });

  return app;
};
