import { ModelStatic } from 'sequelize';
import User from '../../database/models/User';
import IAuthService from '../interfaces/IAuthService';
import { IJwtService } from '../shared/interfaces/IJwtToken';
import IUser from '../interfaces/IUser';
import ValidateUser from '../middlewares/validateUser';
import HttpException from '../shared/HttpException';

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
      throw new HttpException(401, 'Invalid email or password');
    }
    const isValid = await validate.validateUser(userInDb.email, userInDb.password);
    if (!isValid) {
      throw new HttpException(401, 'Invalid email or password');
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
}
