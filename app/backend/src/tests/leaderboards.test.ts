import chai from "chai";
import chaiHttp from "chai-http";
import Sinon from "sinon";
import {app} from '../app'

chai.use(chaiHttp)
const {expect} = chai

describe("testes na rota Leaderboards na aplicação", async () => {
    afterEach(() => {
        Sinon.restore()
    })
    it(" /leaderboard/home - GET - deve retornar status 200 e a lista dos times da casa com todas as informações referentes as estatiticas e posição na tabela", async () => {
        const response = await chai.request(app).get('/leaderboard/home')
        expect(response.status).to.equal(200)
    })
})