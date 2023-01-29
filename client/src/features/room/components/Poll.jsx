import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Card, CardHeader, CardActions, CardContent, Divider, Stack } from '@mui/material';

import ChoiceButton from './ChoiceButton';
import CastedAnswer from './CastedAnswer';

import { aggregateAnswers } from '../utils/aggregateAnswers';

const Poll = forwardRef(({ poll, user, onSubmitChoice, ...rest }, ref) => {
  const aggregatedAnswers = aggregateAnswers(poll.choices, poll.answers);
  const hasUserAnswered = poll.answers.some((answer) => answer.user.id === user.id);

  const handleClickChoice = (choiceId) => {
    if (!hasUserAnswered) {
      onSubmitChoice(choiceId);
    }
  };

  return (
    <Card ref={ref} {...rest}>
      <CardHeader
        title={poll.title}
        subheader={`${poll.answers.length} answer${poll.answers.length === 1 ? '' : 's'}`}
        titleTypographyProps={{
          variant: 'h5',
        }}
        sx={{ textAlign: 'center' }}
      />
      <Divider />
      <CardActions>
        <Stack direction="column" spacing={1} sx={{ width: 1 }}>
          {poll.choices.map((choice, index) => (
            <ChoiceButton
              key={choice.id}
              index={index}
              choice={choice}
              votes={aggregatedAnswers[choice.id].length}
              totalVotes={poll.answers.length}
              disabled={hasUserAnswered}
              onClickChoice={handleClickChoice}
            />
          ))}
        </Stack>
      </CardActions>
      <Divider />
      <CardContent>
        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
          {Object.values(aggregatedAnswers).map((answers, index) =>
            answers.map((answer) => <CastedAnswer key={answer.user.id} answer={answer} choiceIndex={index} />)
          )}
        </Stack>
      </CardContent>
    </Card>
  );
});

Poll.displayName = 'Poll';

Poll.propTypes = {
  poll: PropTypes.shape({
    title: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
      })
    ).isRequired,
    answers: PropTypes.arrayOf(
      PropTypes.shape({
        user: PropTypes.shape({
          id: PropTypes.string.isRequired,
        }),
      })
    ).isRequired,
  }),
};

export default Poll;
