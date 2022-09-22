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
  }
});
