import passport from "passport";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import keyRoutes from "../../infrastructure/web/routes/key.routes";
import authRoutes from "../../infrastructure/web/routes/auth.routes";
import userRoutes from "../../infrastructure/web/routes/user.routes";
import fileRoutes from "../../infrastructure/web/routes/file.routes";
import signRoutes from "../../infrastructure/web/routes/sign.routes";
import sharedFileRoutes from "../../infrastructure/web/routes/shared-file.routes";
import session from "express-session";

import "../../infrastructure/config/passport";

const app = express();
app.use(
  cors({
    origin: `${process.env.URL_REDIRECT_FRONT}`,
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secrethash123", // cámbialo en producción
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, // true si usas HTTPS (Docker con nginx reverse proxy lo permite)
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/key", keyRoutes);
app.use("/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/file", fileRoutes);
app.use("/api", signRoutes);
app.use("/api/shared", sharedFileRoutes);

export default app;
