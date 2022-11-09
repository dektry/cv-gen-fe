import { createUseStyles } from 'react-jss';
import { Theme } from '@mui/material/styles/createTheme';

const inputsGap = 16;

export const useStyles = createUseStyles<string, Record<string, unknown>, Theme>({
  box: {
    marginTop: '8px',
    padding: '24px',
  },
  upperContainer: {
    display: 'grid',
    gridTemplateColumns: `calc(50% - ${inputsGap / 2}px) calc(50% - ${inputsGap / 2}px)`,
    gridTemplateRows: 'auto auto',
    gap: inputsGap + 'px',
    padding: '0 16px',
  },
  lowerContainer: {
    display: 'grid',
    gridTemplateColumns: `100%`,
    gridTemplateRows: 'auto auto',
    gap: inputsGap + 'px',
    padding: '16px 16px',
  },
  innerBox: {
    '&.MuiBox-root': {
      display: 'flex',
      flexDirection: 'column',
      width: '448px',
      height: '272px',
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
      margin: '56px 0 8px 0',
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
    margin: '24px 24px 80px 24px',
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
    closeChildModalIcon: {
      '&.MuiSvgIcon-root': {
        position: 'absolute',
        left: '406.67px',
        right: '30.67px',
        top: '30.67px',
        bottom: '230.67px',
        color: ({ theme }) => theme.palette.primary.dark,

        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
  },
});
