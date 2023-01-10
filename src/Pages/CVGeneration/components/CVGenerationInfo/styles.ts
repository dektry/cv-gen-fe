import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
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
  container: {
    '&.MuiFormControl-root': {
      width: '100%',
    },
  },
});
