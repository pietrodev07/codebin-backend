import { serve } from "@hono/node-server";
import { bootstrapApplication } from "./shared/utils/bootstrap";
import { success } from "kittylog";

const app = bootstrapApplication();

const serverConfig = {
  fetch: app.fetch,
  port: 8000,
};

serve(serverConfig, ({ address, port }) => {
  success(`Server running at <${address}> on the <${port}> port`);
});
