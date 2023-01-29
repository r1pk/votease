import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { Grid, Stack } from '@mui/material';

import { Poll, UserList, LeaveRoomButton } from '@/features/room';

import { useDocumentTitle } from '@/hooks/useDocumentTitle';

import { colyseus } from '@/api/colyseus';

const RoomPage = () => {
  const poll = useSelector((store) => store.room.poll);
  const owner = useSelector((store) => store.room.owner);
  const user = useSelector((store) => store.session.user);
  const users = useSelector((store) => store.room.users);

  const navigate = useNavigate();

  const handleSubmitChoice = (choiceId) => {
    try {
      colyseus.room.send('poll::cast-answer', {
        choiceId: choiceId,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLeaveRoom = () => {
    try {
      colyseus.leave();
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  useDocumentTitle('Room');

  return (
    <Grid container sx={{ justifyContent: 'center' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Stack spacing={2}>
          <Poll poll={poll} user={user} onSubmitChoice={handleSubmitChoice} />
          <UserList users={users} owner={owner} />
          <Stack direction="row" sx={{ justifyContent: 'flex-end' }}>
            <LeaveRoomButton onLeaveRoom={handleLeaveRoom} />
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default RoomPage;
