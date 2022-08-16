import { hot } from 'react-hot-loader/root';
import { Suspense, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './Routes';
import { Navigation } from 'components/Organisms/Navigation/Navigation';
import { permissions } from 'constants/permissions';
import { Layout, Drawer } from 'antd';
import { AuthCheck } from 'scenes/Root/AuthCheck';
import { PermissionGate } from 'scenes/Root/PermissionGate';
import { ErrorBoundary } from 'scenes/Root/ErrorBoundary';
import 'antd/dist/antd.css';
import { MenuOutlined } from '@ant-design/icons';
import logo from 'images/logo.svg';
import shortLogo from 'images/favicon.png';
import { createUseStyles } from 'react-jss';
import { useIsMobile } from 'components/Responsive/Mobile';
import { PreLoader } from 'components/Molecules/PreLoader/PreLoader';
import { desktopBreakpoints } from 'theme/breakpoints';
import { StartUp } from '../StartUp/StartUp';
import { Provider } from 'react-redux';
import { store, persistor } from 'store/store';
import { PersistGate } from 'redux-persist/integration/react';

const { Content, Sider, Header } = Layout;
const useStyles = createUseStyles({
  header: {
    background: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0px 30px',
    position: 'sticky',
    top: '0px',
    zIndex: '10',
    [`@media (max-width: ${desktopBreakpoints[0] - 1}px)`]: {
      height: '55px',
      padding: '0px 22px',
    },
  },
  drawer: {
    height: '100vh',
  },
  global: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& button': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  logo: {
    margin: '15px auto',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  sidebar: {
    position: 'fixed',
    minWidth: 0,
    minHeight: '100vh',
    transition: 'all 0.2s',
  },
  content: {
    marginLeft: '200px',
    [`@media (max-width: ${desktopBreakpoints[1] - 1}px)`]: {
      marginLeft: '75px',
    },
    [`@media (max-width: ${desktopBreakpoints[0] - 1}px)`]: {
      marginLeft: '25px',
    },
  },
});

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
                      <Content className={classes.content}>
                        <Routes />
                      </Content>
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

export const Root = hot(RootUnwrapped);
