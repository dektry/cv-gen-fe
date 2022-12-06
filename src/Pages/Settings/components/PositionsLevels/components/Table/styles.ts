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
      width: '1%',
    },
  },
  popOver: {
    '&.MuiPopover-root': {
      display: 'flex',
      flexDirection: 'column',
      width: '7vw',
      fontSize: ({ theme }) => theme.typography.h3,
      padding: '14px 16px',
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
      width: '100%',
      textTransform: 'none',
      display: 'flex',
      justifyContent: 'flex-start',
    },
  },
  deleteButton: {
    color: ({ theme }) => theme.palette.error.main,
    '&.MuiButtonBase-root': {
      width: '100%',
      textTransform: 'none',
      display: 'flex',
      justifyContent: 'flex-start',
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
