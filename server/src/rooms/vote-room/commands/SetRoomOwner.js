import { Command } from '@colyseus/command';

export class SetRoomOwner extends Command {
  validate(payload = {}) {
    return payload.enabled ?? true;
  }

  execute({ userId }) {
    this.state.owner = this.state.users.get(userId);
  }
}
