import chai from "chai"
import sinon from "sinon"
import chaihtpp from 'chai-http'
import { app } from "../app"

chai.use(chaihtpp)
const {expect} = chai

describe("Testes na rota Login na aplicação", async () => {
    afterEach(() => {
        sinon.restore()
    })
it("/login - POST - deve retornar status 200 e um token caso o usuario esteja no banco de dados", async () => {
    const response = await chai.request(app).post("/login")
    expect(response.status).to.be.equal(200)
}) 
})