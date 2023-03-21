import chaiHttp from "chai-http"
import chai from "chai"
import Sinon from "sinon"
import { app } from "../app"
import Matche from "../database/models/Matche"
import { Model } from "sequelize"
import jwt from "jsonwebtoken"
import TeamsService from "../api/Services/teamsService"
import ValidateMatch from "../api/middlewares/validateMatch"


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
    it("/matches/id/finish - PATCH - deve retonar status 401 e uma mensagem de erro caso o usuario estiver com um token invalido", async () => {
        const tokenInvalid = "eyJhbGciOiJIUzI1iIsnR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE2NzgxMjkyNzYsImV4cCI6MTcyMTMyOTI3Nn0.lIiw4TS_EoQUAgQ1acKCoWVGuBx0PZ6YnCSrMnPYhsw"
        const response = await chai.request(app).patch("/matches/2/finish").set({ 'Authorization': tokenInvalid });
        expect(response.status).to.be.equal(401)  
        expect(response.body).to.deep.equal({
          "message": "Token must be a valid token"
        })
        expect(response.body).to.have.property('message')
    })
    it("/matches/id/finish - PATCH - caso o usuario esteja com um token valido, deve retornar status 200 e caso exista a partida passada por parametro da requisição via ID, uma mensagem afirmando a atualização da partida deve ser passada para o usuario", async () => {
      const tokenValid = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjc4NzM1NzQ2LCJleHAiOjE3MjE5MzU3NDZ9.2En2VOz8pkAFMyyQp6ryyrXJejfmW08mYK-20Eh-Ffo"
      Sinon.stub(jwt, 'verify').callsFake(() => Promise.resolve({ success: 'Token is valid' }))
      Sinon.stub(Model, 'update').resolves([1])
      const response = await chai.request(app).patch('/matches/1/finish')
      .set({Authorization: tokenValid});
      expect (response.status).to.be.equal(200);
      expect (response.body).to.be.deep.equal({ message: 'Finished' })
    })
    it("/matches/id - PATCH - deve retonar status 401 e uma mensagem de erro caso o usuario não estiver com um token", (done) => {
      chai.request(app)
        .patch("/matches/1")
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message').equal('Token not found');
          done();
        });
    })
    it("/matches/id - PATCH - deve retonar status 401 e uma mensagem de erro caso o usuario estiver com um token invalido", async () => {
        const tokenInvalid = "eyJhbGciOiJIUzI1iIsnR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE2NzgxMjkyNzYsImV4cCI6MTcyMTMyOTI3Nn0.lIiw4TS_EoQUAgQ1acKCoWVGuBx0PZ6YnCSrMnPYhsw"
        const response = await chai.request(app).patch("/matches/2").set({ 'Authorization': tokenInvalid });
        expect(response.status).to.be.equal(401)  
        expect(response.body).to.deep.equal({
          "message": "Token must be a valid token"
        })
        expect(response.body).to.have.property('message')
    })
    it("/matches/id - PATCH - deve retornar status 200 e caso exista a partida passado por parametro da requisição via ID, uma mensagem arfimando a atualização dos goals da partidas deve ser passada para o usuario", async () => {
      const tokenValid = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjc4NzM1NzQ2LCJleHAiOjE3MjE5MzU3NDZ9.2En2VOz8pkAFMyyQp6ryyrXJejfmW08mYK-20Eh-Ffo"
      Sinon.stub(jwt, 'verify').callsFake(() => Promise.resolve({ success: 'Token is valid' }))
      Sinon.stub(Model, 'update').resolves([1])
      const response = await chai.request(app).patch('/matches/1')
      .set({Authorization: tokenValid});
      expect (response.status).to.be.equal(200);
      expect (response.body).to.be.deep.equal({ message: 'Goals updated successfully' })
    })
    it("/matches - POST - deve retornar status 401 e uma mensagem de erro caso o usuario não estiver com um token", (done) => {
      chai.request(app)
      .post("/matches")
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('message').equal('Token not found');
        done();
      });
    })
    it("/matches - POST - deve retornar status 401 e uma mensagem de erro caso o usuario estiver com um token invalido", async () => {
      const tokenInvalid = "eyJhbGciOiJIUzI1iIsnR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE2NzgxMjkyNzYsImV4cCI6MTcyMTMyOTI3Nn0.lIiw4TS_EoQUAgQ1acKCoWVGuBx0PZ6YnCSrMnPYhsw"
      const response = await chai.request(app).post("/matches").set({ 'Authorization': tokenInvalid });
      expect(response.status).to.be.equal(401)  
      expect(response.body).to.deep.equal({
        "message": "Token must be a valid token"
      })
      expect(response.body).to.have.property('message')
    })
    it("/matches - POST - deve retornar status 201 e caso não exista a partida registada no banco de dados, deve retornar a partida cadastrada com sucesso", async () => {
      const tokenValid = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjc4NzM1NzQ2LCJleHAiOjE3MjE5MzU3NDZ9.2En2VOz8pkAFMyyQp6ryyrXJejfmW08mYK-20Eh-Ffo"
      const outputMock = {
      "id": 2,
      "homeTeamId": 16,
      "homeTeamGoals": 2,
      "awayTeamId": 8,
      "awayTeamGoals": 2,
      "inProgress": true, 
      }
      Sinon.stub(Model, 'create').resolves(outputMock as unknown as Matche)
      const newMatcheMock = {
        "homeTeamId": 14,
        "awayTeamId": 8, 
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
      }
      Sinon.stub(ValidateMatch.prototype, "checkIfMatchDuplicate").resolves(false)
      const response = await chai.request(app).post("/matches").set({'Authorization': tokenValid}).send(newMatcheMock)
      expect(response.status).to.equal(201)
      expect(response.body).to.deep.equal(outputMock as unknown as Matche)
    })
    it("/matches - POST - deve retornar status 422 e uma mensagem de erro caso o usuario tente cadastrar um time competindo com ele mesmo no banco de dados", async () => {
      const tokenValid = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjc4NzM1NzQ2LCJleHAiOjE3MjE5MzU3NDZ9.2En2VOz8pkAFMyyQp6ryyrXJejfmW08mYK-20Eh-Ffo"
      const outputMock = {
      "id": 2,
      "homeTeamId": 16,
      "homeTeamGoals": 2,
      "awayTeamId": 8,
      "awayTeamGoals": 2,
      "inProgress": true, 
      }
      Sinon.stub(Model, 'create').resolves(outputMock as unknown as Matche)
      const newMatcheMock = {
        "homeTeamId": 16,
        "awayTeamId": 16, 
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
      }
      Sinon.stub(ValidateMatch.prototype, "checkIfMatchDuplicate").resolves(true)
      const response = await chai.request(app).post("/matches").set({'Authorization': tokenValid}).send(newMatcheMock)
      console.log(response.body);
      
      expect(response.status).to.equal(422)
      expect(response.body).to.deep.equal({message: "It is not possible to create a match with two equal teams"})
    })
})