import HTTP_STATUS from '../shared/htttpStatusCode';
import HttpError from './HttpError';

export default class UnauthorizedError extends HttpError {
  public httpCode: number;
  public name: string;

  constructor(message: string, httpCode = HTTP_STATUS.ClientErrorUnauthorized) {
    super(message);
    this.httpCode = httpCode;
    this.name = 'Unauthorized';
  }
}
