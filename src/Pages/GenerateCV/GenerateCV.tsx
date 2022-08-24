import { useState, useEffect } from 'react';
import { matchPath, useNavigate, generatePath, useLocation } from 'react-router-dom';
import { Tabs } from 'antd';

import { PageNotFound } from 'common-components/PageNotFound';

import { GenerateCVsteps } from './utils/constants';
import paths from 'config/routes.json';
import { ChoosePerson } from './ChoosePerson/ChoosePerson';
import { TechnicalInterview } from './TechnicalInterview';
import { SoftskillsInterview } from './SoftskillsInterview';
import { useStyles } from './styles';

const { TabPane } = Tabs;

const tabPaths = [
  paths.generateCVchoosePerson,
  paths.generateCVtechnicalInterview,
  paths.generateCVsoftskillsInterview,
];

export const GenerateCV = ({ ...props }) => {
  const classes = useStyles(props);

  const navigate = useNavigate();
  const location = useLocation();

  const [currentTab, setCurrentTab] = useState('0');

  useEffect(() => {
    const tabFromPath = tabPaths.findIndex((p) => !!matchPath(location.pathname, p));
    setCurrentTab(`${tabFromPath}`);
  }, [location.pathname]);

  const handleTabClick = (key: string) => {
    const allowedPaths = [paths.generateCVtechnicalInterview, paths.generateCVsoftskillsInterview, paths.candidate];

    if (+key > 0) return;

    if (!allowedPaths.some((p) => matchPath(location.pathname, p))) {
      if (key === '0') {
        navigate(paths.generateCVchoosePerson);
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
        <TabPane tab={GenerateCVsteps.CHOOSE_A_PERSON} key="0">
          <ChoosePerson />
        </TabPane>
        <TabPane tab={GenerateCVsteps.TECHNICAL_INTERVIEW} key="1">
          <TechnicalInterview />
        </TabPane>
        <TabPane tab={GenerateCVsteps.SOFT_SKILLS_INTERVIEW} key="2">
          <SoftskillsInterview />
        </TabPane>
      </Tabs>
      {currentTab === '-1' && !(location.pathname === paths.generateCV) ? <PageNotFound /> : null}
    </>
  );
};

GenerateCV.defaultProps = {
  deviceRatio: window.devicePixelRatio,
};
