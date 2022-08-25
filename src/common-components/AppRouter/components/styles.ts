import { createUseStyles } from 'react-jss';
import { desktopBreakpoints } from 'theme/constants';

export const useStyles = createUseStyles({
  header: {
    background: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0px 30px',
    position: 'sticky',
    top: '0px',
    zIndex: '10',
    [`@media (max-width: ${desktopBreakpoints[0] - 1}px)`]: {
      height: '55px',
      padding: '0px 22px',
    },
  },
  drawer: {
    height: '100vh',
  },
  layout: {
    minHeight: '100vh',
  },
  outlet_container: {
    paddingTop: '50px',
  },
  global: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& button': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  logo: {
    margin: '15px auto',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  sidebar: {
    position: 'fixed',
    minWidth: 0,
    minHeight: '100vh',
    transition: 'all 0.2s',
  },
  content: {
    marginLeft: '200px',
    [`@media (max-width: ${desktopBreakpoints[1] - 1}px)`]: {
      marginLeft: '75px',
    },
    [`@media (max-width: ${desktopBreakpoints[0] - 1}px)`]: {
      marginLeft: '25px',
    },
  },
});
