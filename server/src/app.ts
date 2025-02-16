import "reflect-metadata";
import express from "express";
import { env } from "./common/utils/env-config";
import socketHandler from "./startups/socket";
import { Server as IOServer } from "socket.io";
import { Server } from "http";

async function main() {
    const app = express();
    const PORT = env.port;
    let serverListener: Server;

    ((await import("./startups/express")).default(app));

    serverListener = app.listen(PORT, () => {
        console.log(`Running on port: ${PORT}`)

        socketHandler(new IOServer(serverListener))
    })
}


main();