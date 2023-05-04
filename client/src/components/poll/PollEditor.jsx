import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import Joi from 'joi';

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Stack,
  Paper,
  Divider,
  Button,
  TextField,
  IconButton,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

const schema = Joi.object({
  poll: Joi.object({
    title: Joi.string().required().label('title'),
    choices: Joi.array().min(2).items(Joi.string().label('choice')).required().label('choices'),
  }),
});

const PollEditor = forwardRef(({ onEditPoll, defaultValues, ...rest }, ref) => {
  const { control, formState, handleSubmit } = useForm({
    mode: 'all',
    defaultValues: Object.assign(
      {
        poll: {
          title: 'Your poll title',
          choices: ['Option 1', 'Option 2'],
        },
      },
      defaultValues
    ),
    resolver: joiResolver(schema),
  });
  const { fields, append, remove } = useFieldArray({ control: control, name: 'poll.choices' });
  const { isValid, isDirty } = formState;

  const handleAddChoice = () => {
    append(`Choice ${fields.length + 1}`);
  };

  const handleRemoveChoice = () => {
    remove(fields.length - 1);
  };

  const onSubmit = (data) => {
    if (isValid && isDirty) {
      onEditPoll(data);
    }
  };

  return (
    <Card component="form" onSubmit={handleSubmit(onSubmit)} ref={ref} {...rest}>
      <CardHeader
        title="Edit Poll"
        titleTypographyProps={{
          variant: 'h5',
        }}
        sx={{ textAlign: 'center' }}
      />
      <Divider />
      <CardContent>
        <Stack spacing={2} ref={ref} {...rest}>
          <Controller
            control={control}
            name="poll.title"
            render={({ field, fieldState }) => (
              <TextField
                size="small"
                label="Poll title"
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
                {...field}
              />
            )}
          />
          <Paper elevation={3} sx={{ p: 2 }}>
            <Stack spacing={2}>
              {fields.map((choice, index) => (
                <Controller
                  key={choice.id}
                  control={control}
                  name={`poll.choices.${index}`}
                  render={({ field, fieldState }) => (
                    <TextField
                      size="small"
                      label={`Choice ${index + 1}`}
                      error={Boolean(fieldState.error)}
                      helperText={fieldState.error?.message}
                      {...field}
                    />
                  )}
                />
              ))}
              <Stack direction="row" spacing={1} sx={{ justifyContent: 'center' }}>
                <IconButton size="small" onClick={handleAddChoice}>
                  <Add />
                </IconButton>
                <IconButton size="small" onClick={handleRemoveChoice} disabled={fields.length <= 2}>
                  <Remove />
                </IconButton>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" type="submit" disabled={!(isValid && isDirty)} fullWidth>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
});

PollEditor.displayName = 'PollEditor';

PollEditor.propTypes = {
  onEditPoll: PropTypes.func.isRequired,
  defaultValues: PropTypes.shape({
    poll: PropTypes.shape({
      title: PropTypes.string,
      choices: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
};

export default PollEditor;
