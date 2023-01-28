import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import session from './slices/session';
import room from './slices/room';

export const store = configureStore({
  reducer: {
    session: session,
    room: room,
  },
  middleware: [thunk],
});
