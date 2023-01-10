import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  container: {
    margin: '24px 0',
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
  projectsContainer: {
    '&.MuiFormControl-root': {
      margin: 0,
      width: '100%',
    },
  },
});
