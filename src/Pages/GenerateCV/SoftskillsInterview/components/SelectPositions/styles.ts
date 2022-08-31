import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  selectContainer: {
    display: 'flex',
    flexWrap: 'no-wrap',
    width: '100%',
    justifyContent: 'space-between',
  },
  selectsWrapper: {
    display: 'flex',
    width: '40rem',
  },
  selects: {
    width: '10rem',
    marginRight: '1rem',
  },
  editButton: {
    width: '10rem',
  },
});
