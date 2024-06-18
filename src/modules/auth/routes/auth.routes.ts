import { routes } from "./routes";
import { authController } from "../controllers/auth.controller";
import { generateRouter } from "../../../shared/utils/generateRouter";

export const authRoutes = generateRouter(routes, authController);
