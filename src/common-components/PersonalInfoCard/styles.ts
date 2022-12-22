import { createUseStyles } from 'react-jss';
import { Theme } from '@mui/material/styles/createTheme';

export const useStyles = createUseStyles<string, Record<string, unknown>, Theme>({
  mainContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: ({ theme }) => theme.palette.primary.main,
    padding: '24px',
    width: '100%',
    height: '90px',
    borderRadius: '8px',
    gap: '32px',
  },
  name: {
    color: ({ theme }) => theme.palette.background.default,
    textTransform: 'uppercase',
  },
  text: {
    color: ({ theme }) => theme.palette.background.default,
  },
  greyText: {
    color: ({ theme }) => theme.palette.text.secondary,
  },
});
