import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Stack, Paper } from '@mui/material';

import { Add, Remove } from '@mui/icons-material';

import TextField from '@/components/form/TextField';
import IconButton from '@/components/form/IconButton';

import { Controller, useFormContext, useFieldArray } from 'react-hook-form';

const PollBuilderForm = forwardRef(({ name, ...rest }, ref) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: `${name}.choices` });

  const handleAddChoice = () => {
    append(`Choice ${fields.length + 1}`);
  };

  const handleRemoveChoice = () => {
    remove(fields.length - 1);
  };

  return (
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
  );
});

PollBuilderForm.displayName = 'PollBuilderForm';

PollBuilderForm.propTypes = {
  name: PropTypes.string.isRequired,
};

export default PollBuilderForm;
