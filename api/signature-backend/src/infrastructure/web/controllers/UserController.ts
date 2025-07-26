import { Request, Response } from "express";
import { GetUserByEmail } from "../../../application/use-cases/GetUserByEmail";
import { GetUserById } from "../../../application/use-cases/GetUserById";
import { ListUsers } from "../../../application/use-cases/ListUsers";

export class UserController {
  constructor(
    private readonly userCaseGetUserByEmail: GetUserByEmail,
    private readonly userCaseGetUserById: GetUserById,
    private readonly listUsersUseCase: ListUsers
  ) {
    // Bind methods to preserve 'this' context
    this.getUserByEmail = this.getUserByEmail.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.listUsers = this.listUsers.bind(this);
  }

  async getUserByEmail(req: Request, res: Response) {
    const user = await this.userCaseGetUserByEmail.execute(req.params.email);
    res.json({ user });
  }

  async getUserById(req: Request, res: Response) {
    const user = await this.userCaseGetUserById.execute(+req.params.id);
    res.json({ user });
  }

  async listUsers(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;
      const search = req.query.search as string;
      const currentUserId = req.userId ? parseInt(req.userId as string) : undefined; // Convert to number
      
      const result = await this.listUsersUseCase.execute(page, limit, search, currentUserId);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
