import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { RestartAlt } from '@mui/icons-material';
import { Button } from '@mui/material';

const ResetAnswersButton = forwardRef(({ onResetPollAnswers, ...rest }, ref) => {
  const handleButtonClick = () => {
    onResetPollAnswers();
  };

  return (
    <Button size="small" variant="contained" startIcon={<RestartAlt />} onClick={handleButtonClick} ref={ref} {...rest}>
      Reset Poll Answers
    </Button>
  );
});

ResetAnswersButton.displayName = 'ResetAnswersButton';

ResetAnswersButton.propTypes = {
  onResetPollAnswers: PropTypes.func.isRequired,
};

export default ResetAnswersButton;
