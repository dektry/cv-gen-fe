import { createUseStyles } from 'react-jss';
import { Theme } from '@mui/material/styles/createTheme';

export const useStyles = createUseStyles<string, Record<string, unknown>, Theme>({
  container: {
    width: '100%',
    margin: '24px 0 16px',
    backgroundColor: ({ theme }) => theme.palette.action.hover,
    borderRadius: '8px',
    boxShadow: 'none',
    '&:before': {
      display: 'none',
    },
    padding: '24px 16px',
    gap: '16px',
  },
  skill: {
    backgroundColor: '#fff',
    padding: '12px',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
  },
  skillUpperContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  skillValue: {
    fontWeight: 'bold',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 'auto',
    width: 'fit-content',
    gap: '16px',
    marginTop: '24px',
  },
});
