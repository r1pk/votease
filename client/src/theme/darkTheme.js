import { createTheme, responsiveFontSizes } from '@mui/material';

export const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#6F1AB6',
      },
      secondary: {
        main: '#B66F1A',
      },
      background: {
        main: '#363537',
      },
    },
  })
);
