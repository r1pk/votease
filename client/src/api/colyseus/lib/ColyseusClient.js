import { Client } from 'colyseus.js';

import { store, actions } from '@/redux';

class ColyseusClient extends Client {
  room = null;

  #handleRoomStateChange = (state) => {
    const plainState = JSON.parse(JSON.stringify(state));

    store.dispatch(
      actions.room.updateState({
        owner: plainState.owner,
        poll: plainState.poll,
        users: Object.values(plainState.users),
      })
    );
  };

  #handleRoomLeave = () => {
    store.dispatch(actions.room.resetState());
    store.dispatch(actions.session.resetState());

    this.room = null;
  };

  async create(roomName, options, rootSchema) {
    if (this.room) {
      throw new Error('You need to leave the current room before creating a new one.');
    }

    this.room = await super.create(roomName, options, rootSchema);
    this.room.onStateChange(this.#handleRoomStateChange);
    this.room.onLeave(this.#handleRoomLeave);

    return this.room;
  }

  async joinById(roomId, options, rootSchema) {
    if (this.room) {
      throw new Error('You need to leave the current room before joining a new one.');
    }

    this.room = await super.joinById(roomId, options, rootSchema);
    this.room.onStateChange(this.#handleRoomStateChange);
    this.room.onLeave(this.#handleRoomLeave);

    return this.room;
  }
}

export default ColyseusClient;
