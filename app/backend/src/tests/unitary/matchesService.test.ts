import { expect } from 'chai';
import MatchesService from '../../api/services/MatchesService';
import Sinon from 'sinon';
import { MATCHES_IN_DB } from '../integration/mocks/matches';
import { MATCHES_IN_PROGRESS_FALSE, MATCHES_IN_PROGRESS_TRUE } from './mocks/matchesService';

describe('MatchesService', () => {
  let matchesService: MatchesService;
  beforeEach(() => {
    matchesService = new MatchesService();
    Sinon.restore();
  });
  describe('Metodo getAllByProgress', () => {
    describe('em caso de sucesso', () => {
      beforeEach(() => {
        Sinon.stub(MatchesService.prototype, 'getAllMatches').resolves(MATCHES_IN_DB);
      });
      it('Deve retornar as partidas em andamento quando o progresso for true', async () => {
        const result = await matchesService.getAllByProgress('true');

        expect(result).to.deep.equal(MATCHES_IN_PROGRESS_TRUE);
      });

      it('Deve retornar as partidas em andamento quando o progresso for false', async () => {
        const result = await matchesService.getAllByProgress('false');

        expect(result).to.deep.equal(MATCHES_IN_PROGRESS_FALSE);
      });
    });
    describe('em caso de erro', () => {
      it('Deve retornar undefined caso for passado um tipo de progresso invalido', async () => {
        const result = await matchesService.getAllByProgress('invalid-progress');

        expect(result).to.be.undefined;
      });
    });
  });
});
