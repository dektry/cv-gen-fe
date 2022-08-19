import { createUseStyles } from 'react-jss';
import { desktopBreakpoints } from 'theme/constants';

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
  information: {
    '& h3': {
      marginBottom: '0',
      marginTop: '1rem',
    },
    marginBottom: '1rem',
    marginRight: '2rem',
    width: '20rem',
  },
  summary: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  interviewAnswers: {
    width: '80%',
    marginTop: '1rem',
    marginBottom: '2rem',
    [`@media (max-width: ${desktopBreakpoints[2] - 1}px)`]: {
      width: '100%',
    },
  },
  interviewAnswersHeader: {
    fontWeight: 'bold',
  },
  low: {
    color: 'red',
  },
  average: {
    color: 'green',
  },
  high: {
    color: '#25d125',
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
  select: {
    marginLeft: '-0.5rem',
  },
  infoSpan: {
    marginLeft: '0.25rem',
  },
});
