import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  choices: [],
  answers: [],
};

const slice = createSlice({
  name: 'poll',
  initialState: initialState,
  reducers: {
    setPollState: (state, action) => {
      state.title = action.payload.title;
      state.choices = action.payload.choices;
      state.answers = action.payload.answers;
    },
    resetPollState: () => initialState,
  },
});

export default slice;
