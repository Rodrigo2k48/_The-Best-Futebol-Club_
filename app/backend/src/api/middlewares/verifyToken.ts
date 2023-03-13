import { Request, Response, NextFunction } from 'express';
import HttpException from '../shared/HttpException';

export default function validationToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new HttpException(401, 'Token not found');
  }
  next();
}
