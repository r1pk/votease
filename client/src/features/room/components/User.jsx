import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Chip, Avatar } from '@mui/material';
import { Star } from '@mui/icons-material';

const User = forwardRef(({ user, isRoomOwner, ...rest }, ref) => {
  return (
    <Chip
      avatar={
        <Avatar sx={{ backgroundColor: ({ palette }) => (isRoomOwner ? palette.secondary.main : '') }}>
          {isRoomOwner ? <Star /> : user.username.charAt(0)}
        </Avatar>
      }
      label={user.username}
      ref={ref}
      {...rest}
    />
  );
});

User.displayName = 'User';

User.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  isRoomOwner: PropTypes.bool.isRequired,
};

export default User;
