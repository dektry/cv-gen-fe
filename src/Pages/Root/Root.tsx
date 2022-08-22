import { Suspense, useState, memo } from 'react';
import { BrowserRouter } from 'react-router-dom';
// import { Routes } from './Routes'; // TODO: fix routers import
import { Navigation } from 'pages/Navigation';
import { permissions } from 'pages/Navigation/utils/constants';
import { Layout, Drawer } from 'antd';
import { AuthCheck } from 'pages/AuthCheck';
import { PermissionGate } from 'pages/PermissionGate';
import { ErrorBoundary } from 'pages/ErrorBoundary';
import 'antd/dist/antd.css';
import { MenuOutlined } from '@ant-design/icons';
import logo from 'images/logo.svg';
import shortLogo from 'images/favicon.png';

import { useIsMobile } from 'common-components/Responsive';
import { PreLoader } from 'common-components/PreLoader';

import { StartUp } from 'pages/StartUp';
import { Provider } from 'react-redux';
import { store, persistor } from 'store';
import { PersistGate } from 'redux-persist/integration/react';

import { useStyles } from './styles';

const { Sider, Header } = Layout;


export const RootUnwrapped = () => {
  const isMobile = useIsMobile();
  const [isCollapsed, setCollapse] = useState(isMobile);
  const classes = useStyles();
  return (
    <Provider store={store}>
      <PersistGate
        loading={<PreLoader status="Loading data..." />}
        persistor={persistor}
      >
        <BrowserRouter>
          <div className={classes.global}>
            <Suspense fallback={<PreLoader status="Loading components..." />}>
              <ErrorBoundary>
                <StartUp>
                  <AuthCheck>
                    <Layout style={{ minHeight: '100vh' }}>
                      <PermissionGate permissions={[permissions.getUser]}>
                        {isMobile ? (
                          <>
                            <Header className={classes.header}>
                              <MenuOutlined
                                onClick={() => {
                                  setCollapse(!isCollapsed);
                                }}
                              />
                              <img
                                src={logo}
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
                                src={isCollapsed ? shortLogo : logo}
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
                      </PermissionGate>
                      {/* <Content className={classes.content}>
                        <Routes />
                      </Content> */}
                    </Layout>
                  </AuthCheck>
                </StartUp>
              </ErrorBoundary>
            </Suspense>
          </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export const Root = memo(RootUnwrapped);
