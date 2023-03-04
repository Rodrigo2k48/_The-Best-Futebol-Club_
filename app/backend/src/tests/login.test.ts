import chai from "chai"
import sinon from "sinon"
import chaihtpp from 'chai-http'
import { app } from "../app"
import { Model } from "sequelize"
import User from "../../src/database/models/User"

chai.use(chaihtpp)
const {expect} = chai

describe("Testes na rota Login na aplicação", async () => {
    afterEach(() => {
        sinon.restore()
    })
it("/login - POST - deve retornar status 200 e um token caso o usuario esteja no banco de dados", async () => {
    const loginMock = [{
        username: 'User',
        role: 'user',
        email: 'user@user.com',
        password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', 
          // senha: secret_user
      }] as unknown as User[]
  sinon.stub(Model, 'findAll').resolves(loginMock)
  const response = await chai.request(app).post("/login").send({
    email: "user@user.com",
    password: "secret_user",
  })
    expect(response.status).to.be.equal(200)
    expect(response.body).to.property("token")
}) 
it('/login - POST - deve retornar status 400 e uma mensagem de erro caso o campo "email" não for passado no corpo da requisição', async () => {
    const loginMock = [{
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
          // senha: secret_admin
      },] as unknown as User[]
  sinon.stub(Model, 'findAll').resolves(loginMock)
  const response = await chai.request(app).post("/login").send({
    password: "secret_user",
  })
    expect(response.status).to.be.not.equal(200)
    expect(response.badRequest).to.be.true
})
})