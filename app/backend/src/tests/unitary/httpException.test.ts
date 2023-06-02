import { expect } from 'chai';
import HttpException from '../../api/shared/HttpException';
import HTTP_STATUS from '../../api/shared/htttpStatusCode';

describe('HttpException', () => {
  it('deve criar uma instância com o status e a mensagem corretos', () => {
    const status = HTTP_STATUS.NotFoundError;
    const message = 'Not Found';
    
    const exception: HttpException = new HttpException(status, message);
    expect(exception.status).to.equal(status);
    expect(exception.message).to.equal(message);
  });
});