import dotenv from "dotenv";
import jwt, { SignOptions, VerifyOptions, JwtPayload } from "jsonwebtoken";

dotenv.config();

const SECRET = process.env.JWT_SECRET || "dev-secret";

const defaultSignOptions: SignOptions = {
  algorithm: "HS256",
  expiresIn: "1h",
  issuer: "signature-app",
  audience: "signature-app-users",
};

export class JwtService {
  generate(payload: object & { sub: string }): string {
    const jti = crypto.randomUUID();

    return jwt.sign({ ...payload, jti }, SECRET, defaultSignOptions);
  }

  verify(token: string): JwtPayload {
    try {
      const options: VerifyOptions = {
        algorithms: ["HS256"],
        issuer: "signature-app",
        audience: "signature-app-users",
      };

      const decoded = jwt.verify(token, SECRET, options) as JwtPayload;

      if (!decoded.sub) throw new Error("Missing subject (sub) in token");
      if (!decoded.jti) throw new Error("Missing JWT ID (jti)");
      if (!decoded.iat) throw new Error("Missing issued at (iat)");

      return decoded;
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        throw new Error("Token has expired");
      } else if (err.name === "JsonWebTokenError") {
        throw new Error("Invalid token");
      } else if (err.name === "NotBeforeError") {
        throw new Error("Token not active yet");
      } else {
        throw new Error("Token verification failed");
      }
    }
  }
}
