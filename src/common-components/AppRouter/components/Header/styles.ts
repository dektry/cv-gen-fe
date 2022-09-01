import { createUseStyles } from 'react-jss';
import { desktopBreakpoints } from 'theme/constants';

export const pageHeaderHeight = 95;

export const useStyles = createUseStyles({
  pageHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#fff',
    padding: '15px 25px',
    height: `${pageHeaderHeight}px`,
    [`@media (max-width: ${desktopBreakpoints[0] - 1}px)`]: {
      height: 'auto',
      padding: '15px',
      '& h2': {
        fontSize: '20px',
        margin: '0px',
      },
    },
  },
  title: {
    alignSelf: 'center',
    margin: '10px 0px 10px 8px',
    fontSize: '23px !important',
  },
  profileButton: {
    padding: '5px',
  },
});
