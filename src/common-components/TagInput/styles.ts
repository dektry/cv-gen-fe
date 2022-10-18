import { createUseStyles } from 'react-jss';
import { Theme } from '@mui/material/styles/createTheme';

export const useStyles = createUseStyles<string, Record<string, unknown>, Theme>({
  tagInput: {
    '& .MuiInputBase-input': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '2px 12px',
      minHeight: '22px',
      maxHeight: '22px',
      maxWidth: '150px',
      background: ({ theme }) => theme.palette.background.default,
      border: '1px solid #000000',
      borderRadius: '100px',
    },
  },
});
