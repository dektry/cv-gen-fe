import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  paper: {
    display: 'flex',
    alignItems: 'center',
    margin: '100px',
    padding: '100px',
    maxWidth: '500px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
  },
  input: {
    '&.MuiFormControl-root': {
      marginTop: '10px',
    },
    '&.MuiButton-root': {
      marginTop: '10px',
    },
  },
  label: {
    display: 'block',
    textAlign: 'center',
    color: 'red',
    height: '30px',
  },
  card: {
    minWidth: '320px',
    position: 'relative',
    bottom: '50px',
  },
  submit: {
    width: '100%',
  },
});
