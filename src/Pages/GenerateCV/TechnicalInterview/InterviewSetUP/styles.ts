import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  interviewSetUpPlaceHolder: {
    width: '100%',
    height: '450px',
    backgroundColor: '#334f84',
    color: '#FFFFFF',
    '& li': {
      borderBottom: '1px solid #fff',
    },
  },
  linkToResults: {
    marginTop: '2rem',
  },
});
