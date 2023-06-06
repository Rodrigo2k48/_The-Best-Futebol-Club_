import Matche from '../../../database/models/Matche';
import IMatch from '../../interfaces/IMach';

export default interface IMatchesService {
  getAllMatches(): Promise<Matche[]>;
  getAllByProgress(progress: string | boolean): Promise<Matche[] | void>;
  updateProgressMatch(id: string | number): Promise<string | void>;
  updateMatchGoalsById(id: string | number, homeTeamGoals: number, awayTeamGoals: number): Promise<string>;
  createMatch(dto: IMatch): Promise<Matche | void>;
}
