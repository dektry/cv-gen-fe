import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '10px',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
    marginBottom: '15px',
    '&>p': {
      margin: 0,
    },
  },
});
