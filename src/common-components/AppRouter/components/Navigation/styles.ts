import { createUseStyles } from 'react-jss';
import { desktopBreakpoints } from 'theme/constants';

export const useStyles = createUseStyles({
  menu: {
    [`@media (max-width: ${desktopBreakpoints[0] - 1}px)`]: {
      margin: '-24px',
      width: 'calc(100% + 48px)',
      height: 'calc(100% + 48px)',
    },
    display: 'flex',
    flexDirection: 'column',
    '& li.ant-menu-item': {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '24px',
      '& a:hover': {
        textDecoration: 'none',
      },
    },
    '& li.ant-menu-item-hidden': {
      display: 'none',
    },
    '&.ant-menu-inline-collapsed li.ant-menu-item': {
      [`@media (min-width: ${desktopBreakpoints[0]}px)`]: {
        padding: '0 calc(50% - 16px / 2)',
      },
    },
    '& .ant-menu-inline-collapsed .ant-menu-submenu-title': {
      paddingLeft: 'calc(50% - 16px / 2) !important',
    },
  },
});
