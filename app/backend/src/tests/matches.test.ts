import chaiHttp from "chai-http"
import chai from "chai"
import Sinon from "sinon"
import { app } from "../app"
import Matche from "../database/models/Matche"
import { Model } from "sequelize"


chai.use(chaiHttp)
const {expect} = chai

describe("testes na rota Matches na aplicação",  async () => {
    afterEach(() => {
        Sinon.restore()
    })
    it("/matches - GET - deve retornar status 200 e a lista de todos os jogos", async () => {
        const matcheMock = [
            {
              "id": 1,
              "homeTeamId": 16,
              "homeTeamGoals": 1,
              "awayTeamId": 8,
              "awayTeamGoals": 1,
              "inProgress": false,
              "homeTeam": {
                "teamName": "São Paulo"
              },
              "awayTeam": {
                "teamName": "Grêmio"
              }
            },
            {
              "id": 41,
              "homeTeamId": 16,
              "homeTeamGoals": 2,
              "awayTeamId": 9,
              "awayTeamGoals": 0,
              "inProgress": true,
              "homeTeam": {
                "teamName": "São Paulo"
              },
              "awayTeam": {
                "teamName": "Internacional"
              }
            }
          ] as unknown as Matche[]
      
        Sinon.stub(Model, 'findAll').resolves(matcheMock)
      const response = await chai.request(app).get('/matches')
      
      expect(response.status).to.equal(200)
      expect(response.body).to.deep.equal(matcheMock)
    })
    it("/matches?inProgress - GET - deve retornar status 200 e a lista dos jogos que estão em andamento", async () => {
      const matcheMock = [
        {
          "id": 1,
          "homeTeamId": 16,
          "homeTeamGoals": 1,
          "awayTeamId": 8,
          "awayTeamGoals": 1,
          "inProgress": false,
          "homeTeam": {
            "teamName": "São Paulo"
          },
          "awayTeam": {
            "teamName": "Grêmio"
          }
        },
        {
          "id": 41,
          "homeTeamId": 16,
          "homeTeamGoals": 2,
          "awayTeamId": 9,
          "awayTeamGoals": 0,
          "inProgress": true,
          "homeTeam": {
            "teamName": "São Paulo"
          },
          "awayTeam": {
            "teamName": "Internacional"
          }
        }
      ] as unknown as Matche[]
      Sinon.stub(Model, 'findAll').resolves(matcheMock)
      const response = await chai.request(app).get('/matches?inProgress=true')

      expect(response.status).to.equal(200)
      expect(response.body[0].inProgress).to.equal(true)
      expect(response.body[0].id).to.equal(41)
      expect(response.body[0].awayTeam.teamName).to.equal("Internacional")
    }),
    it("/matches?inProgress - GET - deve retornar status 200 e a lista dos jogos que já estão finalizados", async () => {
      const matcheMock = [
        {
          "id": 1,
          "homeTeamId": 16,
          "homeTeamGoals": 1,
          "awayTeamId": 8,
          "awayTeamGoals": 1,
          "inProgress": false,
          "homeTeam": {
            "teamName": "São Paulo"
          },
          "awayTeam": {
            "teamName": "Grêmio"
          }
        },
        {
          "id": 41,
          "homeTeamId": 16,
          "homeTeamGoals": 2,
          "awayTeamId": 9,
          "awayTeamGoals": 0,
          "inProgress": true,
          "homeTeam": {
            "teamName": "São Paulo"
          },
          "awayTeam": {
            "teamName": "Internacional"
          }
        }
      ] as unknown as Matche[]
      Sinon.stub(Model, 'findAll').resolves(matcheMock)
      const response = await chai.request(app).get('/matches?inProgress=false')

      expect(response.status).to.equal(200)
      expect(response.body[0].inProgress).to.equal(false)
      expect(response.body[0].id).to.equal(1)
      expect(response.body[0].awayTeam.teamName).to.equal("Grêmio")
    })
    it("/matches/id/finish - PATCH - deve retonar status 401 e uma mensagem de erro caso o usuario não estiver com um token", (done) => {
      chai.request(app)
        .patch("/matches/1/finish")
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message').equal('Token not found');
          done();
        });
      })
})