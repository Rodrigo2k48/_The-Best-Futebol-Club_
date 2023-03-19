import Matche from '../../database/models/Matche';

export default interface IMatchesService {
  getAllMatches(): Promise<Matche[]>
  getAllByProgress(progress: string | boolean): Promise<Matche[] | void>
  updateProgressMatch(id: string | number): Promise<string | void>
  getMacheByID(id: string | number): Promise<Matche>
  updateMatchGoalsById(id: string | number, homeTeamGoals: number, awayTeamGoals: number):
  Promise<string>
}
