import { createUseStyles } from 'react-jss';
import { Theme } from '@mui/material/styles/createTheme';

export const useStyles = createUseStyles<string, unknown, Theme>({
  root: {
    '& .MuiInputBase-root': {
      transition: 'all 0.45s ease',
      minWidth: '410px',
      '& input': {
        padding: '8px 16px',
      },
    },
  },
  shrunk: {
    '& .MuiInputBase-root:not(.Mui-focused)': {
      minWidth: '0',
      backgroundColor: (theme) => theme.theme.palette.primary.main,
      borderRadius: '100px',
      color: (theme) => theme.theme.palette.secondary.main,
      display: 'flex',
      '& input': {
        cursor: 'pointer',
        textAlign: 'center',
      },
      '&:hover': {
        backgroundColor: (theme) => theme.theme.palette.primary.main,
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
      },
    },
  },
});
