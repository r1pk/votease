import { Command } from '@colyseus/command';

import { User } from '../schemas/User.js';

export class CreateUserInstance extends Command {
  validate(payload = {}) {
    return payload.enabled ?? true;
  }

  execute({ userId, username }) {
    const user = new User().assign({
      id: userId,
      username: username,
    });

    this.state.users.set(userId, user);
  }
}
