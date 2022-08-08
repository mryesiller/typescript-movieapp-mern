declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET_KEY: string;
      JWT_SECRET: string;
      JWT_LIFETIME: number;
      SESSION_SECRET: string;
      NODE_ENV: 'development' | 'production';
      PORT?: string;
    }
  }
}

export {};
