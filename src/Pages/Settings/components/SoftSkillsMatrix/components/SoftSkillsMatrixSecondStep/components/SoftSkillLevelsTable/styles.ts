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
    marginBottom: '24px',
    width: '100%',
  },
  headerCell: {
    '&.MuiTableCell-root': {
      fontWeight: 'bold',
    },
  },
});
