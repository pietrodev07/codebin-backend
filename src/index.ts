import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { info } from "kittylog";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello from backend!");
});

const port = 3000;
info(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
