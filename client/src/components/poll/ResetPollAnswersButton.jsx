import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Button } from '@mui/material';
import { RestartAlt } from '@mui/icons-material';

const ResetPollAnswersButton = forwardRef(({ onResetPollAnswers, ...rest }, ref) => {
  const handleButtonClick = () => {
    onResetPollAnswers();
  };

  return (
    <Button size="small" variant="contained" startIcon={<RestartAlt />} onClick={handleButtonClick} ref={ref} {...rest}>
      Reset Poll Answers
    </Button>
  );
});

ResetPollAnswersButton.displayName = 'ResetPollAnswersButton';

ResetPollAnswersButton.propTypes = {
  onResetPollAnswers: PropTypes.func.isRequired,
};

export default ResetPollAnswersButton;
