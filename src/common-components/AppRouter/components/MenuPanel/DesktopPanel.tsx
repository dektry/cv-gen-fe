import React from 'react';

import { Layout } from 'antd';

import { useStyles } from '../styles';
import { Navigation } from '../Navigation';

const { Sider } = Layout;

interface IDesktopPanelProps {
  isCollapsed: boolean;
  setCollapse: React.Dispatch<React.SetStateAction<boolean>>;
}

function DesktopPanel({ isCollapsed, setCollapse }: IDesktopPanelProps) {
  const classes = useStyles();

  return (
    <Sider
      className={classes.sidebar}
      breakpoint="lg"
      theme="light"
      collapsible
      collapsed={isCollapsed}
      onCollapse={() => setCollapse(!isCollapsed)}
    >
      <div className={classes.logo}>
        <img
          src={isCollapsed ? 'images/favicon.png' : 'images/logo.svg'}
          width={isCollapsed ? 38.625 : 85}
          height={38.625}
          alt="Logo"
        />
      </div>
      <Navigation collapsed={isCollapsed} setCollapse={setCollapse} />
    </Sider>
  );
}

export default React.memo(DesktopPanel);
