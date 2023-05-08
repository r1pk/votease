import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Edit } from '@mui/icons-material';
import { Button } from '@mui/material';

const ToggleEditorButton = forwardRef(({ onTogglePollEditor, isPollEditorEnabled, ...rest }, ref) => {
  const handleButtonClick = () => {
    onTogglePollEditor();
  };

  return (
    <Button size="small" variant="contained" startIcon={<Edit />} onClick={handleButtonClick} ref={ref} {...rest}>
      {isPollEditorEnabled ? 'Close Poll Editor' : 'Show Poll Editor'}
    </Button>
  );
});

ToggleEditorButton.displayName = 'ToggleEditorButton';

ToggleEditorButton.propTypes = {
  onTogglePollEditor: PropTypes.func.isRequired,
  isPollEditorEnabled: PropTypes.bool.isRequired,
};

export default ToggleEditorButton;
