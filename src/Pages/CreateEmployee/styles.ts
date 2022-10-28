import { createUseStyles } from 'react-jss';
import { Theme } from '@mui/material/styles/createTheme';

const gap = 16;
export const useStyles = createUseStyles<string, Record<string, unknown>, Theme>({
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: `calc(50% - ${gap / 2}px) calc(50% - ${gap / 2}px)`,
    gridTemplateRows: 'auto auto',
    gap: gap + 'px',
    padding: '16px 0',
  },
  createButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
