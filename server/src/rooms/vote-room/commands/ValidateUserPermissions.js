import { Command } from '@colyseus/command';

export class ValidateUserPermissions extends Command {
  validate(payload = {}) {
    return payload.enabled ?? true;
  }

  execute({ userId }) {
    if (this.state.owner.id !== userId) {
      throw new Error('You are not allowed to perform this action.');
    }
  }
}
