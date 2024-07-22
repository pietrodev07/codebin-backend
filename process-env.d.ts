declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_PORT: number;
      DATABASE_HOST: string;
      DATABASE_USER: string;
      DATABASE_PASSWORD: string;
      DATABASE_PORT: number;
      DATABASE_DB_NAME: string;
      FRONTEND_URL: string;
      JWT_SECRET_KEY: string;
      HOST: string;
      SERVICE: string;
      PORT: string;
      SECURE: string;
      USER: string;
      PASS: string;
    }
  }
}

export {};
