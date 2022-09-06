import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  skillCard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    margin: '0.7rem',
    marginLeft: '0',
    width: '25%',
    maxWidth: '40rem',
    maxHeight: '7rem',
    background: '#ffffff',
    borderRadius: '8px',
  },
});
