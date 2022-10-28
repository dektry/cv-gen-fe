import { createUseStyles } from 'react-jss';
import { desktopBreakpoints } from 'theme/constants';

export const useStyles = createUseStyles({
  displayNoneMobile: {
    [`@media (max-width: ${desktopBreakpoints[0] - 1}px)`]: {
      display: 'none',
    },
  },
  tableActions: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '4rem',
    marginLeft: 'auto',
    marginRight: '10px',
    flexDirection: 'row-reverse',
    [`@media (max-width: ${desktopBreakpoints[0] - 1}px)`]: {
      marginRight: '0px',
    },
  },
});
