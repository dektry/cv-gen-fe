import React, { useState } from 'react';

import {
    Outlet,
  } from "react-router-dom";

import { Layout } from 'antd';

import DesktopPanel from './MenuPanel/DesktopPanel'
import MobilePanel from './MenuPanel/MobilePanel'
import {Header as AppHeader} from './Header';
import { ErrorBoundary } from './ErrorBoundary';

import { useIsMobile } from 'theme/Responsive';

import { useStyles } from './styles';

const {  Content } = Layout;

export const AppRootPublicContainer = () => {
  const isMobile = useIsMobile();
  const classes = useStyles();
  
  const [isCollapsed, setCollapse] = useState(isMobile);

  return (
          <div className={classes.global}>
              <ErrorBoundary>
              <Layout className={classes.layout}>
                        {isMobile ? (
                          <MobilePanel isCollapsed={isCollapsed} setCollapse={setCollapse}/> 
                        ) : (
                    <DesktopPanel isCollapsed={isCollapsed} setCollapse={setCollapse}/>
                        )}
                        <Content className={classes.content}>
                            <div className={classes.outlet_container}>
                                <Outlet/>
                            </div>
                        </Content>
                        </Layout>
              </ErrorBoundary>
          </div>
  );
};

