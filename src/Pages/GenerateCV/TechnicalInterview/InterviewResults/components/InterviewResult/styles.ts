import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  interviewResult: {
    backgroundColor: 'white',
    padding: '1rem',
    paddingBottom: '1rem',
  },
  informationTitle: {
    display: 'inline-block',
    fontWeight: 'bold',
    fontSize: '0.8rem',
    padding: '1rem 0',
    marginRight: '0.8rem',
  },
  infoFields: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: '1rem',
  },
  editButton: {
    marginRight: '2rem',
    width: '6rem',
  },
  textArea: {
    margin: '0.5rem',
    marginLeft: '0',
    width: '45%',
    maxWidth: '40rem',
    borderRadius: '8px',
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
});
