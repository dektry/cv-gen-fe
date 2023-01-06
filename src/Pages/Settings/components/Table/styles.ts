import { createUseStyles } from 'react-jss';
import { Theme } from '@mui/material/styles/createTheme';

export const useStyles = createUseStyles<string, Record<string, unknown>, Theme>({
  container: {
    '&.MuiFormControl-root': {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      marginBottom: '2rem',
    },
  },
  cellLeft: {
    '&.MuiTableCell-root': {
      width: '99%',
    },
  },
  cellRight: {
    '&.MuiTableCell-root': {
      display: 'flex',
      flexDirection: 'row',
      gap: '11px',
    },
  },
  more: {
    '&.MuiButtonBase-root': {
      display: 'flex',
      justifyContent: 'center',
      minWidth: '24px',
      minHeight: '24px',
      maxWidth: '24px',
      maxHeight: '24px',
    },
    icon: {
      '&.MuiSvgIcon-root': {
        margin: '0',
      },
      '&.MuiButton-endIcon': {
        '&:nth-of-type(1)': {
          fontSize: '48px',
        },
      },
    },
  },
  button: {
    '&.MuiButtonBase-root': {
      maxWidth: '24px',
      minWidth: '24px',
      textTransform: 'none',
      display: 'flex',
    },
  },
  upperContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
  },
  addButton: {
    marginLeft: '8px',
  },
});
