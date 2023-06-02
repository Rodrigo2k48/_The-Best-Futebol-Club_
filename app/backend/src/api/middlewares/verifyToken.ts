import { Request, Response, NextFunction } from 'express';
import TokenService from '../services/TokenService';
import Unauthorized from '../erros/Unauthorized';

export default function validationToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new Unauthorized('Token not found');
  }
  try {
    const payload = new TokenService().validate(authorization);
    // pra caso no futuro eu precise das informações do usuario
    req.body.user = payload;
    next();
  } catch (e) {
    throw new Unauthorized('Token must be a valid token');
  }
}
