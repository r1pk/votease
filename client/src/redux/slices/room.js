import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  owner: {
    id: '',
    username: '',
  },
  poll: {
    title: '',
    choices: [],
    answers: [],
  },
  users: [],
};

const slice = createSlice({
  name: 'room',
  initialState: initialState,
  reducers: {
    updateState: (state, action) => {
      state.owner = action.payload.owner;
      state.poll = action.payload.poll;
      state.users = action.payload.users;
    },
  },
});

export const actions = slice.actions;
export default slice.reducer;
