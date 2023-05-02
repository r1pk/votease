import { Command } from '@colyseus/command';

export class DeleteUserAnswer extends Command {
  validate(payload = {}) {
    return payload.enabled ?? true;
  }

  execute({ userId }) {
    const answerIndex = this.state.poll.answers.findIndex((answer) => answer.user.id === userId);

    if (answerIndex !== -1) {
      this.state.poll.answers.splice(answerIndex, 1);
    }
  }
}
