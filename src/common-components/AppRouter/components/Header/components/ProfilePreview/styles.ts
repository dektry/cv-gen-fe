import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  name: {
    fontSize: '15px !important',
    marginBottom: '0px !important',
    textTransform: 'uppercase',
  },
  tag: {
    cursor: 'pointer',
    '& span': {
      fontSize: '10px',
    },
  },
  avatarContainer: {
    marginRight: '8px',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
});
