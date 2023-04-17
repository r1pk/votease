import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import Joi from 'joi';

import { Card, CardHeader, CardContent, CardActions, Divider, Stack } from '@mui/material';

import TextField from '@/components/common/TextField';
import Button from '@/components/common/Button';

import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { createRandomUsername } from '@/utils/create-random-username';

const schema = Joi.object({
  username: Joi.string().trim().alphanum().min(3).max(20).required().label('username'),
  poll: Joi.object({
    title: Joi.string().required().label('title'),
    choices: Joi.array().min(2).items(Joi.string().label('choice')).required().label('choices'),
  }),
});

const CreateRoomForm = forwardRef(({ onCreateRoom, ...rest }, ref) => {
  const { control, formState, handleSubmit } = useForm({
    mode: 'all',
    defaultValues: {
      username: createRandomUsername(),
      poll: {
        title: 'Initial Poll',
        choices: ['Option 1', 'Option 2'],
      },
    },
    resolver: joiResolver(schema),
  });
  const { isValid } = formState;

  const onSubmit = (data) => {
    if (isValid) {
      onCreateRoom(data);
    }
  };

  return (
    <Card component="form" onSubmit={handleSubmit(onSubmit)} ref={ref} {...rest}>
      <CardHeader
        title="Create Room"
        titleTypographyProps={{
          variant: 'h5',
        }}
        sx={{ textAlign: 'center' }}
      />
      <Divider />
      <CardContent>
        <Stack direction="column" spacing={1}>
          <Controller
            name="username"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
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
        <Button type="submit" disabled={!isValid} fullWidth>
          Create
        </Button>
      </CardActions>
    </Card>
  );
});

CreateRoomForm.displayName = 'CreateRoomForm';

CreateRoomForm.propTypes = {
  onCreateRoom: PropTypes.func.isRequired,
};

export default CreateRoomForm;
