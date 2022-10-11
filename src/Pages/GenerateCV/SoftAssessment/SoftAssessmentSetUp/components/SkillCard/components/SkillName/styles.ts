import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  skillName: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    color: 'white',
    alignItems: 'center',
    padding: '8px 16px',
    margin: '0 1rem',
    gap: '4px',
    maxWidth: '25%',
    height: '2rem',
    background: '#333333',
    borderRadius: '100px',
    flex: 'none',
    order: 0,
    flexGrow: 0,
  },
});
