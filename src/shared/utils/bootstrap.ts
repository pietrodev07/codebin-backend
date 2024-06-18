import { Hono } from "hono";

export const bootstrapApplication = () => {
  const app = new Hono();

  app.onError((_, c) => {
    return c.json({ success: false, error: "Internal Server Error" });
  });

  app.get("/", (c) => {
    return c.text("Hello from backend!");
  });

  return app;
};
