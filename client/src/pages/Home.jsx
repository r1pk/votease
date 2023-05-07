import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { Unstable_Grid2 as Grid } from '@mui/material';
import { Stack, Paper, Typography, Tabs, Tab } from '@mui/material';

import JoinRoomForm from '@/components/room/JoinRoomForm';
import CreateRoomForm from '@/components/room/CreateRoomForm';

import { useDocumentTitle } from '@/hooks/useDocumentTitle';

import { colyseus } from '@/apis/colyseus';
import { actions } from '@/redux/actions';

const Home = () => {
  const [activeTab, setActiveTab] = useState('create-room');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeTab = (_, value) => {
    setActiveTab(value);
  };

  const handleRoomReady = () => {
    const { id, sessionId, state } = colyseus.room;
    const { poll, owner, users } = JSON.parse(JSON.stringify(state));
    const username = state.users.get(sessionId).username;

    dispatch(actions.poll.setPollState(poll));
    dispatch(actions.room.setRoomId(id));
    dispatch(actions.room.setRoomOwner(owner));
    dispatch(actions.room.setRoomUsers(Object.values(users)));
    dispatch(actions.session.setSessionUser({ id: sessionId, username: username }));

    navigate(`/rooms/${id}`);
  };

  const handleCreateRoom = async (data) => {
    try {
      await colyseus.create('vote-room', {
        username: data.username,
        poll: data.poll,
      });

      colyseus.room.onStateChange.once(() => {
        handleRoomReady();
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleJoinRoom = async (data) => {
    try {
      await colyseus.joinById(data.roomId, {
        username: data.username,
      });

      colyseus.room.onStateChange.once(() => {
        handleRoomReady();
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useDocumentTitle('Home');

  return (
    <Grid container columns={16} sx={{ justifyContent: 'center' }}>
      <Grid xs={16} sm={10} md={8} lg={5}>
        <Paper sx={{ p: 2 }}>
          <Stack spacing={2}>
            <Typography variant="h2" sx={{ p: 2, pb: 0, textAlign: 'center' }}>
              {import.meta.env.VITE_BASE_APP_TITLE}
            </Typography>
            <Tabs centered value={activeTab} onChange={handleChangeTab}>
              <Tab label="Create Room" value="create-room" to="create-room" />
              <Tab label="Join Room" value="join-room" to="join-room" />
            </Tabs>
            {activeTab === 'create-room' && <CreateRoomForm onCreateRoom={handleCreateRoom} elevation={2} />}
            {activeTab === 'join-room' && <JoinRoomForm onJoinRoom={handleJoinRoom} elevation={2} />}
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Home;
