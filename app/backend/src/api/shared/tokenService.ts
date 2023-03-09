import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { IJwtService, ITokenUserInfo } from './interfaces/IJwtToken';

dotenv.config();

export default class TokenService implements IJwtService {
  private _config: jwt.SignOptions;
  private _secret: string;

  constructor() {
    this._config = {
      expiresIn: '500d',
      algorithm: 'HS256',
    };
    this._secret = process.env.JWT_SECRET || 'ouoseusegredoaqui';
  }

  create(dto: ITokenUserInfo): string {
    const token = jwt.sign(dto, this._secret, this._config);
    return token;
  }

  validate(token: string): jwt.JwtPayload | string {
    const isValidToken = jwt.verify(token, this._secret, this._config);
    return isValidToken;
  }
}
