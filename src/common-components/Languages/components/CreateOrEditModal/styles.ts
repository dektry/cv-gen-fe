import { createUseStyles } from 'react-jss';
import { Theme } from '@mui/material/styles/createTheme';

export const useStyles = createUseStyles<string, Record<string, unknown>, Theme>({
  box: {
    '&.MuiBox-root': {
      display: 'flex',
      flexDirection: 'column',
      width: '600px',
      height: '336px',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: ({ theme }) => theme.palette.background.default,
      borderRadius: '8px',
    },
  },
  title: {
    '&.MuiTypography-root': {
      textAlign: 'center',
      margin: '56px 0 4px 0',
    },
  },
  text: {
    '&.MuiTypography-root': {
      textAlign: 'center',
      margin: '4px 24px 24px 24px',
      color: ({ theme }) => theme.palette.secondary.dark,
    },
  },

  closeIcon: {
    '&.MuiSvgIcon-root': {
      position: 'absolute',
      left: '558.67px',
      right: '30.67px',
      top: '30.67px',
      bottom: '230.67px',
      color: ({ theme }) => theme.palette.primary.dark,

      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
});
