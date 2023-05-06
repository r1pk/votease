import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import poll from './slices/poll';
import room from './slices/room';
import session from './slices/session';

export const store = configureStore({
  reducer: {
    poll: poll.reducer,
    room: room.reducer,
    session: session.reducer,
  },
  middleware: [thunk],
});
