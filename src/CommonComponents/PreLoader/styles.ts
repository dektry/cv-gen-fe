import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  spinner: {
    display: 'flex',
    backgroundColor: 'white',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
