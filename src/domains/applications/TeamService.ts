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

    async editTeam(
        token: string,
        teamName: string,
        teamDescription: string,
        teamId: string
    ) {
        return await this.teamRepo.editTeam(
            token,
            teamName,
            teamDescription,
            teamId
        );
    }

    async deleteTeam(token: string, teamId: string) {
        return await this.teamRepo.deleteTeam(token, teamId);
    }

    async inviteMember(token: string, teamId: string, email: string) {
        return await this.teamRepo.inviteMember(token, teamId, email);
    }

    async deleteMember(token: string, teamId: string, members: string[]) {
        return await this.teamRepo.deleteMember(token, teamId, members);
    }

    async acceptInvitation(token: string, teamId: number, inviteState: number) {
        return await this.teamRepo.acceptInvitation(token, teamId, inviteState);
    }

    async createProject(token: string, teamId: string, name: string, description: string, managerId: number, memberIdList: number[]) {
        return await this.teamRepo.createProject(token, teamId, name, description, managerId, memberIdList);
    }

    async getProjects(token: string, teamId: string) {
        return await this.teamRepo.getProjects(token, teamId);
    }
    async changeStatus(token: string, taskId: string, taskState: number) {
        return await this.teamRepo.changeStatus(token, taskId, taskState);
    }
    async createTask(token: string, projectId: string, taskData: any) {
        return await this.teamRepo.createTask(token, projectId, taskData);
    }
    async getTasks(token: string, projectId: string, teamId: string) {
        return await this.teamRepo.getTasks(token, teamId, projectId);
    }
}
