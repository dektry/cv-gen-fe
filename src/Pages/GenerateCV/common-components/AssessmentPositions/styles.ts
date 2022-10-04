import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    margin: '1rem 0 1rem 0',
  },
  positionOrLevel: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: '1rem',
    padding: '0.5rem',
    paddingTop: '0',
    border: 'solid 1px lightgrey',
    borderRadius: '5px',
  },
  name: {
    position: 'relative',
    top: '-0.7rem',
    marginBottom: '0',
  },
});
