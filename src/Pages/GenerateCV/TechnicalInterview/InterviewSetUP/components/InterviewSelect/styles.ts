import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  selectsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: `calc(24px - ${window.devicePixelRatio}px)`,
  },
  selects: {
    width: '10rem',
    marginRight: '1rem',
  },
  finishButton: {
    marginLeft: 'auto',
  },
});
