import dotenv from "dotenv";

dotenv.config();

export const env: EnvConfig = {
    port: process.env.PORT || "3001",
    databaseUrl: process.env.DATABASE_URL as string,
    jwtSecret: process.env.JWT_SECRET as string,
    jwtExpiration: process.env.JWT_EXPIRATION || "1d",
    resetTokenSecret: process.env.RESET_TOKEN_SECRET as string,
};

export const emailConfig: EmailConfig = {
    host: process.env.EMAIL_HOST || "localhost",
    port: Number(process.env.EMAIL_PORT) || 25,
    username: process.env.EMAIL_USER || "",
    password: process.env.EMAIL_PASSWORD || "",
    secure: process.env.EMAIL_SECURE === "true",
    rejectUnauthorized: process.env.EMAIL_REJECT_UNAUTHORIZED === "true",
};

export type EnvConfig = {
    port: string;
    databaseUrl: string;
    jwtSecret: string;
    jwtExpiration: string;
    resetTokenSecret: string;
};

export type EmailConfig = {
    host: string,
    port: number,
    username: string,
    password: string, 
    secure: boolean,
    rejectUnauthorized: boolean
}
