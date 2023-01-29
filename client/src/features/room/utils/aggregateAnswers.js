export const aggregateAnswers = (choices, answers) => {
  const aggregated = {};

  for (const choice of choices) {
    aggregated[choice.id] = answers.filter((answer) => answer.choice.id === choice.id);
  }

  return aggregated;
};
