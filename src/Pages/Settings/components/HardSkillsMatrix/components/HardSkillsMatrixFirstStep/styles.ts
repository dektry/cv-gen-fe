import { createUseStyles } from 'react-jss';
import { Theme } from '@mui/material/styles/createTheme';

export const useStyles = createUseStyles<string, Record<string, unknown>, Theme>({
  container: {
    margin: '32px 0',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '42px',
  },
  cardsContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
});
