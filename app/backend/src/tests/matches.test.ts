import chaiHttp from "chai-http"
import chai from "chai"
import Sinon from "sinon"
import { app } from "../app"


chai.use(chaiHttp)
const {expect} = chai

describe("testes na rota Matches na aplicação", () => {
    afterEach(() => {
        Sinon.restore()
    })
    it("/matches - GET - deve retornar status 200 e a lista de todos os jogos", async () => {
        const response = await chai.request(app).get("/matches")
        expect(response.status).to.equal(200)
    })
})