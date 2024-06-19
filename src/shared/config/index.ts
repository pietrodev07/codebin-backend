export const migrationFolder = "./migrations";

export const databaseConfig = {
  database: process.env.DATABASE_DB_NAME,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: Number(process.env.DATABASE_PORT),
};

export const corsConfig = {
  origin: "http://localhost:5173",
  allowHeaders: ["Access-Control-Allow-Origin", "Content-Type"],
  allowMethods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
