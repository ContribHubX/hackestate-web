import express, { Application } from "express";
import cors from "cors";
import { dependencyInjection } from "./dependency-injector";
import { authRouter } from "@/features/auth/auth.router";
import { errorHandler } from "@/common/middleware/error-handler";
import { HttpContextMiddleware } from "@/common/middleware/http-context";
import cookieParser from "cookie-parser";
import { corsConfig } from "@/common/utils/cors";

export default(app: Application) => {
    app.use("/status", (req, res) => {
        res.send({ message: "healthy" })
    })

    app.set("trust proxy", 1);

    /**
     * Middlewares
     */
    app.use(cors(corsConfig.cors));
    app.use(express.json());
    app.use(cookieParser())
    app.use(HttpContextMiddleware);

    /**
     * Routes
    */
    app.use("/api", authRouter);


    dependencyInjection();

    /**
     * Custom middleware
     */
    app.use(errorHandler);

}