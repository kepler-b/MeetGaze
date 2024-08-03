import { Server } from "socket.io";
import express from "express";
import { createServer } from "http";
import { authMiddleware } from "./middlewares/auth.middleware";
import { config } from "dotenv";
import logger from "./logger";

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "0.0.0.0";

config()

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:5173",
      "meetgaze.web.app"
    ]
  },
  transports: ["websocket"]
});
const relayNamespace = io.of("/relay");

relayNamespace.use((socket, next) => authMiddleware(socket, next))

httpServer.listen(PORT, HOST, () => {
  logger.info(`Server is listening on port: http://${HOST}:${PORT}`)
})

