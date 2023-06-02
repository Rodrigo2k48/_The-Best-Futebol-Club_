import chai from "chai"
import sinon from "sinon"
import chaihtpp from 'chai-http'
import { app } from "../../app"
import { Model } from "sequelize"
import { ONE_VALID_USER_IN_DB, TOKEN_INVALID, TOKEN_VALID, USER_EMAIL_REXEG_INVALID, USER_NOT_IN_DB, USER_PASS_LENGTH_PASSWORD_INVALID, USER_VALID } from "../integration/mocks/login"
import HTTP_STATUS from "../../api/shared/htttpStatusCode"
import AuthService from "../../api/services/AuthService"
import ValidateUser from "../../api/middlewares/ValidateUser"

chai.use(chaihtpp)
const { expect } = chai

describe('POST /login', async () => {
  afterEach(() => {
    sinon.restore()
  })
  describe('em caso de sucesso', () => {
    it('deve retornar um token para o usuario e enviar status 200', async () => {
      sinon.stub(Model, 'findAll').resolves(ONE_VALID_USER_IN_DB)
      const { status, body, ok } = await chai.request(app).post("/login").send(USER_VALID)

      expect(status).to.be.equal(HTTP_STATUS.SuccessOK)
      expect(body).to.property("token")
      expect(ok).to.true
    })
  })
  describe("em caso de erro por falta de informações", () => {
    it('deve retornar uma mensagem de erro caso o campo "email" não for passado e enviar status 400', async () => {
      sinon.stub(Model, 'findAll').resolves(ONE_VALID_USER_IN_DB)
      const { status, badRequest, body } = await chai.request(app).post("/login").send({
        password: USER_VALID.password,
      })
      expect(status).to.be.equal(HTTP_STATUS.ClientErrorBadRequest)
      expect(body.message).to.be.equal("Email or password is required")
      expect(badRequest).to.be.true
    });
    it('(validação de Regex) deve retornar uma mensagem de erro caso o email não estiver no formato invalido enviar status 401', async () => {
      sinon.stub(AuthService.prototype, 'getUserInDb').resolves(ONE_VALID_USER_IN_DB[0]);
      const { status, unauthorized, body } = await chai.request(app)
        .post('/login')
        .send(USER_EMAIL_REXEG_INVALID);

      expect(status).to.equal(HTTP_STATUS.ClientErrorUnauthorized);
      expect(body.message).to.be.equal("Invalid email or password");
      expect(unauthorized).to.be.true
    });
    it('deve retornar uma mensagem de erro caso o campo "password" não for passado e enviar status 400', async () => {
      sinon.stub(Model, 'findAll').resolves(ONE_VALID_USER_IN_DB)
      const { status, badRequest, body } = await chai.request(app).post("/login").send({
        email: USER_VALID.email,
      })
      expect(status).to.be.equal(HTTP_STATUS.ClientErrorBadRequest)
      expect(body.message).to.be.equal("Email or password is required")
      expect(badRequest).to.be.true
    });
    it('deve retornar uma mensagem de erro caso o "password" tiver menos de 6 caracteres e enviar status 401', async () => {
      sinon.stub(AuthService.prototype, 'getUserInDb').resolves(ONE_VALID_USER_IN_DB[0]);
      const { status, unauthorized, body } = await chai.request(app)
        .post('/login')
        .send(USER_PASS_LENGTH_PASSWORD_INVALID);

      expect(status).to.equal(HTTP_STATUS.ClientErrorUnauthorized);
      expect(body.message).to.be.equal("Invalid email or password");
      expect(unauthorized).to.be.true
    });
  })
  describe("caso o usuario não esteja cadastrado no banco de dados", () => {
    it('deve retornar uma mensagem de erro e enviar status 401', async () => {
      sinon.stub(AuthService.prototype, 'getUserInDb').resolves(null);
      const { status, unauthorized, body } = await chai.request(app)
        .post('/login')
        .send(USER_NOT_IN_DB);

      expect(status).to.equal(HTTP_STATUS.ClientErrorUnauthorized);
      expect(body.message).to.be.equal("Invalid email or password");
      expect(unauthorized).to.be.true
    });
    it('deve retornar uma mensagem de erro caso as informações passada sejam diferentes das registradas no banco de dados e enviar status 401', async () => {
      sinon.stub(AuthService.prototype, 'getUserInDb').resolves(ONE_VALID_USER_IN_DB[0]);
      sinon.stub(ValidateUser.prototype, 'validateUser').resolves(false)
      const { status, unauthorized, body } = await chai.request(app)
        .post('/login')
        .send(USER_NOT_IN_DB);

      expect(status).to.equal(HTTP_STATUS.ClientErrorUnauthorized);
      expect(body.message).to.be.equal("Invalid email or password");
      expect(unauthorized).to.be.true
    });
  })
})
describe("GET /login/role", () => {
  afterEach(() => {
    sinon.restore()
  })
  describe("em caso de sucesso", () => {
    it("deve retornar a role do usuario logado na aplicação e enviar status 200", async () => {
      sinon.stub(Model, 'findAll').resolves(ONE_VALID_USER_IN_DB)
      const { status, body, ok } = await chai.request(app).get("/login/role").set({ 'Authorization': TOKEN_VALID });
      expect(status).to.be.equal(HTTP_STATUS.SuccessOK)
      expect(body.role).to.equal('user');
      expect(ok).to.true
    })
    describe("em caso de erro", () => {
      it("deve retornar uma mensagem de erro caso o token estiver invalido e enviar um status 401", async () => {
        sinon.stub(Model, 'findAll').resolves(ONE_VALID_USER_IN_DB)
        const { status, unauthorized, body } = await chai.request(app).get("/login/role").set({ 'Authorization': TOKEN_INVALID })
        expect(status).to.be.equal(HTTP_STATUS.ClientErrorUnauthorized)
        expect(body.message).to.be.equal("Token must be a valid token");
        expect(unauthorized).to.be.true
      })
      it("deve retornar uma mensagem de erro caso o usuario não estiver com um token e enviar um status 401", (done) => {
        chai.request(app)
          .get("/login/role")
          .end((err, res) => {
            expect(res).to.have.status(HTTP_STATUS.ClientErrorUnauthorized);
            expect(res.body).to.have.property('message').equal('Token not found');
            done();
          });
      })
    })
  })
})
