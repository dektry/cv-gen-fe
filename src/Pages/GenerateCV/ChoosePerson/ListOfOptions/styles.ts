import { createUseStyles } from 'react-jss';
import { desktopBreakpoints } from 'theme/breakpoints';

export const useStyles = createUseStyles({
  container: {
    width: 'calc(100% / 3)',
  },
  candidatesMenu: {
    margin: '1rem 1rem 1rem 0',
    width: '100%',
    height: '12rem',
    borderRadius: '0.3rem',
    [`@media (max-width: ${desktopBreakpoints[0] - 1}px)`]: {
      margin: '1rem 1rem 1rem 0',
      fontSize: '0.8rem',
    },
  },
});
