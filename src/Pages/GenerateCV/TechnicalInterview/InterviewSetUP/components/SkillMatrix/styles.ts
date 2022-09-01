import { createUseStyles } from 'react-jss';
import { desktopBreakpoints } from 'theme/constants';

export const useStyles = createUseStyles({
  levelNamesWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '55%',
    marginLeft: '5%',
    fontWeight: 'bold',
  },
  levelName: {
    minWidth: '14%',
    maxWidth: '14%',
    marginRight: '4%',
  },
  levelSelectsWrapper: {
    marginLeft: '4.4%',
    marginTop: '10px',
    display: 'flex',
  },
  selectWrapper: {
    display: 'flex',
    width: '55%',
    marginLeft: '5%',
  },
  select: {
    minWidth: '15%',
    maxWidth: '15%',
    marginRight: '3.8%',
  },
  [`@media (max-width: ${desktopBreakpoints[2] - 1}px)`]: {
    select: {
      marginRight: '3.8%',
    },
  },
  [`@media (max-width: ${desktopBreakpoints[1] - 1}px)`]: {
    selectWrapper: {
      marginLeft: '5%',
      width: '55%',
    },
  },

  [`@media (max-width: ${desktopBreakpoints[0] - 1}px)`]: {
    '& .ant-tabs-nav': {
      maxHeight: '310px',
    },
    select: {
      marginRight: '3.8%',
    },
    selectsWrapper: {
      width: '100%',
    },
  },
});
