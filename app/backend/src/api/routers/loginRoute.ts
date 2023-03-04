import { Router } from 'express';

const loginRoute = Router();

loginRoute.post('/', (req, res) => res.sendStatus(200));

export default loginRoute;
