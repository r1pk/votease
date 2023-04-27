import { Command } from '@colyseus/command';

export class ValidateUserAnswer extends Command {
  validate(payload = {}) {
    return payload.enabled ?? true;
  }

  execute({ choiceId }) {
    const choiceIndex = this.state.poll.choices.findIndex((choice) => choice.id === choiceId);

    if (choiceIndex === -1) {
      throw new Error('Choice with given id not found.');
    }
  }
}
