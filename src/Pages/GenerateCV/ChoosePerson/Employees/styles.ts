import { createUseStyles } from 'react-jss';
import { desktopBreakpoints } from 'theme/constants';

export const useStyles = createUseStyles({
  page: {
    height: 'calc(100% - 95px)',
    [`@media (max-width: ${desktopBreakpoints[0] - 1}px)`]: {
      margin: '10px 0px',
    },
    margin: '24px',
  },
  modal: {
    [`@media (max-width: ${desktopBreakpoints[0] - 1}px)`]: {
      width: '100% !important',
      margin: '0px',
      maxWidth: 'unset',
      height: '100%',
      top: '0px',
      '& .ant-modal-content': {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      },
    },
    '& .ant-modal-body': {
      paddingTop: '4px',
    },
    '& .ant-tabs-nav': {
      maxHeight: '310px',
    },
  },
  search: {
    marginLeft: '5%',
    width: 'auto',
  },
  select: {
    marginLeft: '5%',
  },
  cust: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    width: '90px',
    height: '30px',
    fontWeight: '600',
    marginLeft: '5%',
    backgroundColor: 'white',
    paddingLeft: '8px',
    paddingTop: '4px',
  },
});
