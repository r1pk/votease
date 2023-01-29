import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Paper, Stack } from '@mui/material';

import User from './User';

const UserList = forwardRef(({ users, owner, ...rest }, ref) => {
  return (
    <Paper sx={{ p: 1 }} ref={ref} {...rest}>
      <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
        {users.map((user) => (
          <User key={user.id} user={user} isRoomOwner={user.id === owner.id} />
        ))}
      </Stack>
    </Paper>
  );
});

UserList.displayName = 'UserList';

UserList.propTypes = {
  owner: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    })
  ),
};

export default UserList;
