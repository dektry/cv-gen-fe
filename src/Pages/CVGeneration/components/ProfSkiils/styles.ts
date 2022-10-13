import { createUseStyles } from 'react-jss';
import { Theme } from '@mui/material/styles/createTheme';

export const useStyles = createUseStyles<string, Record<string, unknown>, Theme>({
  accordion: {
    marginBottom: '16px',
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
});
