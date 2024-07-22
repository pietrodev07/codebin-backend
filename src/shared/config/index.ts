export const migrationFolder = "./migrations";

export const databaseConfig = {
  database: process.env.DATABASE_DB_NAME,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
};

export const BASE_FRONTEND_URL = process.env.FRONTEND_URL;

export const corsConfig = {
  origin: BASE_FRONTEND_URL,
  allowHeaders: ["Access-Control-Allow-Origin", "Content-Type"],
  allowMethods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
