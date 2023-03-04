import { ModelStatic } from 'sequelize';
import User from '../../database/models/User';
import IAuthService from '../interfaces/IAuthService';
import { IJwtService } from '../shared/interfaces/IJwtToken';
import IUser from '../interfaces/IUser';

export default class AuthService implements IAuthService {
  protected model: ModelStatic<User> = User;
  protected tokenService: IJwtService;

  constructor(tokenService: IJwtService) {
    this.tokenService = tokenService;
  }

  async generateToken(dto: IUser): Promise<string> {
    const { email } = dto;
    const userInDb = await this.model.findAll({ where: { email } });
    const { role, id } = userInDb[0];
    const token = this.tokenService.create({ role, id });
    return token;
  }
}
