import { Command } from '@colyseus/command';

export class SetRoomOwner extends Command {
  validate({ enabled = true }) {
    return enabled;
  }

  execute({ userId }) {
    this.state.owner = this.state.users.get(userId);
  }
}
