import { createUseStyles } from 'react-jss';
import { Theme } from '@mui/material/styles/createTheme';

export const useStyles = createUseStyles<string, Record<string, unknown>, Theme>({
  upperContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '24px 24px 0',
  },
  positionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '24px',
  },
  positionLevelContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: '8px',
  },
  tag: {
    background: ({ theme }) => theme.palette.action.hover,
    borderRadius: '100px',
    padding: '2px 12px',
    marginTop: 'auto',
  },
});
