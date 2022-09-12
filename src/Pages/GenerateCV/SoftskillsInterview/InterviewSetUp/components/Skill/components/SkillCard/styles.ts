import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  skillCard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '1.5rem',
    margin: '0.7rem',
    marginLeft: '0',
    width: '35%',
    maxWidth: '40rem',
    height: '4rem',
    maxHeight: '7rem',
    background: '#ffffff',
    border: '1px solid #d9d9d9',
    borderRadius: '8px',
    '&:hover': {
      border: '1px solid #1890ff'
    },
  },
});
