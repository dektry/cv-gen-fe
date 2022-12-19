import { createUseStyles } from 'react-jss';
import { Theme } from '@mui/material/styles/createTheme';

export const useStyles = createUseStyles<string, Record<string, unknown>, Theme>({
  tab: {
    '&.MuiButtonBase-root': {
      '&.MuiTab-root': {
        textTransform: 'none',
      },
    },
  },
});
