import { createUseStyles } from 'react-jss';
import { Theme } from '@mui/material/styles/createTheme';

export const useStyles = createUseStyles<string, Record<string, unknown>, Theme>({
  link: {
    color: ({ theme }) => theme.palette.common.black,
    textDecoration: 'underline',
    cursor: 'pointer',
    '&:hover': {
      color: ({ theme }) => theme.palette.common.black,
    },
  },
  deleteSkillBtn: {
    '&.MuiButtonBase-root': {
      marginLeft: '4px',
      padding: '0',
      minWidth: '24px',
      height: 'auto',
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
          backgroundColor: ({ theme }) => theme.palette.background.default,
          color: ({ theme }) => theme.palette.primary.main,
          fontSize: '24px',
          borderRadius: '4px',
        },
      },
    },
  },
});
