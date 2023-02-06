import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Card, CardHeader, CardContent, CardActions, Divider } from '@mui/material';

import Button from '@/components/form/Button';

import { FormProvider, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import PollBuilderForm from './PollBuilderForm';

import { EditPollFormSchema } from '../schemas/EditPollFormSchema';

const EditPollForm = forwardRef(({ onEditPoll, defaultValues, ...rest }, ref) => {
  const form = useForm({
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

  const onSubmit = (data) => {
    if (form.formState.isValid) {
      onEditPoll(data);
    }
  };

  return (
    <FormProvider {...form}>
      <Card component="form" onSubmit={form.handleSubmit(onSubmit)} ref={ref} {...rest}>
        <CardHeader
          title="Edit Poll"
          titleTypographyProps={{
            variant: 'h5',
          }}
          sx={{ textAlign: 'center' }}
        />
        <Divider />
        <CardContent>
          <PollBuilderForm name="poll" />
        </CardContent>
        <CardActions>
          <Button type="submit" disabled={!form.formState.isValid} fullWidth>
            Edit
          </Button>
        </CardActions>
      </Card>
    </FormProvider>
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
