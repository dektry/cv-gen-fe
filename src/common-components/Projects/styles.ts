import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  upperContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
  },
  projectsHeader: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '24px',
    textTransform: 'uppercase',
  },
  button: {
    marginLeft: '8px',
    paddingTop: '4px',
  },
});
