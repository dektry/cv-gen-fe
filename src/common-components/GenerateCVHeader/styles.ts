import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  wrap: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: '1rem',
    height: '40px',
    boxSizing: 'content-box',
    padding: `calc(24px - ${window.devicePixelRatio}px)`,
  },
  backBtn: {
    width: '5rem',
    height: '25px',
  },
});
