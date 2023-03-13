import Matche from '../../database/models/Matche';

export default interface IMatchesService {
  getAllMatches(): Promise<Matche[]>
  getAllByProgress(progress: string | boolean): Promise<Matche[] | void>
}
