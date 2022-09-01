import React from 'react';

import { Layout, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import { useStyles } from '../styles';
import { Navigation } from '../Navigation';

const { Header } = Layout;

interface IMobilePanelProps {
  isCollapsed: boolean;
  setCollapse: React.Dispatch<React.SetStateAction<boolean>>;
}

function MobilePanel({ isCollapsed, setCollapse }: IMobilePanelProps) {
  const classes = useStyles();

  return (
    <>
      <Header className={classes.header}>
        <MenuOutlined
          onClick={() => {
            setCollapse(!isCollapsed);
          }}
        />
        <img src={'images/logo.svg'} width={85} height={38.625} alt="Logo" />
      </Header>
      <Drawer
        className={classes.drawer}
        title="Navigation"
        placement="left"
        onClose={() => setCollapse(true)}
        getContainer={false}
        visible={!isCollapsed}
        width="200px"
      >
        <Navigation collapsed={false} setCollapse={setCollapse} />
      </Drawer>
    </>
  );
}

export default React.memo(MobilePanel);
