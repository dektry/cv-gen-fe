import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  interviewForm: {
    margin: `calc(24px - ${window.devicePixelRatio}px)`,
    marginTop: '2rem',
    backgroundColor: 'white',
    padding: '1rem',
    paddingBottom: '1rem',
  },
  answerColumns: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '1rem',
  },
  columnActual: {
    marginLeft: '6rem',
    marginRight: '1rem',
  },
  greenColor: {
    color: '#0aad0a',
  },
  group: {
    '& h2': {
      marginBottom: '0',
    },
    marginTop: '1rem',
    '&:nth-child(2)': {
      marginTop: '0',
    },
  },
  skills: {
    marginLeft: '1rem',
    display: 'flex',
    flexDirection: 'column',
  },
  skill: {
    marginTop: '1rem',
    padding: '1rem',
    border: '1px solid #e1e1e1',
    '&:first-child': {
      marginTop: '0',
    },
  },
  skillHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& h3': {
      marginBottom: '0',
    },
    marginBottom: '0.2rem',
  },
  answerSelect: {
    marginLeft: '1rem',
    width: '8rem',
  },

  buttons: {
    marginTop: '2rem',
    display: 'flex',
    flexWrap: 'wrap',
  },
  finishButton: {
    marginLeft: 'auto',
  },
  deleteSection: {
    color: 'red',
    alignSelf: 'flex-end',
    cursor: 'pointer',
  },
  deleteIcon: {
    marginLeft: '1rem',
    cursor: 'pointer',
  },
  rightSkillElementsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  textArea: {
    margin: '0.5rem',
    marginLeft: '0',
    width: '30rem',
    borderRadius: '8px',
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  changeMatrixButton: {
    width: '10rem',
  },
  questionsContainer: {
    marginLeft: '100px',
    marginTop: '10px',
    display: 'flex',
  },
  addQuestionButton: {
    marginLeft: '80%',
    marginTop: '3%',
  },
  addSkillButton: {
    marginTop: '3%',
  },
  skillInput: {
    width: '25%',
    height: 'fit-content',
    marginTop: '1rem',
  },
});
