import { routes } from "./routes";
import { generateRouter } from "@/utils/router";
import { authController } from "../controllers/auth.controller";

export const authRouter = generateRouter(routes, authController);
