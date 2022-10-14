import { createUseStyles } from 'react-jss';
import { Theme } from '@mui/material/styles/createTheme';

export const useStyles = createUseStyles<string, Record<string, unknown>, Theme>({
  modal: {
    '& .MuiBackdrop-root': {
      zIndex: -100,
    },
  },
  box: {
    '&.MuiBox-root': {
      display: 'flex',
      flexDirection: 'column',
      minWidth: '15rem',
      maxWidth: '30rem',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      backgroundColor: ({ theme }) => theme.palette.background.default,
      borderRadius: '8px',
      padding: '56px 24px 40px 24px',
    },
  },
  title: {
    fontFamily: 'Effra',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '20px',
    lineHeight: '24px',
    textAlign: 'center',
  },
  text: {
    fontFamily: 'Effra',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '20px',
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  noButton: {
    '&.MuiButton-root': {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '24px',
      backgroundColor: ({ theme }) => theme.palette.background.default,
      borderRadius: '100px',
    },
  },
  yesButton: {
    '&.MuiButton-root': {
      backgroundColor: ({ theme }) => theme.palette.error.main,
      borderRadius: '100px',
      color: ({ theme }) => theme.palette.background.default,

      '&:hover': {
        backgroundColor: ({ theme }) => theme.palette.error.dark,
      },
    },
  },
  closeIcon: {
    '&.MuiSvgIcon-root': {
      position: 'absolute',
      left: '90%',
      right: '10%',
      top: '10%',
      bottom: '80%',

      '&:hover': {
        cursor: 'pointer',
        rotate: '5deg',
      },
    },
  },
});
