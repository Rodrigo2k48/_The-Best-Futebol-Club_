import chai from "chai";
import chaiHttp from "chai-http";
import { app } from "../app"; 
import Sinon from "sinon"; 
import { Model } from 'sequelize'
const {expect} = chai
chai.use(chaiHttp);

describe("Testes na Rota Teams da aplicação", async () => {
   afterEach(() => {
    Sinon.restore();
  })

    it("/teams - GET - deve retornar status 200 e a lista dos times", async () => {
    // Arrange
    const teamsMock = 
      [
        {
          team_name: 'Real Madri',
        },
        {
          team_name: 'Barcelona',
        },
        {
          team_name: 'Flamengo',
        },
        {
          team_name: 'Fortaleza',
        },
        {
          team_name: 'Vasco',
        },
      ]
    
      Sinon.stub(Model, 'findAll').resolves(teamsMock)
    // Action     
    const response = await chai.request(app).get('/teams')
    // Assertion
    expect(response.status).to.equal(200)
    expect(response.body).to.deep.equal(teamsMock)
    })
})