import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  owner: {
    id: '',
    username: '',
  },
  users: [],
};

const slice = createSlice({
  name: 'room',
  initialState: initialState,
  reducers: {
    setRoomId: (state, action) => {
      state.id = action.payload;
    },
    setRoomUsers: (state, action) => {
      state.owner = action.payload.owner;
      state.users = action.payload.users;
    },
  },
});

export default slice;
