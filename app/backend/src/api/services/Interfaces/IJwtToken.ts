import { JwtPayload } from 'jsonwebtoken';

interface ITokenUserInfo {
  id: number;
  role: string;
}

interface IJwtService {
  create(dto: ITokenUserInfo): string
  validate(token: string): JwtPayload | string
}
export { IJwtService, ITokenUserInfo };
