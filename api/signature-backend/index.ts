import dotenv from "dotenv";
dotenv.config();

import https from "https";
import fs from "fs";
import app from "./src/interfaces/http/Server";
import { sequelize } from "./src/infrastructure/config/database";

const PORT = process.env.PORT || 3000;

const privateKey = fs.readFileSync(
  process.env.SSL_KEY_PATH || "server.key",
  "utf8"
);
const certificate = fs.readFileSync(
  process.env.SSL_CERT_PATH || "server.crt",
  "utf8"
);

const credentials = { key: privateKey, cert: certificate };

async function start() {
  try {
    await sequelize.sync();
    https.createServer(credentials, app).listen(PORT, () => {
      console.log(`HTTPS server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

start();
