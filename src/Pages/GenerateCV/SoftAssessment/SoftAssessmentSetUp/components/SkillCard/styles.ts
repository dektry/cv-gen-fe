import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  skillCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '24px 16px',
    marginBottom: '1rem',
    gap: '16px',
    width: '80%',
    background: '#F4F7FC',
    borderRadius: '8px',
    flex: 'none',
    order: 0,
    flexGrow: 0,
  },
  upperPart: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '3rem',
  },
  leftPart: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  sectionName: {
    fontFamily: 'Effra',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '18px',
    letterSpacing: '0.16px',
    color: '#AAB2C3',
  },
  deleteSection: {
    color: '#D32F2F',
    justifySelf: 'flex-end',
    cursor: 'pointer',
  },
});
