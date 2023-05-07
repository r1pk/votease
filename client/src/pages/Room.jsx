import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { Unstable_Grid2 as Grid } from '@mui/material';
import { Stack } from '@mui/material';

import UserList from '@/components/room/UserList';
import LeaveRoomButton from '@/components/room/LeaveRoomButton';
import Poll from '@/components/poll/Poll';
import ToggleEditorButton from '@/components/poll/ToggleEditorButton';
import PollEditor from '@/components/poll/PollEditor';
import ResetAnswersButton from '@/components/poll/ResetAnswersButton';

import { useDocumentTitle } from '@/hooks/useDocumentTitle';

import { colyseus } from '@/apis/colyseus';
import { actions } from '@/redux/actions';

const Room = () => {
  const [isPollEditorEnabled, setIsPollEditorEnabled] = useState(false);

  const poll = useSelector((store) => store.poll);
  const room = useSelector((store) => store.room);
  const session = useSelector((store) => store.session);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isCurrentUserRoomOwner = session.user.id === room.owner.id;

  const plainPoll = {
    title: poll.title,
    choices: poll.choices.map((choice) => choice.title),
  };

  const handleSubmitChoice = (choiceId) => {
    colyseus.room.send('poll::cast-answer', {
      choiceId: choiceId,
    });
  };

  const handleEditPoll = (data) => {
    colyseus.room.send('poll::edit', data);
    setIsPollEditorEnabled(false);
  };

  const handleResetPollAnswers = () => {
    colyseus.room.send('poll::reset-answers');
  };

  const handleLeaveRoom = async () => {
    colyseus.room.leave();
    dispatch(actions.store.clear());
    navigate('/');
  };

  const handleTogglePollEditor = () => {
    setIsPollEditorEnabled(!isPollEditorEnabled);
  };

  useEffect(
    function setupCoreListeners() {
      const handleRoomStateChange = (state) => {
        const { poll, owner, users } = JSON.parse(JSON.stringify(state));

        dispatch(actions.poll.setPollState(poll));
        dispatch(actions.room.setRoomUsers({ owner: owner, users: Object.values(users) }));
      };

      const handleRoomError = (code, message) => {
        console.error(`Room error: ${code} - ${message}`);
        toast.error(message);
      };

      colyseus.room.onStateChange(handleRoomStateChange);
      colyseus.room.onError(handleRoomError);

      return function cleanup() {
        colyseus.room.removeAllListeners();
      };
    },
    [dispatch]
  );

  useDocumentTitle('Room');

  return (
    <Grid container sx={{ justifyContent: 'center' }}>
      <Grid xs={12} sm={8} md={6} lg={4}>
        <Stack spacing={2}>
          {isCurrentUserRoomOwner && (
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} sx={{ justifyContent: 'flex-end' }}>
              <ToggleEditorButton
                onTogglePollEditor={handleTogglePollEditor}
                isPollEditorEnabled={isPollEditorEnabled}
              />
              <ResetAnswersButton onResetPollAnswers={handleResetPollAnswers} />
            </Stack>
          )}
          {!isPollEditorEnabled && <Poll poll={poll} user={session.user} onSubmitChoice={handleSubmitChoice} />}
          {isPollEditorEnabled && <PollEditor onEditPoll={handleEditPoll} defaultValues={{ poll: plainPoll }} />}
          <UserList users={room.users} owner={room.owner} />
          <Stack direction="row" sx={{ justifyContent: 'flex-end' }}>
            <LeaveRoomButton onLeaveRoom={handleLeaveRoom} />
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Room;
