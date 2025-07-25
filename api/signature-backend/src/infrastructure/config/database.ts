import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "",
  process.env.DB_USER || "",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: (process.env.DB_DIALECT as any) || "postgres",
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    logging: false,
  }
);

export { sequelize };
