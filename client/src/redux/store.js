import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import poll from './slices/poll';
import room from './slices/room';
import session from './slices/session';

export const reducer = combineReducers({
  poll: poll.reducer,
  room: room.reducer,
  session: session.reducer,
});

export const store = configureStore({
  reducer: (state, action) => {
    if (action.type === 'store/clear') {
      state = undefined;
    }
    return reducer(state, action);
  },
  middleware: [thunk],
});
