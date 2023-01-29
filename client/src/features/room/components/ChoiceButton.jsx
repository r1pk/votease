import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { alpha } from '@mui/material';

import Button from '@/components/form/Button';

import { createLinearGradient } from '../utils/createLinearGradient';
import { getPercentageValue } from '../utils/getPercentageValue';

const ChoiceButton = forwardRef(({ index, choice, votes, totalVotes, onClickChoice, ...rest }, ref) => {
  const percentageValue = getPercentageValue(votes, totalVotes);

  const handleButtonClick = () => {
    onClickChoice(choice.id);
  };

  return (
    <Button
      size="large"
      onClick={handleButtonClick}
      sx={{
        ':disabled': {
          background: ({ palette }) => createLinearGradient(percentageValue, alpha(palette.primary.main, 0.3)),
        },
      }}
      ref={ref}
      {...rest}
    >
      {index + 1}. {choice.title} ({votes})
    </Button>
  );
});

ChoiceButton.displayName = 'ChoiceButton';

ChoiceButton.propTypes = {
  choice: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  votes: PropTypes.number.isRequired,
  totalVotes: PropTypes.number.isRequired,
  onClickChoice: PropTypes.func.isRequired,
};

export default ChoiceButton;
