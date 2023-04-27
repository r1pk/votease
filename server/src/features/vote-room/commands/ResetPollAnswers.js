import { Command } from '@colyseus/command';

export class ResetPollAnswers extends Command {
  validate({ enabled = true }) {
    return enabled;
  }

  execute() {
    this.state.poll.answers = [];
  }
}
