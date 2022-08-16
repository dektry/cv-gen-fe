import { createUseStyles } from 'react-jss';
import { desktopBreakpoints } from 'theme/breakpoints';

export const useStyles = createUseStyles({
  displayNoneMobile: {
    [`@media (max-width: ${desktopBreakpoints[0] - 1}px)`]: {
      display: 'none',
    },
  },
  tableActions: {
    display: 'flex',
    marginLeft: 'auto',
    marginRight: '10px',
    flexDirection: 'row-reverse',
    [`@media (max-width: ${desktopBreakpoints[0] - 1}px)`]: {
      marginRight: '0px',
    },
  },
});
