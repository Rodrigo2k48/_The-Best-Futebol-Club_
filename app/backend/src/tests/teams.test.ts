import chai from "chai";
import chaiHttp from "chai-http";
import { app } from "../app"; 
import Sinon from "sinon"; 
const {expect} = chai
chai.use(chaiHttp);

describe("Testes na Rota Teams da aplicação", async () => {
   afterEach(() => {
    Sinon.restore();
  })

    it("/teams - GET - deve retornar status 200 e a lista dos times", async () => {
    // Arrange
    // Action     
    const response = await chai.request(app).get('/teams')
    // Assertion
    expect(response.status).to.equal(200)
    })
})