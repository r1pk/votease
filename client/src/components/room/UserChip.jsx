import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Star } from '@mui/icons-material';
import { Chip, Avatar } from '@mui/material';

const UserChip = forwardRef(({ user, isRoomOwner, ...rest }, ref) => {
  return (
    <Chip
      avatar={
        <Avatar sx={{ backgroundColor: isRoomOwner ? '#B66F1A' : '' }}>
          {isRoomOwner ? <Star /> : user.username.charAt(0)}
        </Avatar>
      }
      label={user.username}
      ref={ref}
      {...rest}
    />
  );
});

UserChip.displayName = 'UserChip';

UserChip.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  isRoomOwner: PropTypes.bool.isRequired,
};

export default UserChip;
