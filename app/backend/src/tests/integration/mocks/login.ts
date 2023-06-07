import User from '../../../database/models/User';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export const ONE_VALID_USER_IN_DB = [
  {
    username: 'User',
    role: 'user',
    email: 'user@user.com',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
    // senha: secret_user
  },
] as unknown as User[];

export const USER_VALID = {
  email: 'user@user.com',
  password: 'secret_user',
};

export const USER_NOT_IN_DB = {
  email: 'brucewayne@gmail.com',
  password: 'eu sou o melhor heroi',
};

export const USER_PASS_LENGTH_PASSWORD_INVALID = {
  email: 'brucewayne@gmail.com',
  password: 'bruce',
};

export const USER_EMAIL_REXEG_INVALID = {
  email: 'brucerobin.com',
  password: 'eu sou o melhor heroi',
};
// Essa função cria sempre um token valido para servir de mock nos testes
export const mockToken = () => {
  const payload = ONE_VALID_USER_IN_DB[0];
  const expiration = Math.floor(new Date('9999-12-31').getTime() / 1000);
  const token = jwt.sign(payload, 'ouoseusegredoaqui', { expiresIn: expiration });
  return token;
};

export const TOKEN_VALID: string = mockToken();

export const TOKEN_INVALID: string = 'Token invalid';
