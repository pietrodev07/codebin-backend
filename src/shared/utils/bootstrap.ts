import { Hono } from "hono";
import { authRoutes } from "../../modules/auth/routes/auth.routes";

export const bootstrapApplication = () => {
  const app = new Hono();

  app.route("/auth", authRoutes);

  app.onError((_, c) => {
    return c.json({ success: false, error: "Internal Server Error" });
  });

  return app;
};
