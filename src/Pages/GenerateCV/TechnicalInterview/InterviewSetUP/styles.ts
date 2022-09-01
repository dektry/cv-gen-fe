import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  interviewSetUpPlaceHolder: {
    margin: `calc(24px - ${window.devicePixelRatio}px)`,
    width: '100%',
    height: '450px',
    backgroundColor: '#334f84',
    color: '#FFFFFF',
    '& li': {
      borderBottom: '1px solid #fff',
    },
  },
  linkToResults: {
    margin: `calc(24px - ${window.devicePixelRatio}px)`,
    marginTop: '2rem',
  },
});
