import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import Joi from 'joi';

import { Card, CardHeader, CardContent, CardActions, Divider, Stack, TextField, Button } from '@mui/material';

import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { createRandomUsername } from '@/utils/create-random-username';

const schema = Joi.object({
  roomId: Joi.string().trim().length(9).required().label('roomId'),
  username: Joi.string().trim().alphanum().min(3).max(20).required().label('username'),
});

const JoinRoomForm = forwardRef(({ onJoinRoom, roomId, ...rest }, ref) => {
  const { control, formState, handleSubmit } = useForm({
    mode: 'all',
    defaultValues: {
      roomId: roomId || '',
      username: createRandomUsername(),
    },
    resolver: joiResolver(schema),
  });
  const { isValid } = formState;

  const onSubmit = (data) => {
    if (isValid) {
      onJoinRoom(data);
    }
  };

  return (
    <Card component="form" onSubmit={handleSubmit(onSubmit)} ref={ref} {...rest}>
      <CardHeader
        title="Join Room"
        titleTypographyProps={{
          variant: 'h5',
        }}
        sx={{ textAlign: 'center' }}
      />
      <Divider />
      <CardContent>
        <Stack direction="column" spacing={2}>
          <Controller
            name="roomId"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                size="small"
                variant="outlined"
                label="Room ID"
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
                disabled={Boolean(roomId)}
                fullWidth
                {...field}
              />
            )}
          />
          <Controller
            name="username"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                size="small"
                variant="outlined"
                label="Username"
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
                fullWidth
                {...field}
              />
            )}
          />
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" type="submit" disabled={!isValid} fullWidth>
          Join
        </Button>
      </CardActions>
    </Card>
  );
});

JoinRoomForm.displayName = 'JoinRoomForm';

JoinRoomForm.propTypes = {
  onJoinRoom: PropTypes.func.isRequired,
  roomId: PropTypes.string,
};

export default JoinRoomForm;
