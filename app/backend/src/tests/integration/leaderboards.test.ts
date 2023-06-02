import chai from "chai";
import chaiHttp from "chai-http";
import { Model } from "sequelize";
import sinon from "sinon";
import { app } from '../../app'
import Team from "../../database/models/Team";
import LeaderboardsController from "../../api/controllers/LeaderboardsController";
import { LEADERBOARD_AWAY_MOCK, LEADERBOARD_HOME_MOCK, LEADERBOARD_MOCK, MATCHES_LEADERBOARD, TEAMS_LEADERBOARD } from "../integration/mocks/leaderboards";
import { Response } from "express";
import MatchesService from "../../api/services/MatchesService";
import { MATCHES_IN_DB } from "../integration/mocks/matches";
import TeamsService from "../../api/services/TeamsService";
import HTTP_STATUS from "../../api/shared/htttpStatusCode";

chai.use(chaiHttp)
const { expect } = chai

describe("GET /leaderboard", () => {
    afterEach(() => {
        sinon.restore();
    })
    describe("em caso de sucesso", () => {
        it('deve retornar a tabela com as estatistica de todos os times que são mandantes e enviar status 200', async () => {
            sinon.stub(MatchesService.prototype, "getAllMatches").resolves(MATCHES_LEADERBOARD)
            sinon.stub(TeamsService.prototype, "getAllTeams").resolves(TEAMS_LEADERBOARD)
            const { status, body } = await chai.request(app).get("/leaderboard/home")

            expect(status).to.be.equal(HTTP_STATUS.SuccessOK);
            expect(body).to.deep.equal(LEADERBOARD_HOME_MOCK)
        })
        it("deve retornar a tabela com as estatistica de todos os times que são visitantes e enviar status 200", async () => {
            sinon.stub(MatchesService.prototype, "getAllMatches").resolves(MATCHES_LEADERBOARD)
            sinon.stub(TeamsService.prototype, "getAllTeams").resolves(TEAMS_LEADERBOARD)
            const { status, body } = await chai.request(app).get("/leaderboard/away")

            expect(status).to.be.equal(HTTP_STATUS.SuccessOK);
            expect(body).to.deep.equal(LEADERBOARD_AWAY_MOCK)
        }),
            it("deve retornar a tabela com as estatistica de todos os times e enviar status 200", async () => {
                sinon.stub(MatchesService.prototype, "getAllMatches").resolves(MATCHES_LEADERBOARD)
                sinon.stub(TeamsService.prototype, "getAllTeams").resolves(TEAMS_LEADERBOARD)
                const { status, body } = await chai.request(app).get("/leaderboard")

                expect(status).to.be.equal(HTTP_STATUS.SuccessOK);
                expect(body).to.deep.equal(LEADERBOARD_MOCK)
            })
    })
    describe('em caso de erro no banco de dados', () => {
        it("deve retornar um erro caso não seja possivel buscar todos os dados dos times da competição e enviar status 500", async () => {
            sinon.stub(TeamsService.prototype, "getAllTeams").throws(new Error('Erro no banco de dados'));
            const { status, body } = await chai.request(app).get('/leaderboard');

            expect(status).to.equal(HTTP_STATUS.InternalServerError);
            expect(body.message).to.equal('Erro no banco de dados')
        }),
            it("deve retornar um erro caso não seja possivel buscar todos os dados dos times mandantes da competição e enviar status 500", async () => {
                sinon.stub(TeamsService.prototype, "getAllTeams").throws(new Error('Erro no banco de dados'));
                const { status, body } = await chai.request(app).get('/leaderboard/home');

                expect(status).to.equal(HTTP_STATUS.InternalServerError);
                expect(body.message).to.equal('Erro no banco de dados')
            }),
            it("deve retornar um erro caso não seja possivel buscar todos os dados dos times visitante da competição e enviar status 500", async () => {
                sinon.stub(TeamsService.prototype, "getAllTeams").throws(new Error('Erro no banco de dados'));
                const { status, body } = await chai.request(app).get('/leaderboard/away');

                expect(status).to.equal(HTTP_STATUS.InternalServerError);
                expect(body.message).to.equal('Erro no banco de dados')
            });
    })
})