import { Request, Response } from "express";
import { GetUserByEmail } from "../../../application/use-cases/GetUserByEmail";
import { GetUserById } from "../../../application/use-cases/GetUserById";

export class UserController {
  constructor(
    private readonly userCaseGetUserByEmail: GetUserByEmail,
    private readonly userCaseGetUserById: GetUserById
  ) {}

  async getUserByEmail(req: Request, res: Response) {
    const user = await this.userCaseGetUserByEmail.execute(req.params.email);
    res.json({ user });
  }

  async getUserById(req: Request, res: Response) {
    const user = await this.userCaseGetUserById.execute(+req.params.id);
    res.json({ user });
  }
}
