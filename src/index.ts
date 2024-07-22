import "dotenv/config";

import { success } from "kittylog";
import { serve } from "@hono/node-server";

import { migrateToLatest } from "@/db/migrate";
import { bootstrapApplication } from "@/loaders/bootstrap";

const app = bootstrapApplication();

const serverConfig = {
  fetch: app.fetch,
  port: process.env.SERVER_PORT,
};

migrateToLatest();

serve(serverConfig, ({ address, port }) => {
  success(`Server running on ${address} into ${port} port`);
});
