import { useState } from 'react';

import {
    Outlet,
  } from "react-router-dom";

import { Navigation } from './Navigation';
import { Layout, Drawer } from 'antd';
import { ErrorBoundary } from './ErrorBoundary';
import { MenuOutlined } from '@ant-design/icons';
import {Header as AppHeader} from './Header';

import { useIsMobile } from 'theme/Responsive';

import { useStyles } from './styles';

const { Sider, Header, Content } = Layout;

export const AppRootPublicContainer = () => {
  const isMobile = useIsMobile();
  const [isCollapsed, setCollapse] = useState(isMobile);
  const classes = useStyles();
  return (
          <div className={classes.global}>
              <ErrorBoundary>
              <Layout style={{ minHeight: '100vh' }}>
                        {isMobile ? (
                          <>
                            <Header className={classes.header}>
                              <MenuOutlined
                                onClick={() => {
                                  setCollapse(!isCollapsed);
                                }}
                              />
                              <img
                                src={'images/logo.svg'}
                                width={85}
                                height={38.625}
                                alt="Logo"
                              />
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
                              <Navigation
                                collapsed={false}
                                setCollapse={setCollapse}
                              />
                            </Drawer>
                          </>
                        ) : (
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
                            <Navigation
                              collapsed={isCollapsed}
                              setCollapse={setCollapse}
                            />
                          </Sider>
                        )}
                        <Content className={classes.content}>
                            <AppHeader title="Welcome to CV generator!"/>
                            <div style={{paddingTop: '50px'}}>
                                <Outlet/>
                            </div>
                        </Content>
                        </Layout>
              </ErrorBoundary>
          </div>
  );
};

