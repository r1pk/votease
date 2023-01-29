import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Card, CardHeader, CardContent, CardActions, Divider, Stack } from '@mui/material';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Paper } from '@mui/material';
import { ExpandMore, Add, Remove } from '@mui/icons-material';

import TextField from '@/components/form/TextField';
import Button from '@/components/form/Button';
import IconButton from '@/components/form/IconButton';

import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { CreateRoomFormSchema } from '../schemas/CreateRoomFormSchema';

import { createRandomUsername } from '../utils/createRandomUsername';

const CreateRoomForm = forwardRef(({ onCreateRoom, disableForm, ...rest }, ref) => {
  const { control, formState, handleSubmit } = useForm({
    mode: 'all',
    defaultValues: {
      username: createRandomUsername(),
      poll: {
        title: 'Your poll title',
        choices: ['Option 1', 'Option 2'],
      },
    },
    resolver: joiResolver(CreateRoomFormSchema),
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'poll.choices' });

  const handleAddChoice = () => {
    append('');
  };

  const handleRemoveChoice = () => {
    remove(fields.length - 1);
  };

  const onSubmit = (data) => {
    if (formState.isValid && !disableForm) {
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
          <Accordion>
            <AccordionSummary>
              <Stack sx={{ alignItems: 'center', width: 1 }}>
                <Typography variant="button">Poll settings</Typography>
                <ExpandMore />
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
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
            </AccordionDetails>
          </Accordion>
        </Stack>
      </CardContent>
      <CardActions>
        <Button type="submit" disabled={!formState.isValid || disableForm} fullWidth>
          Create
        </Button>
      </CardActions>
    </Card>
  );
});

CreateRoomForm.displayName = 'CreateRoomForm';

CreateRoomForm.propTypes = {
  onCreateRoom: PropTypes.func.isRequired,
  disableForm: PropTypes.bool,
};

export default CreateRoomForm;
