import { createUseStyles } from 'react-jss';

type RuleNames = 'tabsContainer';

interface TabsProps {
  devicePixelRatio?: number;
}

export const useStyles = createUseStyles<RuleNames, TabsProps>({
  tabsContainer: {
    padding: ({ devicePixelRatio }) => `calc(24px - ${devicePixelRatio}px)`,
    '& .ant-tabs-tab-active': {
      '&:after': {
        borderColor: `transparent transparent transparent white`,
      },
    },
    '& .ant-tabs-tab': {
      '&:after, &:before': {
        zIndex: 3,
        content: '""',
        display: 'block',
        position: 'absolute',
        left: '100%',
        width: '0',
        height: 0,
        borderStyle: 'solid',
      },
      '&:after': {
        top: '2%',
        bottom: '2%',
        height: '95%',
        borderColor: `transparent transparent transparent #fafafa`,
        borderWidth: '18px',
      },
      '&:before': {
        top: '0',
        bottom: '0',
        height: '100%',
        borderColor: 'transparent transparent transparent black',
        borderWidth: '19px',
      },
      maxWidth: '100%',
      minWidth: '100%',
      '& div': { margin: '0 auto' },
    },
  },
});
