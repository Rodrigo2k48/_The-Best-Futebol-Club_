import { Router, Request, Response, NextFunction } from 'express';
import AuthController from '../controllers/AuthController';
import AuthService from '../services/AuthService';
import TokenService from '../services/TokenService';

const authRoute = Router();
const tokenService = new TokenService();
const authService = new AuthService(tokenService);
const authController = new AuthController(authService);

authRoute.post('/', (req: Request, res: Response, next: NextFunction) => authController
  . login(req, res, next));
authRoute.get('/role', (req: Request, res: Response, next: NextFunction) => authController
  . validate(req, res, next));

export default authRoute;
