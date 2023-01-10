import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  genCVbtnBlock: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '2rem',
  },
  container: {
    '&.MuiFormControl-root': {
      width: '100%',
    },
  },
  row: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '16px',
    margin: '24px 0',
  },
  textArea: {
    width: '100%',
  },
  softSkillsSelect: {
    width: '100%',
  },
});
