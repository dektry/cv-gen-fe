import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  form: {
    maxWidth: '1550px',
  },
  space: {
    width: '49%',
    marginRight: '.5%',
  },
  input: {
    maxWidth: '550px',
    width: '100%',
    margin: '0.5% 0.5% 0 0',
  },
  nameInput: {
    maxWidth: '550px',
    width: '49%',
    marginTop: '68px',
    marginRight: 'calc(10px + 15vw)',
  },
  button: {
    marginTop: '1%',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: '1%',
    width: '99%',
  },
  interviewButtons: {
    display: 'flex',
    flexDirection: 'column',
  },
  candidateInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.2rem',
    border: 'solid lightgrey 1px',
    borderRadius: '0.1rem',
    backgroundColor: 'white',
    marginLeft: '5rem',
  },
  icon: {
    width: '1rem',
    height: '1rem',
    marginLeft: '1rem',
    color: '#1890FF',
  },
});
