import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  selectContainer: {
    display: 'flex',
    flexWrap: 'no-wrap',
    width: '100%',
    justifyContent: 'space-between',
  },
  selectsWrapper: {
    display: 'flex',
    width: '40rem',
  },
  selects: {
    width: '10rem',
    marginRight: '1rem',
  },
  editButton: {
    width: '10rem',
  },
  skillContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.3rem 0.7rem',
    margin: '0.7rem',
    marginLeft: '0',
    height: '2.5rem',
    width: '45%',
    maxWidth: '40rem',
    background: '#ffffff',
    borderRadius: '8px',
  },
  textArea: {
    margin: '0.5rem',
    marginLeft: '0',
    width: '45%',
    maxWidth: '40rem',
    borderRadius: '8px',
  },
  addButton: {
    '&hover:': {
      content: 'Add a skill',
    },
  },
});
