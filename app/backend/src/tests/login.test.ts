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
    password: "secret_admin",
  })
    expect(response.status).to.be.not.equal(200)
    expect(response.badRequest).to.be.true
})
it('/login - POST - deve retornar status 400 e uma mensagem de erro caso o campo "password" não for passado no corpo da requisição', async () => {
    const loginMock = [{
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
          // senha: secret_admin
      },] as unknown as User[]
  sinon.stub(Model, 'findAll').resolves(loginMock)
  const response = await chai.request(app).post("/login").send({
    email: "user@user.com",
  })
    expect(response.status).to.be.not.equal(200)
    expect(response.badRequest).to.be.true
})
it('/login - POST - deve retornar status 401 e uma mensagem de erro caso o usuario não esteja cadastrado no banco de dados', async () => {
  const loginMock = [
    {
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
        // password: secret_admin
    },
    {
      username: 'User',
      role: 'user',
      email: 'user@user.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
        // password: secret_user
    },
  ] as unknown as User[];

  sinon.stub(Model, 'findAll').resolves(loginMock);

  const response = await chai.request(app)
    .post('/login')
    .send({
    email: "jefersonCaminhões@gmail.com",
    password: "cactosfelizes",
    });

  expect(response.status).to.equal(401);
});
it("/login/role - GET - deve retonar status 200 e a role do usuario logado na aplicação", async () => {
  const tokenValid = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE2NzgxMjkyNzYsImV4cCI6MTcyMTMyOTI3Nn0.lIiw4TS_EoQUAgQ1acKCoWVGuBx0PZ6YnCSrMnPYhsw"
  const response = await chai.request(app).get("/login/role").set({ 'Authorization': tokenValid });
  expect(response.status).to.be.equal(200)
  expect(response.body).to.property('role')
  expect(response.body).to.deep.equal({ role: 'user' });
})
it("/login/role - GET - deve retonar status 401 e uma mensagem de erro caso o usuario estiver com um token invalido", async () => {
  const tokenInvalid = "eyJhbGciOiJIUzI1iIsnR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE2NzgxMjkyNzYsImV4cCI6MTcyMTMyOTI3Nn0.lIiw4TS_EoQUAgQ1acKCoWVGuBx0PZ6YnCSrMnPYhsw"
  const response = await chai.request(app).get("/login/role").set({ 'Authorization': tokenInvalid });
  expect(response.status).to.be.equal(401)  
  expect(response.body).to.deep.equal({
    "message": "Token must be a valid token"
  })
  expect(response.body).to.have.property('message')
})
})
