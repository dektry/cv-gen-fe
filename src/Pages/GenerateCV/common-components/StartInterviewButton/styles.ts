import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  startButton: {
    margin: '1rem 0 1rem 0',
    background: 'linear-gradient(45deg, #F6856C 0%, #B727D9 100%)',
    border: 'none',
    borderRadius: '100px',
    textTransform: 'uppercase',
    fontWeight: '500',
    fontSize: '16px',
    padding: '16px 32px',
    height: '56px',
    color: '#FFFFFF',
    '&.MuiButtonBase-root': {
      '&:hover': {
        boxShadow: '0 0 16px 0 rgba(0,0,0,0.12)',
      },
    },
  },
});
