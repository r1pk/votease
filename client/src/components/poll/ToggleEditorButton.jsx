import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Edit } from '@mui/icons-material';
import { Button } from '@mui/material';

const ToggleEditorButton = forwardRef(({ isPollEditorEnabled, ...rest }, ref) => {
  return (
    <Button size="small" variant="contained" startIcon={<Edit />} ref={ref} {...rest}>
      {isPollEditorEnabled ? 'Close Poll Editor' : 'Show Poll Editor'}
    </Button>
  );
});

ToggleEditorButton.displayName = 'ToggleEditorButton';

ToggleEditorButton.propTypes = {
  isPollEditorEnabled: PropTypes.bool.isRequired,
};

export default ToggleEditorButton;
