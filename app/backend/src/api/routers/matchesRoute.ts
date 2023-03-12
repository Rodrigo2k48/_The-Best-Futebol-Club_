import { Request, Response, Router } from 'express';

const matchesRoute = Router();

matchesRoute.get('/', (req: Request, res: Response) => res.sendStatus(200));

export default matchesRoute;
