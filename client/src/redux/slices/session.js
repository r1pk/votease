import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    id: '',
    username: '',
  },
};

const slice = createSlice({
  name: 'session',
  initialState: initialState,
});

export const actions = slice.actions;
export default slice.reducer;
