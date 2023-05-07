import { createAction } from '@reduxjs/toolkit';

import poll from './slices/poll';
import room from './slices/room';
import session from './slices/session';

export const actions = {
  poll: poll.actions,
  room: room.actions,
  session: session.actions,
  store: {
    clear: createAction('store/clear'),
  },
};
