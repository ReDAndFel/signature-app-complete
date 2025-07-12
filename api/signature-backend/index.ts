import dotenv from "dotenv";
dotenv.config();

import app from "./src/interfaces/http/Server";
import { sequelize } from "./src/infrastructure/config/database";

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`HTTP server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

start();
