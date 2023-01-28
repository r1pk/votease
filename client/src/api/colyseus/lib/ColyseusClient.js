import { Client } from 'colyseus.js';

import { store, actions } from '@/redux';

class ColyseusClient extends Client {
  room = null;

  #handleRoomStateChange = (state) => {
    const plainState = JSON.parse(JSON.stringify(state));

    store.dispatch(actions.room.updateState(plainState));
  };

  async create(roomName, options, rootSchema) {
    if (this.room) {
      throw new Error('You need to leave the current room before creating a new one.');
    }

    this.room = await super.create(roomName, options, rootSchema);
    this.room.onStateChange(this.#handleRoomStateChange);

    return this.room;
  }

  async joinById(roomId, options, rootSchema) {
    if (this.room) {
      throw new Error('You need to leave the current room before joining a new one.');
    }

    this.room = await super.joinById(roomId, options, rootSchema);
    this.room.onStateChange(this.#handleRoomStateChange);

    return this.room;
  }

  async leave() {
    if (!this.room) {
      throw new Error('You need to create or join a room before leaving it.');
    }

    this.room.leave();
    this.room = null;
  }
}

export default ColyseusClient;
