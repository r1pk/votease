import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Button } from '@mui/material';

const ChoiceButton = forwardRef(({ choice, onClickChoice, ...rest }, ref) => {
  const handleButtonClick = () => {
    onClickChoice(choice.id);
  };

  return (
    <Button size="large" variant="contained" onClick={handleButtonClick} sx={{ py: 2 }} ref={ref} {...rest}>
      {choice.title}
    </Button>
  );
});

ChoiceButton.displayName = 'ChoiceButton';

ChoiceButton.propTypes = {
  choice: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  onClickChoice: PropTypes.func.isRequired,
};

export default ChoiceButton;
