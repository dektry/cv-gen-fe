import { createUseStyles } from 'react-jss';
import { Theme } from '@mui/material/styles/createTheme';

export const useStyles = createUseStyles<string, Record<string, unknown>, Theme>({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    margin: '24px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: '24px',
    margin: '24px 24px 40px 24px',
  },
  cancelButton: {
    '&.MuiButton-root': {
      width: '128px',
      height: '56px',
      marginRight: '8px',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '24px',
      backgroundColor: ({ theme }) => theme.palette.background.default,
      borderRadius: '100px',
    },
  },
  saveButton: {
    '&.MuiButton-root': {
      width: '185px',
      height: '56px',
      marginLeft: '8px',
      borderRadius: '100px',
      color: ({ theme }) => theme.palette.background.default,
      backgroundColor: ({ theme }) => theme.palette.primary.main,

      '&:hover': {
        cursor: 'pointer',
        backgroundColor: ({ theme }) => theme.palette.primary.main,
        boxShadow:
          '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12)',
      },
    },
  },
});
