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
    setRoomOwner: (state, action) => {
      state.owner.id = action.payload.id;
      state.owner.username = action.payload.username;
    },
    setRoomUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export default slice;
