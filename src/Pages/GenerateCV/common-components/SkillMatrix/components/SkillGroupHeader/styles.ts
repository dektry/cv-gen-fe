import { createUseStyles } from 'react-jss';

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
  }
});
