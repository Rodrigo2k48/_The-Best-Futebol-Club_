import chaiHttp from "chai-http"
import chai from "chai"
import Sinon from "sinon"
import { app } from "../app"
import Matche from "../database/models/Matche"
import { Model } from "sequelize"


chai.use(chaiHttp)
const {expect} = chai

describe("testes na rota Matches na aplicação", () => {
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
      // Action     
      const response = await chai.request(app).get('/matches')
      // Assertion
      expect(response.status).to.equal(200)
      expect(response.body).to.deep.equal(matcheMock)
    })
})