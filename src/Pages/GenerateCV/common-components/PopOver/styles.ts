import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  icon: {
    width: '1rem',
    height: '1rem',
    marginLeft: '1rem',
    color: '#1890FF',
  },
  candidateInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.2rem',
    border: 'solid lightgrey 1px',
    borderRadius: '0.1rem',
    backgroundColor: 'white',
    marginLeft: '5rem',
  },
});
