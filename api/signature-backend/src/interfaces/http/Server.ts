import passport from "passport";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import keyRoutes from "../../infrastructure/web/routes/key.routes";
import authRoutes from "../../infrastructure/web/routes/auth.routes";
import userRoutes from "../../infrastructure/web/routes/user.routes";
<<<<<<< HEAD
<<<<<<< Updated upstream

=======
import fileRoutes from  "../../infrastructure/web/routes/file.routes";
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
import fileRoutes from "../../infrastructure/web/routes/file.routes";
>>>>>>> 64184187e01ce0a25523fb27ff5e7db032083d9d
import "../../infrastructure/config/passport";

const app = express();
app.use(
  cors({
    origin: `${process.env.URL_REDIRECT_FRONT}`,
    credentials: true,
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());

app.use("/api/key", keyRoutes);
app.use("/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/file", fileRoutes);

export default app;
