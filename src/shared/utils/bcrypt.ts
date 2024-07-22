import { compareSync, genSaltSync, hashSync } from "bcrypt";

const saltRounds = 10;

export const compare = (hashedPassword: string, password: string) => {
  return compareSync(password, hashedPassword);
};

export const hash = (password: string) => {
  const salt = genSaltSync(saltRounds);
  return hashSync(password, salt);
};
