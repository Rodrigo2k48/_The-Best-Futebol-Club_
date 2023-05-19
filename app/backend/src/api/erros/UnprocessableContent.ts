import HttpError from './HttpError';

export default class UnprocessableContentError extends HttpError {
  public httpCode: number;

  public name: string;

  constructor(message: string, httpCode = 422) {
    super(message);

    this.httpCode = httpCode;
    this.name = 'UnprocessableContent';
  }
}
