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
}
