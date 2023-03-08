import { Router, Request, Response, NextFunction } from 'express';
import AuthController from '../Controllers/authController';
import AuthService from '../Services/authService';
import TokenService from '../shared/tokenService';

const authRoute = Router();
const tokenService = new TokenService();
const authService = new AuthService(tokenService);
const authController = new AuthController(authService);

authRoute.post('/', (req: Request, res: Response, next: NextFunction) => authController
  . login(req, res, next));
authRoute.get('/role', (req: Request, res: Response) => res.sendStatus(200));

export default authRoute;
