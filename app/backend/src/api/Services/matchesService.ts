import { ModelStatic } from 'sequelize';
import Team from '../../database/models/Team';
import Matche from '../../database/models/Matche';
import IMatchesService from '../interfaces/IMatchesService';

export default class MatchesService implements IMatchesService {
  protected model: ModelStatic<Matche> = Matche;

  async getAllMatches(): Promise<Matche[]> {
    const matches = await this.model.findAll({
      include: [
        {
          model: Team,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: Team,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return matches;
  }
}
