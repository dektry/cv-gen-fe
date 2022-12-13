import { createUseStyles } from 'react-jss';
import { Theme } from '@mui/material/styles/createTheme';

export const useStyles = createUseStyles<string, Record<string, unknown>, Theme>({
  container: {
    backgroundColor: ({ theme }) => theme.palette.action.hover,
    borderRadius: '8px',
    boxShadow: 'none',
    '&:before': {
      display: 'none',
    },
    padding: '34px 32px',
    margin: '24px 0',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skill: {
    backgroundColor: '#fff',
    padding: '12px',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '8px',
  },
});
