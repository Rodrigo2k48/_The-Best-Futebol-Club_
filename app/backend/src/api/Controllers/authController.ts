import { Request, Response, NextFunction } from 'express';
import IAuthService from '../interfaces/IAuthService';
import HttpException from '../shared/HttpException';

export default class AuthController {
  protected service: IAuthService;
  constructor(service: IAuthService) {
    this.service = service;
  }

  public async login(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new HttpException(400, 'All fields must be filled');
      }
      const token = await this.service.generateToken({ email, password });
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
}
