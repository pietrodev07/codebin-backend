declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /* generic variables */
      SERVER_PORT: number;
      FRONTEND_URL: string;
      JWT_SECRET_KEY: string;

      /* database variables */
      DATABASE_HOST: string;
      DATABASE_USER: string;
      DATABASE_PASSWORD: string;
      DATABASE_PORT: number;
      DATABASE_DB_NAME: string;

      /* email variables */
      EMAIL_HOST: string;
      EMAIL_SERVICE: string;
      EMAIL_PORT: number;
      EMAIL_SECURE: boolean;
      EMAIL_USER: string;
      EMAIL_PASSWORD: string;
    }
  }
}

export {};
