import Matche from "../../database/models/Matche";

export const MATCHES_IN_DB = [
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


export const NEW_MATCHE_INPUT = {
  "homeTeamId": 16,
  "homeTeamGoals": 2,
  "awayTeamId": 8,
  "awayTeamGoals": 2,
}

export const NEW_MATCHE_OUTPUT = {
        "id": 2,
        "homeTeamId": 16,
        "homeTeamGoals": 2,
        "awayTeamId": 8,
        "awayTeamGoals": 2,
        "inProgress": true,
} as unknown as Matche

export const TEAM_COMPETING_WITH_ITSELF = {
  "homeTeamId": 1,
  "homeTeamGoals": 2,
  "awayTeamId": 1,
  "awayTeamGoals": 2,
}







//     it("/matches - POST - deve retornar status 401 e uma mensagem de erro caso o usuario não estiver com um token", (done) => {
//       chai.request(app)
//       .post("/matches")
//       .end((err, res) => {
//         expect(res).to.have.status(401);
//         expect(res.body).to.have.property('message').equal('Token not found');
//         done();
//       });
//     })
//     it("/matches - POST - deve retornar status 401 e uma mensagem de erro caso o usuario estiver com um token invalido", async () => {
//       const tokenInvalid = "eyJhbGciOiJIUzI1iIsnR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE2NzgxMjkyNzYsImV4cCI6MTcyMTMyOTI3Nn0.lIiw4TS_EoQUAgQ1acKCoWVGuBx0PZ6YnCSrMnPYhsw"
//       const response = await chai.request(app).post("/matches").set({ 'Authorization': tokenInvalid });
//       expect(response.status).to.be.equal(401)
//       expect(response.body).to.deep.equal({
//         "message": "Token must be a valid token"
//       })
//       expect(response.body).to.have.property('message')
//     })