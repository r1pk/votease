import { forwardRef } from 'react';

import { RestartAlt } from '@mui/icons-material';
import { Button } from '@mui/material';

const ResetAnswersButton = forwardRef((props, ref) => {
  return (
    <Button size="small" variant="contained" startIcon={<RestartAlt />} ref={ref} {...props}>
      Reset Poll Answers
    </Button>
  );
});

ResetAnswersButton.displayName = 'ResetAnswersButton';

export default ResetAnswersButton;
