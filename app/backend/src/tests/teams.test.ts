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
    it("/teams/:id - GET - deve retornar status 200 e o time no banco de dados referente ao id", async () => {
      const teamsOutput = [    { id: 99, teamName: "Rodoviaria" },    { id: 36, teamName: "Palmeiras" }  ] as unknown as Team[];
  
      Sinon.stub(Model, 'findAll').resolves(teamsOutput);
      // withArgs é um método do Sinon que permite definir argumentos específicos que devem ser usados em uma chamada de função quando o stub é acionado fonte:https://sinonjs.org/releases/latest/stubs/
      Sinon.stub(Model, 'findByPk').withArgs(teamsOutput[1].id).resolves(teamsOutput[1]);
    
      const response = await chai.request(app).get('/teams/36');
      
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('id', teamsOutput[1].id);
      expect(response.body).to.have.property('teamName', teamsOutput[1].teamName);
      expect(response.body).to.deep.equal(teamsOutput[1])
      expect(response.body.teamName).to.equal("Palmeiras")
      expect(response.body).to.not.equal("Rodoviaria")
    })
})