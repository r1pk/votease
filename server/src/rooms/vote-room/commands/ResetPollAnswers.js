import { Command } from '@colyseus/command';

export class ResetPollAnswers extends Command {
  validate(payload = {}) {
    return payload.enabled ?? true;
  }

  execute() {
    this.state.poll.answers = [];
  }
}
