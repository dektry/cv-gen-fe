import { createUseStyles } from 'react-jss';
import { Theme } from '@mui/material/styles/createTheme';

export const useStyles = createUseStyles<string, Record<string, unknown>, Theme>({
  generateCvButton: {
    '&.MuiButtonBase-root': {
      width: '171px',
      height: '56px',
      background: ({ theme }) => theme.palette.background.default,
      borderRadius: '100px',
      color: ({ theme }) => theme.palette.primary.main,
      marginLeft: 'auto',
      alignSelf: 'center',
    },
  },
});
