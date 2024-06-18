import { compareSync } from "bcrypt";

export const compare = (hashedPassword: string, password: string) => {
  return compareSync(password, hashedPassword);
};
