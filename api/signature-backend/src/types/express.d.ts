import "express";

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
    userInfo?: {
      id: string;
      name: string;
      email: string;
      avatarUrl: string;
    };
  }
}
