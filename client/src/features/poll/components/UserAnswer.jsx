import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Chip, alpha } from '@mui/material';

import { createColorFromHash } from '../utils/createColorFromHash';

const UserAnswer = forwardRef(({ answer, ...rest }, ref) => {
  const choiceColor = createColorFromHash(answer.choice.id);

  return (
    <Chip
      size="small"
      label={answer.user.username}
      sx={{ backgroundColor: alpha(choiceColor, 0.3) }}
      ref={ref}
      {...rest}
    />
  );
});

UserAnswer.displayName = 'UserAnswer';

UserAnswer.propTypes = {
  answer: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
    choice: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default UserAnswer;
