import express from "express";
import cors from "cors";
import keyRoutes from "../../infrastructure/web/routes/key.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", keyRoutes);

export default app;
