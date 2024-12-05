import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface TeamMember {
    id: string;
    nickname: string;
    role: 'LEADER' | 'MEMBER';
    imageUrl?: string | null;
}

interface Team {
    id: string;
    name: string;
    description: string; // 팀 설명 추가
    members: TeamMember[];
    isMember?: boolean;
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
        updateTeamMemberStatus: (
            state,
            action: PayloadAction<{ id: string | number; isMember: boolean }>
        ) => {
            const team = state.teams.find((team) => team.id === action.payload.id);
            if (team) {
                team.isMember = action.payload.isMember;
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
    updateTeamMemberStatus,
    setSelectedTeam,
    clearSelectedTeam,
} = teamSlice.actions;

export default teamSlice.reducer;
