import { ErrorRequestHandler } from 'express';
import HttpError from '../erros/HttpError';
import HTTP_STATUS from '../shared/htttpStatusCode';

export default class HttpErrorMiddleware {
  public static error: ErrorRequestHandler = (err, _req, res, _next) => {
    if (err instanceof HttpError) {
      const { httpCode, message } = err;
      return res.status(httpCode).json({ message });
    }
    return res.status(HTTP_STATUS.InternalServerError).json({ message: err.message });
  };
}
