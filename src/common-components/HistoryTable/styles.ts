import { createUseStyles } from 'react-jss';
import { Theme } from '@mui/material/styles/createTheme';

export const useStyles = createUseStyles<string, Record<string, unknown>, Theme>({
  link: {
    color: ({ theme }) => theme.palette.common.black,
    textDecoration: 'underline',
    cursor: 'pointer',
    '&:hover': {
      color: ({ theme }) => theme.palette.common.black,
    },
  },
});
