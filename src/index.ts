import "dotenv/config";

import { serve } from "@hono/node-server";
import { bootstrapApplication } from "./shared/utils/bootstrap";
import { success } from "kittylog";
import { migrateToLatest } from "./shared/db/migrate";

const app = bootstrapApplication();

const serverConfig = {
  fetch: app.fetch,
  port: 8000,
};

migrateToLatest();

serve(serverConfig, ({ address, port }) => {
  success(`Server running at <${address}> on the <${port}> port`);
});
