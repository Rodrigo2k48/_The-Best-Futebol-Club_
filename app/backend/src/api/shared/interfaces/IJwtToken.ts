interface ITokenUserInfo {
  id: number;
  role: string;
}

interface IJwtService {
  create(dto: ITokenUserInfo): string
}
export { IJwtService, ITokenUserInfo };
