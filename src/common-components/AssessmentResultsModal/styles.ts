import { createUseStyles } from 'react-jss';
import { Theme } from '@mui/material/styles/createTheme';

export const useStyles = createUseStyles<string, Record<string, unknown>, Theme>({
  box: {
    '&.MuiBox-root': {
      display: 'flex',
      flexDirection: 'column',
      width: '600px',
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
      color: '#5c5d66',
    },
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: '24px',
    margin: '24px 24px 40px 24px',
  },
  noButton: {
    '&.MuiButton-root': {
      width: '94px',
      height: '56px',
      marginRight: '8px',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '24px',
      backgroundColor: ({ theme }) => theme.palette.action.hover,
      borderRadius: '100px',

      '&:hover': {
        backgroundColor: ({ theme }) => theme.palette.primary.light,
      },
    },
  },
  yesButton: {
    '&.MuiButton-root': {
      width: '94px',
      height: '56px',
      marginLeft: '8px',
      backgroundColor: ({ theme }) => theme.palette.primary.main,
      borderRadius: '100px',
      color: ({ theme }) => theme.palette.background.default,

      '&:hover': {
        backgroundColor: ({ theme }) => theme.palette.secondary.dark,
      },
    },
  },
  closeIcon: {
    '&.MuiSvgIcon-root': {
      position: 'absolute',
      right: '30.67px',
      top: '30.67px',
      color: ({ theme }) => theme.palette.primary.dark,

      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  upperContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '24px',
  },
  positionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '24px',
  },
  positionLevelContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: '8px',
  },
  tag: {
    background: ({ theme }) => theme.palette.action.hover,
    borderRadius: '100px',
    padding: '2px 12px',
    marginTop: 'auto',
  },
});