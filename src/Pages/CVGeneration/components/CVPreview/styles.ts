import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '15px',
    '& h1': {
      textAlign: 'center',
      marginBottom: 0,
    },
  },
  cvBox: {
    border: '1px solid #000',
    boxSizing: 'content-box',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
