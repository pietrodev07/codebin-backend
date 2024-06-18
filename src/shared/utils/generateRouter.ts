import { Hono } from "hono";
import { H } from "hono/types";
import { RoutesData } from "../types";
import { bodyValidator } from "../middlewares/validator.middleware";

export const generateRouter = <C extends Record<string, H>>(
  routes: RoutesData,
  controller: C
) => {
  const router = new Hono();

  for (const [key, route] of Object.entries(routes)) {
    switch (route.method) {
      case "GET":
        router.get(route.path, controller[key as keyof C]);
        break;
      case "POST":
        router.post(
          route.path,
          bodyValidator(route.validator!),
          controller[key as keyof C]
        );
        break;
      case "PUT":
        router.put(
          route.path,
          bodyValidator(route.validator!),
          controller[key as keyof C]
        );
        break;
      case "DELETE":
        router.delete(route.path, controller[key as keyof C]);
    }
  }

  return router;
};
