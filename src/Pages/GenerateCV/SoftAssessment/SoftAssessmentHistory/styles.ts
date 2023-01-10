import { createUseStyles } from 'react-jss';
import { Theme } from '@mui/material/styles/createTheme';

export const useStyles = createUseStyles<string, Record<string, unknown>, Theme>({
  midContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '16px',
    marginBottom: '32px',
  },
  link: {
    alignSelf: 'flex-end',
    color: ({ theme }) => theme.palette.common.black,
    textDecoration: 'underline',
    '&:hover': {
      color: ({ theme }) => theme.palette.common.black,
    },
  },
});
