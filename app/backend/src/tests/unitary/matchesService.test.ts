import { expect } from 'chai';
import MatchesService from '../../api/services/MatchesService';
import Matche from '../../database/models/Matche';
import Sinon from 'sinon';
import { MATCHES_IN_DB } from '../integration/mocks/matches';
import { MATCHES_IN_PROGRESS_FALSE, MATCHES_IN_PROGRESS_TRUE } from './mocks/matchesService';

describe('MatchesService', () => {
  let matchesService: MatchesService;
  beforeEach(() => {
    matchesService = new MatchesService();
    Sinon.restore()
  })
  describe('Metodo getAllByProgress', () => {
    describe("em caso de sucesso", () => {
      it('Deve retornar as partidas em andamento quando o progresso for verdadeiro("true")', async () => {
        Sinon.stub(MatchesService.prototype, "getAllMatches").resolves(MATCHES_IN_DB)
        const result = await matchesService.getAllByProgress('true');

        expect(result).to.deep.equal(MATCHES_IN_PROGRESS_TRUE);
      });

      it('Deve retornar as partidas em andamento quando o progresso for falso("false")', async () => {
        Sinon.stub(MatchesService.prototype, "getAllMatches").resolves(MATCHES_IN_DB)
        const result = await matchesService.getAllByProgress('false');

        expect(result).to.deep.equal(MATCHES_IN_PROGRESS_FALSE);
      });
    })
    describe("em caso de erro", () => {
      it('Deve retornar undefined caso for passado um tipo de progresso invalido("nem true e nem false")', async () => {
        Sinon.stub(MatchesService.prototype, "getAllMatches").resolves(MATCHES_IN_DB)
        const result = await matchesService.getAllByProgress('invalid-progress');

        expect(result).to.be.undefined;
      });
    })
  });
});