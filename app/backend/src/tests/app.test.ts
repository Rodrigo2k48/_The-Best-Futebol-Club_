import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import {app} from '../app';

chai.use(chaiHttp);

describe('Teste do app.listen()', function () {
  let server: any;

  beforeEach(function () {
    server = app.listen(3000);
  });

  afterEach(function () {
    server.close();
  });

  it('Deve retornar a mensagem correta', function (done) {
    chai
      .request(server)
      .get('/')
      .end(function (err: Error, res: any) {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('Test route');
        done();
      });
  });
});