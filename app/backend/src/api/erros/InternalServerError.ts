import HTTP_STATUS from '../shared/htttpStatusCode';
import HttpError from './HttpError';

export default class InternalServerError extends HttpError {
  public httpCode: number;
  public name: string;

  constructor(message: string, httpCode = HTTP_STATUS.InternalServerError) {
    super(message);
    this.httpCode = httpCode;
    this.name = 'InternalServerError';
  }
}
