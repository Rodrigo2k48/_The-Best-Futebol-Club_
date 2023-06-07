import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { app } from '../../app';
import {
  LEADERBOARD_AWAY_MOCK,
  LEADERBOARD_HOME_MOCK,
  LEADERBOARD_MOCK,
  MATCHES_LEADERBOARD,
  TEAMS_LEADERBOARD,
} from '../integration/mocks/leaderboards';
import MatchesService from '../../api/services/MatchesService';
import TeamsService from '../../api/services/TeamsService';
import HTTP_STATUS from '../../api/shared/htttpStatusCode';

chai.use(chaiHttp);
const { expect } = chai;

describe('GET /leaderboard', () => {
  afterEach(() => {
    sinon.restore();
  });
  describe('em caso de sucesso', () => {
    beforeEach(() => {
      sinon.stub(MatchesService.prototype, 'getAllMatches').resolves(MATCHES_LEADERBOARD);
      sinon.stub(TeamsService.prototype, 'getAllTeams').resolves(TEAMS_LEADERBOARD);
    });
    it('deve retornar a tabela com as estatística de todos os times mandantes e enviar status 200', async () => {
      const { status, body } = await chai.request(app).get('/leaderboard/home');

      expect(status).to.be.equal(HTTP_STATUS.SuccessOK);
      expect(body).to.deep.equal(LEADERBOARD_HOME_MOCK);
    });
    it('deve retornar a tabela com as estatística de todos os times visitantes e enviar status 200', async () => {
      const { status, body } = await chai.request(app).get('/leaderboard/away');

      expect(status).to.be.equal(HTTP_STATUS.SuccessOK);
      expect(body).to.deep.equal(LEADERBOARD_AWAY_MOCK);
    }),
      it('deve retornar a tabela com as estatística de todos os times e enviar status 200', async () => {
        const { status, body } = await chai.request(app).get('/leaderboard');

        expect(status).to.be.equal(HTTP_STATUS.SuccessOK);
        expect(body).to.deep.equal(LEADERBOARD_MOCK);
      });
  });
  describe('em caso de erro no banco de dados', () => {
    beforeEach(() => {
      sinon.stub(TeamsService.prototype, 'getAllTeams').throws(new Error('Erro no banco de dados'));
    });
    it('deve retornar um erro caso não seja possivel buscar todos os dados dos times da competição e enviar status 500', async () => {
      const { status, body } = await chai.request(app).get('/leaderboard');

      expect(status).to.equal(HTTP_STATUS.InternalServerError);
      expect(body.message).to.equal('Erro no banco de dados');
    }),
      it('deve retornar um erro caso não seja possivel buscar todos os dados dos times mandantes da competição e enviar status 500', async () => {
        const { status, body } = await chai.request(app).get('/leaderboard/home');

        expect(status).to.equal(HTTP_STATUS.InternalServerError);
        expect(body.message).to.equal('Erro no banco de dados');
      }),
      it('deve retornar um erro caso não seja possivel buscar todos os dados dos times visitante da competição e enviar status 500', async () => {
        const { status, body } = await chai.request(app).get('/leaderboard/away');

        expect(status).to.equal(HTTP_STATUS.InternalServerError);
        expect(body.message).to.equal('Erro no banco de dados');
      });
  });
});
