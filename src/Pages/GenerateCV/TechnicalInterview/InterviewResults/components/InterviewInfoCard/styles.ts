import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
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
  select: {
    marginLeft: '-0.5rem',
  },
  infoSpan: {
    marginLeft: '0.25rem',
  },
});
