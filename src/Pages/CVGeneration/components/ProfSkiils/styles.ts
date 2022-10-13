import { createUseStyles } from 'react-jss';
import { Theme } from '@mui/material/styles/createTheme';

export const useStyles = createUseStyles<string, Record<string, unknown>, Theme>({
  accordion: {
    marginBottom: '16px',
    '&:nth-last-child(2)': {
      marginBottom: 0,
    },
    '&.MuiPaper-root': {
      backgroundColor: ({ theme }) => theme.palette.action.hover,
      borderRadius: '8px',
      boxShadow: 'none',
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiAccordionSummary-root.Mui-focusVisible': {
      backgroundColor: ({ theme }) => theme.palette.action.hover,
    },
    '& .MuiAccordionSummary-content': {
      margin: '24px 0 16px',
    },
    '& .MuiAccordionDetails-root': {
      display: 'grid',
      gridTemplateColumns: '50% 50%',
      gridTemplateRows: 'auto auto',
      gap: '16px',
      padding: '0 16px',
    },
    '& .MuiAccordionActions-root': {
      padding: '16px 16px 24px',
    },
  },
  icon: {
    backgroundColor: '#fff',
    borderRadius: '50%',
  },
  skill: {
    backgroundColor: '#fff',
    padding: '12px',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '8px',
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
          color: ({ theme }) => theme.palette.primary.main,
          fontSize: '24px',
          transform: 'rotate(45deg)',
        },
      },
    },
  },
});
