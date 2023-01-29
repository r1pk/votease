import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Chip, Avatar } from '@mui/material';

const CastedAnswer = forwardRef(({ answer, choiceIndex, ...rest }, ref) => {
  return <Chip avatar={<Avatar>{choiceIndex + 1}</Avatar>} label={answer.user.username} ref={ref} {...rest} />;
});

CastedAnswer.displayName = 'CastedAnswer';

CastedAnswer.propTypes = {
  answer: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
  }).isRequired,
  choiceIndex: PropTypes.number.isRequired,
};

export default CastedAnswer;
