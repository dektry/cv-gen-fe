import { createUseStyles } from 'react-jss';
import { desktopBreakpoints } from 'theme/constants';

export const useStyles = createUseStyles({
  interviewAnswers: {
    width: '80%',
    marginTop: '1rem',
    marginBottom: '2rem',
    [`@media (max-width: ${desktopBreakpoints[2] - 1}px)`]: {
      width: '100%',
    },
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
});
