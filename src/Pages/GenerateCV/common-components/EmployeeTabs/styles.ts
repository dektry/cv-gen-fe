import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  tabsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '100%',
    minWidth: '100%',
    paddingBottom: '-2rem',
    borderBottom: 'solid 1px lightgrey'
  }
});
