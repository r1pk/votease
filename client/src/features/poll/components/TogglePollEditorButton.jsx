import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Edit } from '@mui/icons-material';

import Button from '@/components/form/Button';

const TogglePollEditorButton = forwardRef(({ onTogglePollEditor, isPollEditorEnabled, ...rest }, ref) => {
  const handleButtonClick = () => {
    onTogglePollEditor();
  };

  return (
    <Button startIcon={<Edit />} onClick={handleButtonClick} ref={ref} {...rest}>
      {isPollEditorEnabled ? 'Close Poll Editor' : 'Show Poll Editor'}
    </Button>
  );
});

TogglePollEditorButton.displayName = 'TogglePollEditorButton';

TogglePollEditorButton.propTypes = {
  onTogglePollEditor: PropTypes.func.isRequired,
  isPollEditorEnabled: PropTypes.bool.isRequired,
};

export default TogglePollEditorButton;
