// src/features/team/teamSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Team} from '../../assets/types/type.ts';

interface TeamState {
  teams: Team[];
}

const initialState: TeamState = {
  teams: [],
};

export const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    createTeam: (state, action: PayloadAction<Team>) => {
      state.teams.push(action.payload);
    },
    setTeams: (state, action: PayloadAction<Team[]>) => {
      state.teams = action.payload;
    },
    removeTeam: (state, action: PayloadAction<string | number>) => {
      state.teams = state.teams.filter((team) => team.id !== action.payload);
    },
    updateTeam: (
      state,
      action: PayloadAction<Partial<Team> & {id: string | number}>
    ) => {
      const index = state.teams.findIndex(
        (team) => team.id === action.payload.id
      );
      if (index !== -1) {
        state.teams[index] = {...state.teams[index], ...action.payload};
      }
    },
  },
});

export const {createTeam, setTeams, removeTeam, updateTeam} = teamSlice.actions;
export default teamSlice.reducer;
