import { createUseStyles } from 'react-jss';
import { desktopBreakpoints } from 'theme/constants';

export const useStyles = createUseStyles({
  modal: {
    '& .ant-modal-body': {
      paddingTop: '4px',
      '& > div': {
        maxHeight: '450px !important',
      },
    },
  },
  [`@media (max-width: ${desktopBreakpoints[1] - 1}px)`]: {
    modal: {
      '& .ant-modal-body': {
        paddingTop: '4px',
        '& > div': {
          maxHeight: '450px !important',
        },
      },
    },
  },

  [`@media (max-width: ${desktopBreakpoints[0] - 1}px)`]: {
    modal: {
      width: '100% !important',
      margin: '0px',
      maxWidth: 'unset',
      height: '100%',
      top: '0px',
      '& .ant-modal-content': {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        '& .ant-modal-footer': {
          marginTop: 'auto',
        },
      },
    },
    '& .ant-modal-body': {
      paddingTop: '4px',
      '& > div': {
        maxHeight: '80vh !important',
      },
    },
    '& .ant-tabs-nav': {
      maxHeight: '310px',
    },
  },
});
