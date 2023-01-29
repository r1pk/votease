import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
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
    setRoomId: (state, action) => {
      state.id = action.payload.id;
    },
    updateState: (state, action) => {
      state.owner = action.payload.owner;
      state.poll = action.payload.poll;
      state.users = action.payload.users;
    },
    resetState: () => initialState,
  },
});

export const actions = slice.actions;
export default slice.reducer;
