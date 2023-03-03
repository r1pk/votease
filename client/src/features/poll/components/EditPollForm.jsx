import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Card, CardHeader, CardContent, CardActions, Stack, Paper, Divider } from '@mui/material';

import { Add, Remove } from '@mui/icons-material';

import Button from '@/components/form/Button';
import TextField from '@/components/form/TextField';
import IconButton from '@/components/form/IconButton';

import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { EditPollFormSchema } from '../schemas/EditPollFormSchema';

const EditPollForm = forwardRef(({ onEditPoll, defaultValues, ...rest }, ref) => {
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
    resolver: joiResolver(EditPollFormSchema),
  });
  const { fields, append, remove } = useFieldArray({ control: control, name: 'poll.choices' });

  const handleAddChoice = () => {
    append(`Choice ${fields.length + 1}`);
  };

  const handleRemoveChoice = () => {
    remove(fields.length - 1);
  };

  const onSubmit = (data) => {
    if (formState.isValid) {
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
                label="Poll title"
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
                {...field}
              />
            )}
          />
          <Paper elevation={3}>
            <Stack spacing={2} sx={{ p: 2 }}>
              {fields.map((choice, index) => (
                <Controller
                  key={choice.id}
                  control={control}
                  name={`poll.choices.${index}`}
                  render={({ field, fieldState }) => (
                    <TextField
                      label={`Choice ${index + 1}`}
                      error={Boolean(fieldState.error)}
                      helperText={fieldState.error?.message}
                      {...field}
                    />
                  )}
                />
              ))}
              <Stack direction="row" spacing={1} sx={{ justifyContent: 'center' }}>
                <IconButton onClick={handleAddChoice}>
                  <Add />
                </IconButton>
                <IconButton onClick={handleRemoveChoice} disabled={fields.length <= 2}>
                  <Remove />
                </IconButton>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </CardContent>
      <CardActions>
        <Button type="submit" disabled={!formState.isValid} fullWidth>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
});

EditPollForm.displayName = 'EditPollForm';

EditPollForm.propTypes = {
  onEditPoll: PropTypes.func.isRequired,
  defaultValues: PropTypes.shape({
    poll: PropTypes.shape({
      title: PropTypes.string,
      choices: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
};

export default EditPollForm;
