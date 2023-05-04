import { useState } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { Grid, Stack } from '@mui/material';

import UserList from '@/components/room/UserList';
import LeaveRoomButton from '@/components/room/LeaveRoomButton';

import Poll from '@/components/poll/Poll';
import ToggleEditorButton from '@/components/poll/ToggleEditorButton';
import PollEditor from '@/components/poll/PollEditor';
import ResetAnswersButton from '@/components/poll/ResetAnswersButton';

import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useNavigationBlocker } from '@/hooks/useNavigationBlocker';

import { colyseus } from '@/apis/colyseus';

const Room = () => {
  const [isPollEditorEnabled, setIsPollEditorEnabled] = useState(false);

  const roomId = useSelector((store) => store.room.id);
  const poll = useSelector((store) => store.room.poll);
  const owner = useSelector((store) => store.room.owner);
  const user = useSelector((store) => store.session.user);
  const users = useSelector((store) => store.room.users);

  const navigate = useNavigate();

  const isCurrentUserRoomMember = Boolean(roomId);
  const isCurrentUserRoomOwner = user.id === owner.id;

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
    try {
      await colyseus.room.leave();
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLeavePage = () => {
    colyseus.room.leave();
  };

  const handleTogglePollEditor = () => {
    setIsPollEditorEnabled(!isPollEditorEnabled);
  };

  useDocumentTitle('Room');
  useNavigationBlocker(handleLeavePage, isCurrentUserRoomMember);

  return (
    <Grid container sx={{ justifyContent: 'center' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
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
          {!isPollEditorEnabled && <Poll poll={poll} user={user} onSubmitChoice={handleSubmitChoice} />}
          {isPollEditorEnabled && <PollEditor onEditPoll={handleEditPoll} defaultValues={{ poll: plainPoll }} />}
          <UserList users={users} owner={owner} />
          <Stack direction="row" sx={{ justifyContent: 'flex-end' }}>
            <LeaveRoomButton onLeaveRoom={handleLeaveRoom} />
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Room;
