import { Command } from '@colyseus/command';

export class ValidateUserPermissions extends Command {
  validate({ enabled = true }) {
    return enabled;
  }

  execute({ userId }) {
    if (this.state.owner.id !== userId) {
      throw new Error('You are not allowed to perform this action.');
    }
  }
}
