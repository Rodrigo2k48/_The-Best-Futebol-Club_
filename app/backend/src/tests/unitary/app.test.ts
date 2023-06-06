import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import { app } from '../../app';
import HTTP_STATUS from '../../api/shared/htttpStatusCode';

chai.use(chaiHttp);
// caso a porta já esteja em uso, sinta-se a vontade para modificar aqui caso o teste falhar
const PORT = 3030

describe('App (Servidor/Express)', function () {
  let server: any;
  describe("em caso de sucesso", () => {
    afterEach(function () {
      server.close();
    });
    it('Deve retornar a mensagem correta e enviar status 200', function (done) {
      server = app.listen(PORT);
      chai
        .request(server)
        .get('/')
        .end(function (_err: Error, res: any) {
          expect(res).to.have.status(HTTP_STATUS.SuccessOK);
          expect(res.text).to.equal('Test route');
          done();
        });
    });
  })
});