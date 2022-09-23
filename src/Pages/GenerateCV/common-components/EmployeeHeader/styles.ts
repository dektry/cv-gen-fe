import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  mainContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  infoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    letterSpacing: '0.15px',
    backgroundColor: 'rgba(144, 202, 249, 0.2)',
    padding: '1rem',
    width: '33%',
    maxHeight: '12rem'
  },
  name: {
    fontWeight: '500',
    fontSize: '20px',
    lineHeight: '23px',
  },
  greyText: {
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '175%',
    color: 'rgba(0, 0, 0, 0.38)',
  },
  positionAndLevelContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  innerContainer: {
    marginRight: '0.5rem'
  },
  positionAndLevel: {
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '24px',
  },
});