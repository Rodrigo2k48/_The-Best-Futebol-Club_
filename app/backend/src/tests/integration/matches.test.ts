import chaiHttp from "chai-http";
import chai from "chai";
import sinon from "sinon";
import { app } from "../../app";
import { Model } from "sequelize";
import ValidateMatch from "../../api/middlewares/ValidateMatch";
import { MATCHES_IN_DB, NEW_MATCHE_INPUT, NEW_MATCHE_OUTPUT, POSITION_NOT_EXIST_IN_ARRAY, TEAM_COMPETING_WITH_ITSELF } from "../integration/mocks/matches";
import HTTP_STATUS from "../../api/shared/htttpStatusCode";
import { TOKEN_INVALID, TOKEN_VALID } from "../integration/mocks/login";
import { TEAMS_IN_DB } from "../integration/mocks/teams";
import TeamsService from "../../api/services/TeamsService";
import Team from "../../database/models/Team";
import MatchesService from "../../api/services/MatchesService";

chai.use(chaiHttp);
const { expect } = chai;

describe("GET /matches", () => {
  afterEach(() => {
    sinon.restore();
  });
  describe("em caso de sucesso", () => {
    it("deve retornar a lista com todos as partidas e enviar status 200", async () => {
      sinon.stub(Model, "findAll").resolves(MATCHES_IN_DB);
      const response = await chai.request(app).get("/matches");

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(MATCHES_IN_DB);
    });
  });
  describe("em caso de erro", () => {
    it("deve retornar um erro e enviar status 500", async () => {
      sinon.stub(Model, "findAll").rejects(new Error("Erro no banco de dados"));
      const { status, body } = await chai.request(app).get("/matches");

      expect(status).to.equal(HTTP_STATUS.InternalServerError);
      expect(body.message).to.equal("Erro no banco de dados");
    });
  });
});
describe("GET /matches?InProgress", () => {
  afterEach(() => {
    sinon.restore();
  });
  describe("em caso de sucesso", () => {
    it("deve retornar a lista das partidas que estão em andamento e enviar status 200", async () => {
      sinon.stub(Model, "findAll").resolves(MATCHES_IN_DB);
      const { status, body } = await chai
        .request(app)
        .get("/matches?inProgress=true");

      expect(status).to.equal(HTTP_STATUS.SuccessOK);
      expect(body[0]).to.have.property("inProgress").equal(true);
      expect(body[0]).to.have.property("id").equal(41);
      expect(body[0])
        .to.have.property("awayTeam")
        .property("teamName")
        .equal("Internacional");
    });
    it("deve retornar a lista das partidas que já estão finalizadas e enviar status 200", async () => {
      sinon.stub(Model, "findAll").resolves(MATCHES_IN_DB);
      const { status, body } = await chai
        .request(app)
        .get("/matches?inProgress=false");
      expect(status).to.equal(HTTP_STATUS.SuccessOK);
      expect(body[0]).to.have.property("inProgress").equal(false);
      expect(body[0]).to.have.property("id").equal(1);
      expect(body[0])
        .to.have.property("awayTeam")
        .property("teamName")
        .equal("Grêmio");
    });
  });
});
describe("POST /matches", () => {
  afterEach(() => {
    sinon.restore();
  });
  describe("em caso de sucesso", () => {
    it("deve retornar a nova partida cadastrada com sucesso e enviar status 201", async () => {
      sinon.stub(Model, "create").resolves(NEW_MATCHE_OUTPUT);
      sinon.stub(ValidateMatch.prototype, "checkIfMatchDuplicate").resolves(false)
      sinon.stub(ValidateMatch.prototype, "checkIfTeamExistsIndB").resolves(true)
      const { status, body } = await chai.request(app).post('/matches').set({ "Authorization": TOKEN_VALID }).send(NEW_MATCHE_INPUT)
      expect(status).to.equal(HTTP_STATUS.SuccessCreated);
      expect(body).to.deep.equal(NEW_MATCHE_OUTPUT);
    });
  })
  describe("em caso de erro", () => {
    it("deve retornar uma mensagem de erro caso tente cadastrar um time competindo com ele mesmo e enviar status 422", async () => {
      sinon.stub(Model, 'findAll').resolves(MATCHES_IN_DB)
      sinon.stub(ValidateMatch.prototype, "checkIfTeamExistsIndB").resolves(true)
      sinon.stub(ValidateMatch.prototype, "checkIfMatchDuplicate").resolves(true);
      const { status, body } = await chai.request(app).post('/matches').set({ "Authorization": TOKEN_VALID }).send(TEAM_COMPETING_WITH_ITSELF)
      expect(status).to.equal(HTTP_STATUS.UnprocessableContentError);
      expect(body).to.have.property('message').to.equal("It is not possible to create a match with two equal teams")
    })
    it("deve retornar uma mensagem de erro caso o usuario tente castrar um time que não esteja registrado no banco de dados e enviar status 404", async () => {
      sinon.stub(Model, 'findAll').resolves(MATCHES_IN_DB)
      sinon.stub(Model, "create").resolves(NEW_MATCHE_OUTPUT);
      sinon.stub(ValidateMatch.prototype, "checkIfMatchDuplicate").resolves(false);
      sinon.stub(ValidateMatch.prototype, "checkIfTeamExistsIndB").resolves(false)
      const { status, body } = await chai.request(app).post('/matches').set({ "Authorization": TOKEN_VALID }).send(NEW_MATCHE_INPUT)
      expect(status).to.equal(HTTP_STATUS.NotFoundError);
      expect(body).to.have.property('message').to.equal("There is no team with such id!")
    })
  })
})
describe("PATCH /matches/id/finish", () => {
  afterEach(() => {
    sinon.restore();
  });
  describe("em caso de sucesso", () => {
    it("deve retornar uma mensagem afirmando a atualização para dar fim da partida e enviar o status 200", async () => {
      sinon.stub(Model, "update").resolves([1]);
      const { status, body } = await chai
        .request(app)
        .patch("/matches/1/finish")
        .set({ Authorization: TOKEN_VALID });
      expect(status).to.equal(HTTP_STATUS.SuccessOK);
      expect(body).to.have.property("message").equal("Finished");
    });
  });
  describe("em caso de erro", () => {
    it("deve retornar uma mensagem de erro caso o token estiver invalido e enviar status 401", async () => {
      const { status, body } = await chai
        .request(app)
        .patch("/matches/2/finish")
        .set({ Authorization: TOKEN_INVALID });
      expect(status).to.equal(HTTP_STATUS.ClientErrorUnauthorized);
      expect(body)
        .to.have.property("message")
        .equal("Token must be a valid token");
    });
    it("deve retonar uma mensagem de erro caso o usuario não estiver com um token e enviar status 401", (done) => {
      chai
        .request(app)
        .patch("/matches/1/finish")
        .end((err, res) => {
          expect(res).to.have.status(HTTP_STATUS.ClientErrorUnauthorized);
          expect(res.body).to.have.property("message").equal("Token not found");
          done();
        });
    });
  });
  describe("em caso de erro no banco de dados", () => {
    it("deve retornar um erro e enviar status 500", async () => {
      sinon.stub(Model, "update").rejects(new Error("Erro no banco de dados"))
      const { status, body } = await chai.request(app).patch("/matches/id/finish").set({ "Authorization": TOKEN_VALID })
      expect(status).to.equal(HTTP_STATUS.InternalServerError);
      expect(body.message).to.equal("Erro no banco de dados");
    })
  })
});
describe("PATCH /matches/id", () => {
  afterEach(() => {
    sinon.restore();
  });
  describe("em caso de sucesso", () => {
    it("deve retornar uma mensagem afirmando a atualização dos goals da partida e enviar status 200", async () => {
      sinon.stub(Model, "update").resolves([1]);
      const { status, body } = await chai.request(app).patch('/matches/1').set({ "Authorization": TOKEN_VALID })
      expect(status).to.equal(HTTP_STATUS.SuccessOK);
      expect(body).to.have.property("message").equal("Goals updated successfully");
    })
  })
  describe("em caso de erro", () => {
    it("deve retornar uma mensagem de erro caso o token estiver invalido e enviar status 401", async () => {
      const { status, body } = await chai
        .request(app)
        .patch("/matches/2")
        .set({ Authorization: TOKEN_INVALID });
      expect(status).to.equal(HTTP_STATUS.ClientErrorUnauthorized);
      expect(body)
        .to.have.property("message")
        .equal("Token must be a valid token");
    });
    it("deve retonar uma mensagem de erro caso o usuario não estiver com um token e enviar status 401", (done) => {
      chai
        .request(app)
        .patch("/matches/1")
        .end((err, res) => {
          expect(res).to.have.status(HTTP_STATUS.ClientErrorUnauthorized);
          expect(res.body).to.have.property("message").equal("Token not found");
          done();
        });
    });
  });
  describe("em caso de erro no banco de dados", () => {
    it("deve retornar um erro e enviar status 500", async () => {
      sinon.stub(Model, "update").rejects(new Error("Erro no banco de dados"));
      const { status, body } = await chai.request(app).patch('/matches/1').set({ "Authorization": TOKEN_VALID })
      expect(status).to.equal(HTTP_STATUS.InternalServerError);
      expect(body.message).to.equal('Erro no banco de dados')
    })
  })
})
