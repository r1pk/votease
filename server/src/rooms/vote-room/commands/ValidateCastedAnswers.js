import { Command } from '@colyseus/command';

export class ValidateCastedAnswers extends Command {
  validate({ enabled = true }) {
    return enabled;
  }

  execute({ userId }) {
    const choiceIndex = this.state.poll.answers.findIndex((answer) => answer.user.id === userId);

    if (choiceIndex !== -1) {
      throw new Error('You already casted your answer.');
    }
  }
}
