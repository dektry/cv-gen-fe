import { createUseStyles } from 'react-jss';
import { Theme } from '@mui/material/styles/createTheme';

export const useStyles = createUseStyles<string, Record<string, unknown>, Theme>({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '100%',
  },
  questionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  deleteQuestionBtn: {
    '&.MuiButtonBase-root': {
      marginLeft: '4px',
      padding: '0',
      minWidth: '24px',
      minHeight: '24px',
      maxHeight: '24px',
      boxShadow: 'none',
      backgroundColor: ({ theme }) => theme.palette.action.hover,
      border: '1px solid',
      borderColor: 'rgba(0, 0, 0, 0)',
      '&:hover': {
        backgroundColor: ({ theme }) => theme.palette.action.hover,
        boxShadow: 'none',
        borderColor: ({ theme }) => theme.palette.primary.main,
      },
      '& 	.MuiButton-endIcon': {
        margin: 0,
        '& svg': {
          color: ({ theme }) => theme.palette.primary.main,
          fontSize: '24px',
          transform: 'rotate(45deg)',
        },
      },
    },
  },
});
