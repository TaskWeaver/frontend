import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface TeamMember {
    id: string;
    nickname: string;
    role: 'LEADER' | 'MEMBER';
    imageUrl?: string | null;
}

interface ProjectMember {
    memberId: string;
    nickname: string;
    imageUrl: string | null;
}

interface Project {
    id: string;
    title: string;
    description: string;
    members: ProjectMember[];
}

interface Team {
    id: string;
    name: string;
    description: string; // 팀 설명
    members: TeamMember[];
    isMember?: boolean;
    projects: Project[]; // 팀 내 생성된 프로젝트 목록
}

interface TeamState {
    teams: Team[];
    selectedTeamId?: string | number;
    currentUserId: string; // 현재 사용자의 ID
}

const initialState: TeamState = {
    teams: [],
    currentUserId: '', // 기본값
};

export const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<string>) => {
            state.currentUserId = action.payload;
        },
        createTeam: (state, action: PayloadAction<Team>) => {
            state.teams.push({...action.payload, isMember: true});
        },
        setTeams: (state, action: PayloadAction<Team[]>) => {
            state.teams = action.payload.map((team) => ({
                ...team,
                isMember: team.isMember || false,
            }));
        },
        removeTeam: (state, action: PayloadAction<string | number>) => {
            state.teams = state.teams.filter((team) => team.id !== action.payload);
        },
        updateTeam: (state, action: PayloadAction<Partial<Team> & { id: string | number }>) => {
            const index = state.teams.findIndex((team) => team.id === action.payload.id);
            if (index !== -1) {
                state.teams[index] = {...state.teams[index], ...action.payload};
            }
        },
        addProject: (
            state,
            action: PayloadAction<{
                teamId: string;
                project: { id: string; title: string; description: string };
            }>
        ) => {
            const team = state.teams.find((team) => team.id === action.payload.teamId);
            if (team) {
                team.projects.push({...action.payload.project, members: []});
            }
        },
        addProjectMember: (
            state,
            action: PayloadAction<{
                teamId: string;
                projectId: string;
                memberId: string;
            }>
        ) => {
            const team = state.teams.find((team) => team.id === action.payload.teamId);
            const project = team?.projects.find((proj) => proj.id === action.payload.projectId);
            const member = team?.members.find((member) => member.id === action.payload.memberId);
            if (project && member) {
                project.members.push({
                    memberId: member.id,
                    nickname: member.nickname,
                    imageUrl: member.imageUrl || null,
                });
            }
        },
        setSelectedTeam: (state, action: PayloadAction<string | number>) => {
            state.selectedTeamId = action.payload;
        },
        clearSelectedTeam: (state) => {
            state.selectedTeamId = undefined;
        },
    },
});

export const {
    setCurrentUser,
    createTeam,
    setTeams,
    removeTeam,
    updateTeam,
    addProject,
    addProjectMember,
    setSelectedTeam,
    clearSelectedTeam,
} = teamSlice.actions;

export default teamSlice.reducer;
