import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  container: {
    marginTop: '24px',
  },
  upperContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
  },
  projectsHeader: {
    fontFamily: 'Effra',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '24px',
    textTransform: 'uppercase',
  },
  button: {
    marginLeft: '8px',
  },
});
