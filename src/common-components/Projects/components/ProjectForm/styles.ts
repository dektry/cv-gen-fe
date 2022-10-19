import { createUseStyles } from 'react-jss';
import { Theme } from '@mui/material/styles/createTheme';

const inputsGap = 16;

export const useStyles = createUseStyles<string, Record<string, unknown>, Theme>({
  box: {
    marginTop: '8px',
    padding: '24px',
  },
  upperContainer: {
    display: 'grid',
    gridTemplateColumns: `calc(50% - ${inputsGap / 2}px) calc(50% - ${inputsGap / 2}px)`,
    gridTemplateRows: 'auto auto',
    gap: inputsGap + 'px',
    padding: '0 16px',
  },
  lowerContainer: {
    display: 'grid',
    gridTemplateColumns: `100%`,
    gridTemplateRows: 'auto auto',
    gap: inputsGap + 'px',
    padding: '16px 16px',
  },
});
