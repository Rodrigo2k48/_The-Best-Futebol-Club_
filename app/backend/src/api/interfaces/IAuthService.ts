import IUser from './IUser';

export default interface IAuthService {
  generateToken(dto: IUser): Promise<string>;
}
