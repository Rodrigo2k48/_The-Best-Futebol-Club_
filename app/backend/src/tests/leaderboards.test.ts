import chai from "chai";
import chaiHttp from "chai-http";
import { Model } from "sequelize";
import Sinon from "sinon";
import {app} from '../app'
import Matche from "../database/models/Matche";
import Team from "../database/models/Team";

chai.use(chaiHttp)
const {expect} = chai




describe("testes na rota Leaderboards na aplicação", async () => {
    afterEach(() => {
        Sinon.restore()
    })
    it(" /leaderboard/home - GET - deve retornar status 200 e a lista dos times da casa com todas as informações referentes as estatiticas e posição na tabela", async () => {     
        const teamListMock = [ 
            { id: 1, teamName: 'Avaí/Kindermann' },
            { id: 2, teamName: 'Bahia' },
            { id: 3, teamName: 'Botafogo' },
            { id: 4, teamName: 'Corinthians' },
            { id: 5, teamName: 'Cruzeiro' },
            { id: 6, teamName: 'Ferroviária' },
            { id: 7, teamName: 'Flamengo' },
            { id: 8, teamName: 'Grêmio' },
            { id: 9, teamName: 'Internacional' },
            { id: 10, teamName: 'Minas Brasília' },
            { id: 11, teamName: 'Napoli-SC' },
            { id: 12, teamName: 'Palmeiras' },
            { id: 13, teamName: 'Real Brasília' },
            { id: 14, teamName: 'Santos' },
            { id: 15, teamName: 'São José-SP' },
            { id: 16, teamName: 'São Paulo' }
          ]

          Sinon.stub(Model, 'findAll').resolves(teamListMock as Team[]);
      
          const response = await chai.request(app).get('/leaderboard/home')
      
          expect(response.status).to.be.equal(200); 
         
    })
    it(" /leaderboard/away - GET - deve retornar status 200 e a lista dos times que não são times da casa com todas as informações referentes as estatiticas e posição na tabela", async () => {     
        const teamListMock = [ 
            { id: 1, teamName: 'Avaí/Kindermann' },
            { id: 2, teamName: 'Bahia' },
            { id: 3, teamName: 'Botafogo' },
            { id: 4, teamName: 'Corinthians' },
            { id: 5, teamName: 'Cruzeiro' },
            { id: 6, teamName: 'Ferroviária' },
            { id: 7, teamName: 'Flamengo' },
            { id: 8, teamName: 'Grêmio' },
            { id: 9, teamName: 'Internacional' },
            { id: 10, teamName: 'Minas Brasília' },
            { id: 11, teamName: 'Napoli-SC' },
            { id: 12, teamName: 'Palmeiras' },
            { id: 13, teamName: 'Real Brasília' },
            { id: 14, teamName: 'Santos' },
            { id: 15, teamName: 'São José-SP' },
            { id: 16, teamName: 'São Paulo' }
          ]

          Sinon.stub(Model, 'findAll').resolves(teamListMock as Team[]);
      
          const response = await chai.request(app).get('/leaderboard/away')
      
          expect(response.status).to.be.equal(200); 
    })
    it(" /leaderboard/ - GET - deve retornar status 200 e a lista de todos os times com todas as informações referentes as estatiticas e posição na tabela", async () => {     
        const teamListMock = [ 
            { id: 1, teamName: 'Avaí/Kindermann' },
            { id: 2, teamName: 'Bahia' },
            { id: 3, teamName: 'Botafogo' },
            { id: 4, teamName: 'Corinthians' },
            { id: 5, teamName: 'Cruzeiro' },
            { id: 6, teamName: 'Ferroviária' },
            { id: 7, teamName: 'Flamengo' },
            { id: 8, teamName: 'Grêmio' },
            { id: 9, teamName: 'Internacional' },
            { id: 10, teamName: 'Minas Brasília' },
            { id: 11, teamName: 'Napoli-SC' },
            { id: 12, teamName: 'Palmeiras' },
            { id: 13, teamName: 'Real Brasília' },
            { id: 14, teamName: 'Santos' },
            { id: 15, teamName: 'São José-SP' },
            { id: 16, teamName: 'São Paulo' }
          ]

          Sinon.stub(Model, 'findAll').resolves(teamListMock as Team[]);
      
          const response = await chai.request(app).get('/leaderboard/')
      
          expect(response.status).to.be.equal(200); 
    })
})