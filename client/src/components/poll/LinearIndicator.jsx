import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Box, Stack, Typography, alpha } from '@mui/material';

import { createColorFromHash } from '@/utils/create-color-from-hash';
import { createLinearGradient } from '@/utils/create-linear-gradient';
import { getPercentageValue } from '@/utils/get-percentage-value';

const LinearIndicator = forwardRef(({ choice, votes, totalVotes, ...rest }, ref) => {
  const percentageValue = getPercentageValue(votes, totalVotes);
  const choiceColor = createColorFromHash(choice.id);

  return (
    <Stack sx={{ position: 'relative' }} ref={ref} {...rest}>
      <Box
        sx={{
          position: 'absolute',
          width: 1,
          height: 1,
          borderRadius: 1,
          background: () => createLinearGradient(`${percentageValue}%`, alpha(choiceColor, 0.3)),
        }}
      />
      <Stack sx={{ width: 1, p: 1, alignItems: 'center', zIndex: 1 }}>
        <Typography variant="button" sx={{ textAlign: 'center' }}>
          {choice.title}
        </Typography>
        <Typography variant="caption" sx={{ textAlign: 'center' }}>
          ({votes} vote{votes === 1 ? '' : 's'} - {percentageValue.toFixed(2)}%)
        </Typography>
      </Stack>
    </Stack>
  );
});

LinearIndicator.displayName = 'LinearIndicator';

LinearIndicator.propTypes = {
  choice: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }),
  votes: PropTypes.number.isRequired,
  totalVotes: PropTypes.number.isRequired,
};

export default LinearIndicator;
