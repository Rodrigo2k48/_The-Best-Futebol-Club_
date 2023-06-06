import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import BadRequest from '../erros/BadRequest';
import IAuthService from '../services/Interfaces/IAuthService';
import Unauthorized from '../erros/Unauthorized';
import HTTP_STATUS from '../shared/htttpStatusCode';

export default class AuthController {
  protected service: IAuthService;
  constructor(service: IAuthService) {
    this.service = service;
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new BadRequest('Email or password is required');
      }
      const payload = { email, password };
      const token = await this.service.generateToken(payload);
      return res.status(HTTP_STATUS.SuccessOK).json({ token });
    } catch (error) {
      next(error);
    }
  }

  public async validate(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const { authorization } = req.headers;
    try {
      if (!authorization) {
        throw new Unauthorized('Token not found');
      }
      const token = this.service.authToken(authorization as string);
      const { role } = token as JwtPayload;
      return res.status(HTTP_STATUS.SuccessOK).json({ role });
    } catch (error) {
      next(error);
    }
  }
}
