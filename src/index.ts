import "dotenv/config";

import { serve } from "@hono/node-server";
import { bootstrapApplication } from "@/utils/bootstrap";
import { success } from "kittylog";
import { migrateToLatest } from "@/db/migrate";

const app = bootstrapApplication();

const serverConfig = {
  fetch: app.fetch,
  port: 8000,
};

migrateToLatest();

serve(serverConfig, ({ address, port }) => {
  success(`Server running at <${address}> on the <${port}> port`);
});
