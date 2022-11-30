import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  genCVbtnBlock: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  container: {
    '&.MuiFormControl-root': {
      width: '100%',
    },
  },
});
