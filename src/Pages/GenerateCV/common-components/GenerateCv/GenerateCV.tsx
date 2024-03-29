import { useState, useEffect } from 'react';
import { matchPath, useNavigate, generatePath, useLocation } from 'react-router-dom';
import { Tabs } from 'antd';

import { GenerateCVsteps } from './utils/constants';
import paths from 'config/routes.json';
import { useStyles } from './styles';

const { TabPane } = Tabs;

const tabPaths = [paths.home, paths.generateCVtechnicalInterview, paths.generateCVsoftskillsInterview];

export const GenerateCV = ({ ...props }) => {
  const classes = useStyles(props);

  const navigate = useNavigate();
  const location = useLocation();

  const [currentTab, setCurrentTab] = useState('0');

  useEffect(() => {
    let tabFromPath = '0';
    if (location.pathname.includes('tech-interview')) {
      tabFromPath = '1';
    } else if (location.pathname.includes('soft-interview')) {
      tabFromPath = '2';
    }

    setCurrentTab(tabFromPath);
  }, [location.pathname]);

  const handleTabClick = (key: string) => {
    const allowedPaths = [paths.generateCVtechnicalInterview, paths.generateCVsoftskillsInterview, paths.candidate];

    if (+key > 0) return;

    if (!allowedPaths.some((p) => matchPath(location.pathname, p))) {
      if (key === '0') {
        navigate(paths.home);
        setCurrentTab(key);
      }
      return;
    }

    const candidateId = allowedPaths.reduce((acc, path) => {
      return matchPath(location.pathname, path)?.params.id ?? acc;
    }, '');

    navigate(generatePath(tabPaths[+key], candidateId ? { id: candidateId } : {}));
    setCurrentTab(key);
  };

  return (
    <>
      <Tabs
        className={classes.tabsContainer}
        activeKey={currentTab}
        size="large"
        type="card"
        onTabClick={handleTabClick}
      >
        <TabPane tab={GenerateCVsteps.CHOOSE_A_PERSON} key="0" disabled={true} />
        <TabPane tab={GenerateCVsteps.TECHNICAL_INTERVIEW} key="1" disabled={true} />
        <TabPane tab={GenerateCVsteps.SOFT_SKILLS_INTERVIEW} key="2" disabled={true} />
      </Tabs>
    </>
  );
};

GenerateCV.defaultProps = {
  devicePixelRatio: window.devicePixelRatio,
};
