import chai from "chai";
import chaiHttp from "chai-http";
import { app } from "../app"; 
import Sinon from "sinon"; 
import { Model } from 'sequelize'
import Team from "../database/models/Team";
const {expect} = chai
chai.use(chaiHttp);

describe("Testes na Rota Teams da aplicação", async () => {
   afterEach(() => {
    Sinon.restore();
  })
    it("/teams - GET - deve retornar status 200 e a lista dos times", async () => {
    // Arrange
    const teamsMock: Team[] = 
      [
        {
          teamName: 'Real Madri',
        },
        {
          teamName: 'Barcelona',
        },
        {
          teamName: 'Flamengo',
        },
        {
          teamName: 'Fortaleza',
        },
        {
          teamName: 'Vasco',
        },
      ] as unknown as Team[]
    
      Sinon.stub(Model, 'findAll').resolves(teamsMock)
    // Action     
    const response = await chai.request(app).get('/teams')
    // Assertion
    expect(response.status).to.equal(200)
    expect(response.body).to.deep.equal(teamsMock)
    })
    it("/teams/:id - GET deve retornar status 200 e o time no banco de dados referente ao id", async () => {
      const response = await chai.request(app).get('/teams/:id')
      expect(response.status).to.equal(200)
    })
})