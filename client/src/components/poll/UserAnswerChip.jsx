import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Chip, alpha } from '@mui/material';

import { createColorFromHash } from '@/utils/create-color-from-hash';

const UserAnswerChip = forwardRef(({ answer, ...rest }, ref) => {
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

UserAnswerChip.displayName = 'UserAnswerChip';

UserAnswerChip.propTypes = {
  answer: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
    choice: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default UserAnswerChip;
