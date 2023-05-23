import chai from "chai";
import chaiHttp from "chai-http";
import { app } from "../app";
import sinon from "sinon";
import { Model } from 'sequelize'
import { TEAMS_IN_DB } from "./mocks/teams";
import HTTP_STATUS from "../api/shared/htttpStatusCode";


const { expect } = chai
chai.use(chaiHttp);

describe('GET /teams', async () => {
  afterEach(() => {
    sinon.restore();
  })
  describe('em caso de sucesso', () => {
    it("deve retornar a lista dos times e enviar status 200", async () => {
      sinon.stub(Model, 'findAll').resolves(TEAMS_IN_DB)  
      const {status, body, ok} = await chai.request(app).get('/teams')
      
      expect(status).to.equal(HTTP_STATUS.SuccessOK)
      expect(body).to.deep.equal(TEAMS_IN_DB)
      expect(ok).to.equal(true)
    })
  })
  describe('em caso de erro no banco de dados', () => {
    it("deve retornar um erro e enviar status 500", async () => {
      sinon.stub(Model, 'findAll').throws(new Error('Erro no banco de dados'));
      const {status, body} = await chai.request(app).get('/teams');

      expect(status).to.equal(HTTP_STATUS.InternalServerError);
      expect(body.message).to.equal('Erro no banco de dados')
    });
  });
})

describe('GET /teams/:id', () => {
  afterEach(() => {
    sinon.restore();
  })
  describe('em caso de sucesso', () => {
    it("deve retornar o time no banco de dados referente ao id passado e enviar status 200", async () => {
      sinon.stub(Model, 'findByPk').resolves(TEAMS_IN_DB[0]);
  
      const {status, body} = await chai.request(app).get('/teams/1');
      
      expect(status).to.equal(HTTP_STATUS.SuccessOK);
      expect(body).to.have.property('id').equal(TEAMS_IN_DB[0].id);
      expect(body).to.have.property('teamName').equal(TEAMS_IN_DB[0].teamName);
      expect(body).to.deep.equal(TEAMS_IN_DB[0])
    })
  })
  describe('em caso de erro no banco de dados', () => {
    it("deve retornar um erro e enviar status 500", async () => {
      sinon.stub(Model, 'findByPk').throws(new Error('Erro no banco de dados'));
      const {status, body} = await chai.request(app).get('/teams/1');
      
      expect(status).to.equal(HTTP_STATUS.InternalServerError);
      expect(body.message).to.equal('Erro no banco de dados')
    });
  })
})