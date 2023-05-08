import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Paper, Stack } from '@mui/material';

import UserChip from './UserChip';

const UserList = forwardRef(({ users, owner, ...rest }, ref) => {
  return (
    <Paper sx={{ p: 1 }} ref={ref} {...rest}>
      <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
        {users.map((user) => (
          <UserChip key={user.id} user={user} isRoomOwner={user.id === owner.id} />
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
