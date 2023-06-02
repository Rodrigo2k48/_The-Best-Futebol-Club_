import ValidateMatch from '../../api/middlewares/ValidateMatch';
import TeamsService from '../../api/services/TeamsService';
import sinon from 'sinon';
import { expect } from 'chai';
import Team from '../../database/models/Team';
import { TEAM_ID_ONE, TEAM_ID_TWO, TEAM_ONE, TEAM_TWO } from './mocks/validateMatch';
import { Model } from 'sequelize';
import { TEAMS_IN_DB } from '../integration/mocks/teams';


describe('ValidateMatch', () => {
    let validateMatch: ValidateMatch;

    beforeEach(() => {
        validateMatch = new ValidateMatch(TEAM_ID_ONE, TEAM_ID_TWO);
        sinon.restore()
    });

    describe('Metodo checkIfMatchDuplicate', () => {
        describe("em caso de sucesso", () => {
            it('Deve retornar false se os nomes das equipes forem diferentes', async () => {
                const teamsServiceStub = sinon.stub(TeamsService.prototype, 'getTeamById');
                teamsServiceStub.withArgs(1).resolves(TEAM_ONE);
                teamsServiceStub.withArgs(2).resolves(TEAM_TWO);
                const result = await validateMatch.checkIfMatchDuplicate();

                expect(result).to.be.false;
            });
        })
        describe("em caso de erro", () => {
            it('Deve retornar true se os nomes das equipes forem iguais', async () => {
                const teamsServiceStub = sinon.stub(TeamsService.prototype, 'getTeamById');
                teamsServiceStub.withArgs(1).resolves(TEAM_ONE);
                teamsServiceStub.withArgs(2).resolves(TEAM_ONE);
                const result = await validateMatch.checkIfMatchDuplicate();

                expect(result).to.be.true;
            });
        })
    });

    describe('Medoto checkIfTeamExistsIndB', () => {
        describe("em caso de sucesso", async () => {
            it('Deve retornar true se ambas as equipes existirem no banco de dados', async () => {
                sinon.stub(Model, 'findAll').resolves(TEAMS_IN_DB)
                const teamsServiceStub = sinon.stub(TeamsService.prototype, 'getTeamById');
                teamsServiceStub.withArgs(1).resolves(TEAM_ONE);
                teamsServiceStub.withArgs(2).resolves(TEAM_TWO);

                const result = await validateMatch.checkIfTeamExistsIndB();

                expect(result).to.be.true;
            });
        })
        describe("em caso de erro", () => {
            it('Deve retornar false se uma ou ambas as equipes não existirem no banco de dados', async () => {
                const teamsServiceStub = sinon.stub(TeamsService.prototype, 'getTeamById');
                teamsServiceStub.withArgs(1).resolves(null);
                teamsServiceStub.withArgs(2).resolves(TEAM_TWO);

                const result = await validateMatch.checkIfTeamExistsIndB();

                expect(result).to.be.false;

                teamsServiceStub.restore();
            });
        })

    });
});