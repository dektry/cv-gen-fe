import { createUseStyles } from 'react-jss';
import { Theme } from '@mui/material/styles/createTheme';

export const useStyles = createUseStyles<string, Record<string, unknown>, Theme>({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '33px',
    alignContent: 'center',
  },
  chip: {
    '&.MuiChip-root': {
      backgroundColor: ({ theme }) => theme.palette.action.hover,
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '18px',
      paddingLeft: '0',
    },
  },
});
