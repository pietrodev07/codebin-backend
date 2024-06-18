import { genSaltSync, hashSync } from "bcrypt";

const saltRounds = 10;

export const hash = (password: string) => {
  const salt = genSaltSync(saltRounds);
  return hashSync(password, salt);
};
