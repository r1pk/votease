import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Card, CardHeader, CardContent, CardActions, Divider, Stack } from '@mui/material';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

import TextField from '@/components/form/TextField';
import Button from '@/components/form/Button';

import { FormProvider, Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import PollBuilderForm from './PollBuilderForm';

import { CreateRoomFormSchema } from '../schemas/CreateRoomFormSchema';

import { createRandomUsername } from '../utils/createRandomUsername';

const CreateRoomForm = forwardRef(({ onCreateRoom, disableForm, ...rest }, ref) => {
  const form = useForm({
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

  const onSubmit = (data) => {
    if (form.formState.isValid && !disableForm) {
      onCreateRoom(data);
    }
  };

  return (
    <FormProvider {...form}>
      <Card component="form" onSubmit={form.handleSubmit(onSubmit)} ref={ref} {...rest}>
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
              control={form.control}
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
                <PollBuilderForm name="poll" />
              </AccordionDetails>
            </Accordion>
          </Stack>
        </CardContent>
        <CardActions>
          <Button type="submit" disabled={!form.formState.isValid || disableForm} fullWidth>
            Create
          </Button>
        </CardActions>
      </Card>
    </FormProvider>
  );
});

CreateRoomForm.displayName = 'CreateRoomForm';

CreateRoomForm.propTypes = {
  onCreateRoom: PropTypes.func.isRequired,
  disableForm: PropTypes.bool,
};

export default CreateRoomForm;
