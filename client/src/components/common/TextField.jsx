import { forwardRef } from 'react';

import { TextField as MUITextField } from '@mui/material';

const TextField = forwardRef((props, ref) => {
  return <MUITextField size="small" variant="outlined" ref={ref} {...props} />;
});

TextField.displayName = 'TextField';

export default TextField;
