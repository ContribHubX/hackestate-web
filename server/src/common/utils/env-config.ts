import dotenv from "dotenv";

dotenv.config();

export const env: EnvConfig = {
    port: process.env.PORT || "3001",
    databaseUrl: process.env.DATABASE_URL as string,
    jwtSecret: process.env.JWT_SECRET as string,
    jwtExpiration: process.env.JWT_EXPIRATION || "1d",
    resetTokenSecret: process.env.RESET_TOKEN_SECRET as string,
};

export type EnvConfig = {
    port: string;
    databaseUrl: string;
    jwtSecret: string;
    jwtExpiration: string;
    resetTokenSecret: string;
};
