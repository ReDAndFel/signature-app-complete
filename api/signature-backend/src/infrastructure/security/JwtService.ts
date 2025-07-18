import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
const SECRET = process.env.JWT_SECRET || "dev-secret";

export class JwtService {
  generate(payload: object): string {
    return jwt.sign(payload, SECRET, { expiresIn: "1h" });
  }

  verify(token: string): any {
    return jwt.verify(token, SECRET);
  }
}
