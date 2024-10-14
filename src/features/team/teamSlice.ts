import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Team} from './type';

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
  },
});

export const {createTeam} = teamSlice.actions;
export default teamSlice.reducer;
