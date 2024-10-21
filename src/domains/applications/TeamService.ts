import TeamRepository from '../infrastructures/TeamRepository.ts';

export default class TeamService {
  private readonly teamRepo: TeamRepository;

  constructor(teamRepo: TeamRepository) {
    this.teamRepo = teamRepo;
  }

  async getTeam(token: string) {
    return await this.teamRepo.getTeam(token);
  }

  async createTeam(token: string, teamName: string, teamDescription: string) {
    return await this.teamRepo.createTeam(token, teamName, teamDescription);
  }
}
