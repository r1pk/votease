import { Box, useTheme } from '@mui/material';

const FixedBackground = () => {
  const theme = useTheme();

  return (
    <Box sx={{ position: 'fixed', top: 0, left: 0, width: 1, height: 1, zIndex: -1, lineHeight: 0 }}>
      <svg viewBox="0 0 960 540" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <g transform="translate(466.9602456261367 269.61154179014466)">
          <path
            fill={theme.palette.primary.main}
            fillOpacity="0.1"
            d="M167.3 -265C210 -233 232.9 -174.9 271.9 -116.3C310.8 -57.7 365.7 1.4 369.2 60.8C372.7 120.2 324.6 179.9 272.7 231.9C220.8 283.9 165.1 328.1 101.1 348.9C37.2 369.7 -34.9 367.2 -91.4 338.3C-148 309.4 -188.9 254.3 -245.2 204.2C-301.6 154.1 -373.5 109.1 -395.6 48.3C-417.6 -12.4 -389.8 -88.9 -345.9 -146.7C-301.9 -204.4 -241.8 -243.6 -181.4 -267.5C-121.1 -291.4 -60.6 -300.2 0.9 -301.6C62.4 -303 124.7 -297 167.3 -265"
          ></path>
        </g>
      </svg>
    </Box>
  );
};

export default FixedBackground;
