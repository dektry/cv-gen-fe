import { createUseStyles } from 'react-jss';
import { Theme } from '@mui/material/styles/createTheme';

export const useStyles = createUseStyles<string, Record<string, unknown>, Theme>({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: '10px 0',
  },
  button: {
    '&.MuiButton-root': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexDirection: 'row',
      padding: '2px 12px 0px 2px',
      paddingRight: '12px',
      maxWidth: '24px',
      minWidth: '24px',
      height: '24px',
      backgroundColor: ({ theme }) => theme.palette.background.default,
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
      borderRadius: '4px',
      marginLeft: '10px',
    },
  },
  addButton: {
    '&.MuiButton-root': {
      width: '12%',
      minWidth: '170px',
    },
  },
});
