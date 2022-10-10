import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#333333',
      light: '#e5e9f2',
      dark: '#aab2c3',
    },
    secondary: {
      main: '#ffffff',
      contrastText: '#333333',
    },
    text: {
      primary: '#333333',
    },
    error: {
      main: '#d32f2f',
      light: '#f25c5c',
      dark: '#c82a2a',
    },
    background: {
      default: '#ffffff',
    },
  },
});

export default theme;
