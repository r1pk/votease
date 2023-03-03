import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { RestartAlt } from '@mui/icons-material';

import Button from '@/components/form/Button';

const ResetPollAnswersButton = forwardRef(({ onResetPollAnswers, ...rest }, ref) => {
  const handleButtonClick = () => {
    onResetPollAnswers();
  };

  return (
    <Button startIcon={<RestartAlt />} onClick={handleButtonClick} ref={ref} {...rest}>
      Reset Poll Answers
    </Button>
  );
});

ResetPollAnswersButton.displayName = 'ResetPollAnswersButton';

ResetPollAnswersButton.propTypes = {
  onResetPollAnswers: PropTypes.func.isRequired,
};

export default ResetPollAnswersButton;
