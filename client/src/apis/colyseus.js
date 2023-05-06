import { Client } from 'colyseus.js';

import { store } from '@/redux/store';
import { actions } from '@/redux/actions';

import { toast } from 'react-toastify';

class ColyseusClient extends Client {
  room = null;

  #handleRoomStateChange = (state) => {
    const plainState = JSON.parse(JSON.stringify(state));

    store.dispatch(actions.poll.setPollState(plainState.poll));
    store.dispatch(actions.room.setRoomUsers({ owner: plainState.owner, users: Object.values(plainState.users) }));
  };

  #handleRoomLeave = () => {
    store.dispatch(actions.poll.resetPollState());
    store.dispatch(actions.room.resetRoomState());
    store.dispatch(actions.session.resetSessionState());

    this.room = null;
  };

  #handleRoomError = (code, message) => {
    console.error(code, message);
    toast.error(message);
  };

  async create(roomName, options, rootSchema) {
    if (this.room) {
      throw new Error('You need to leave the current room before creating a new one.');
    }

    this.room = await super.create(roomName, options, rootSchema);

    this.room.onStateChange(this.#handleRoomStateChange);
    this.room.onLeave(this.#handleRoomLeave);
    this.room.onError(this.#handleRoomError);

    return this.room;
  }

  async joinById(roomId, options, rootSchema) {
    if (this.room) {
      throw new Error('You need to leave the current room before joining a new one.');
    }

    this.room = await super.joinById(roomId, options, rootSchema);

    this.room.onStateChange(this.#handleRoomStateChange);
    this.room.onLeave(this.#handleRoomLeave);
    this.room.onError(this.#handleRoomError);

    return this.room;
  }
}

export const colyseus = new ColyseusClient(import.meta.env.VITE_COLYSEUS_URL);
