import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { Controller, useForm } from 'react-hook-form';

import { Button, Card, CardActions, CardContent, CardHeader, Stack, TextField } from '@mui/material';

import { createRandomUsername } from '@/utils/create-random-username';

const schema = Joi.object({
  roomId: Joi.string().trim().length(9).required().label('roomId'),
  username: Joi.string().trim().alphanum().min(3).max(20).required().label('username'),
});

const JoinRoomForm = forwardRef(({ roomId, onSubmit, ...rest }, ref) => {
  const { control, formState, handleSubmit } = useForm({
    mode: 'all',
    defaultValues: {
      roomId: roomId || '',
      username: createRandomUsername(),
    },
    resolver: joiResolver(schema),
  });
  const { isValid } = formState;

  const handleFormSubmit = (data) => {
    if (!isValid) {
      return;
    }

    onSubmit(data);
  };

  return (
    <Card component="form" onSubmit={handleSubmit(handleFormSubmit)} ref={ref} {...rest}>
      <CardHeader
        title="Join Room"
        titleTypographyProps={{
          variant: 'overline',
        }}
        sx={{ textAlign: 'center', p: 1 }}
      />
      <CardContent>
        <Stack direction="column" spacing={2}>
          <Controller
            name="roomId"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                size="small"
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
  roomId: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default JoinRoomForm;
