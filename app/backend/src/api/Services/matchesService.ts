import { ModelStatic } from 'sequelize';
import Team from '../../database/models/Team';
import Matche from '../../database/models/Matche';
import IMatchesService from '../interfaces/IMatchesService';

export default class MatchesService implements IMatchesService {
  protected model: ModelStatic<Matche> = Matche;

  async getAllByProgress(progress: string | boolean): Promise<Matche[] | void> {
    const matches = await this.getAllMatches();
    if (progress === 'true') {
      return matches.filter((match) => match.inProgress === true);
    }
    if (progress === 'false') {
      return matches.filter((match) => match.inProgress === false);
    }
  }

  async updateProgressMatch(id:number): Promise<string | void> {
    // https://medium.com/@sarahdherr/sequelizes-update-method-example-included-39dfed6821d
    await this.model.update(
      { inProgress: false },
      { where: { id } },
    );
    return 'Finished';
  }

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

  async getMacheByID(id: string | number): Promise<Matche> {
    const match = await this.model.findAll({
      where: {
        id,
      },
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
    return match[0].dataValues;
  }
}
