import { Request, Response, NextFunction } from 'express';
import HttpException from '../shared/HttpException';
import TokenService from '../shared/tokenService';

export default function validationToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new HttpException(401, 'Token not found');
  }
  try {
    const payload = new TokenService().validate(authorization);
    // pra caso no futuro eu precise das informações do usuario
    req.body.user = payload;
    next();
  } catch (e) {
    throw new HttpException(401, 'Token must be a valid token');
  }
  next();
}
