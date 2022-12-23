import { createUseStyles } from 'react-jss';
import { Theme } from '@mui/material/styles/createTheme';

export const useStyles = createUseStyles<string, Record<string, unknown>, Theme>({
  typeAssessment: {
    display: 'flex',
    justifyContent: 'center',
    padding: '2px 12px',
    background: '#B727D9',
    borderRadius: '100px',
    color: '#ffffff',
    width: 'fit-content',
    fontStyle: ({ theme }) => theme.typography.h5,
    fontWeight: 500,
  },
  typeInterview: {
    display: 'flex',
    justifyContent: 'center',
    padding: '2px 12px',
    background: '#F6856C',
    borderRadius: '100px',
    color: '#ffffff',
    width: 'fit-content',
    fontStyle: ({ theme }) => theme.typography.h5,
    fontWeight: 500,
  },
});
