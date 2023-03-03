import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Card, CardHeader, CardActions, CardContent, Divider, Stack } from '@mui/material';

import ChoiceButton from './ChoiceButton';
import LinearIndicator from './LinearIndicator';
import UserAnswer from './UserAnswer';

import { sumAnswersPerChoice } from '../utils/sumAnswersPerChoice';

const Poll = forwardRef(({ poll, user, onSubmitChoice, ...rest }, ref) => {
  const answerCount = sumAnswersPerChoice(poll.choices, poll.answers);
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
          {hasUserAnswered &&
            poll.choices.map((choice) => (
              <LinearIndicator
                key={choice.id}
                choice={choice}
                votes={answerCount[choice.id]}
                totalVotes={poll.answers.length}
              />
            ))}
          {!hasUserAnswered &&
            poll.choices.map((choice) => (
              <ChoiceButton key={choice.id} choice={choice} onClickChoice={handleClickChoice} />
            ))}
        </Stack>
      </CardActions>
      <Divider />
      <CardContent>
        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
          {poll.answers.map((answer) => (
            <UserAnswer key={answer.user.id} answer={answer} />
          ))}
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
