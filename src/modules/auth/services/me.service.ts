import { Context } from "hono";
import { getUserByUsername } from "@/db/orm/users";

export const me = async (c: Context) => {
  const { username } = c.get("user_data");
  const fetchedUser = await getUserByUsername(username as string);

  return c.json({
    success: true,
    message: "Profile getted successfully!",
    data: fetchedUser,
  });
};
