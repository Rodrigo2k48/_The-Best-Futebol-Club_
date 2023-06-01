import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import {app} from '../app'; // Importe o arquivo principal do seu servidor Express

chai.use(chaiHttp);

// Defina seus testes usando a sintaxe do Mocha e Chai
describe('Teste do app.listen()', function () {
  let server: any;

  // Antes de cada teste, inicie o servidor
  beforeEach(function () {
    server = app.listen(3000);
  });

  // Após cada teste, encerre o servidor
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