import bcrypt from 'bcryptjs';

export default class ValidateUser {
  private _email: string;
  private _password: string;

  constructor(email: string, password: string) {
    this._email = email;
    this._password = password;
  }

  public async validateEmail(emailInDb: string): Promise<boolean> {
    const EMAIL_REGEX = /\S+@\S+\.\S+/;
    const regexValidate = EMAIL_REGEX.test(this._email);
    if (!regexValidate) {
      return false;
    }
    if (emailInDb !== this._email) {
      return false;
    }
    return true;
  }

  public validatePassword = async (passHash: string): Promise<boolean> => {
    if (this._password.length < 6) {
      return false;
    }
    const isPassValid = await bcrypt.compare(this._password, passHash);
    return isPassValid;
  };

  public async validateUser(emailInDb: string, passHashInDb: string):
  Promise<boolean> {
    const isUserValid = await this.validateEmail(emailInDb);
    const isPassValid = await this.validatePassword(passHashInDb);
    if (!isUserValid || !isPassValid) {
      return false;
    }
    return true;
  }
}
