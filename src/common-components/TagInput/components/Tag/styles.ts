import { createUseStyles } from 'react-jss';
import { Theme } from '@mui/material/styles/createTheme';

export const useStyles = createUseStyles<string, Record<string, unknown>, Theme>({
  closeIcon: {
    '&.MuiSvgIcon-root': {
      color: ({ theme }) => theme.palette.background.default,
      cursor: 'pointer',
    },
  },
});
