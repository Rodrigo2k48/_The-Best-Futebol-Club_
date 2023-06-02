import HTTP_STATUS from '../shared/htttpStatusCode';
import HttpError from './HttpError';

export default class BadRequestError extends HttpError {
  public httpCode: number;
  public name: string;

  constructor(message: string, httpCode = HTTP_STATUS.ClientErrorBadRequest) {
    super(message);

    this.httpCode = httpCode;
    this.name = 'BadRequest';
  }
}
