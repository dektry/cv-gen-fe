import { createUseStyles } from 'react-jss';
import { Theme } from '@mui/material/styles/createTheme';

export const useStyles = createUseStyles<string, Record<string, unknown>, Theme>({
  container: {
    backgroundColor: ({ theme }) => theme.palette.action.hover,
    borderRadius: '8px',
    boxShadow: 'none',
    '&:before': {
      display: 'none',
    },
    padding: '34px 32px',
    margin: '24px 0',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skill: {
    backgroundColor: '#fff',
    padding: '12px',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '8px',
    marginTop: '26px',
    marginBottom: '26px',
  },
  deleteSkillBtn: {
    '&.MuiButtonBase-root': {
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
  addButton: {
    marginTop: '24px',
  },
});
