import { ModelStatic } from 'sequelize';
import { JwtPayload } from 'jsonwebtoken';
import User from '../../database/models/User';
import IAuthService from './Interfaces/IAuthService';
import { IJwtService } from './Interfaces/IJwtToken';
import IUser from '../interfaces/IUser';
import ValidateUser from '../middlewares/ValidateUser';
import Unauthorized from '../erros/Unauthorized';

export default class AuthService implements IAuthService {
  protected model: ModelStatic<User> = User;
  protected tokenService: IJwtService;

  constructor(tokenService: IJwtService) {
    this.tokenService = tokenService;
  }

  async generateToken(dto: IUser): Promise<string> {
    const { email, password } = dto;
    const validate = new ValidateUser(email, password);
    const userInDb = await this.getUserInDb(email);
    if (!userInDb) {
      throw new Unauthorized('Invalid email or password');
    }
    const isValid = await validate.validateUser(userInDb.email, userInDb.password);
    if (!isValid) {
      throw new Unauthorized('Invalid email or password');
    }
    const { id, role } = userInDb;
    const userInfos = { id, role };
    const token = this.tokenService.create(userInfos);
    return token;
  }

  public async getUserInDb(email: string): Promise<User> {
    const user = await this.model.findAll({ where: { email } });
    return user[0];
  }

  public authToken(Authorization: string): JwtPayload | string {
    const tokenValidate = this.tokenService.validate(Authorization);
    return tokenValidate;
  }
}
