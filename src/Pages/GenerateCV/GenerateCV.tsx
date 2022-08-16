import React, { useState, useEffect } from 'react';
import {
  matchPath,
  useHistory,
  generatePath,
  useLocation,
} from 'react-router-dom';
import { Tabs } from 'antd';

import { PageNotFound } from 'components/Atoms/PageNotFound/PageNotFound';
import { Header } from 'components/Organisms/Header/Header';
import { GenerateCVsteps } from 'constants/generateCV';
import { GENERATE_CV } from 'constants/titles';
import { paths } from 'routes/paths';
import { ChoosePerson } from 'scenes/generateCV/ChoosePerson/ChoosePerson';
import { useStyles } from 'scenes/generateCV/styles';
import { TechnicalInterview } from 'scenes/generateCV/TechnicalInterview/TechnicalInterview';
import { SoftskillsInterview } from './SoftskillsInterview/SoftskillsInterview';

const { TabPane } = Tabs;

type Theme = {
  deviceRatio: number;
};

const tabPaths = [
  paths.generateCVchoosePerson,
  paths.generateCVtechnicalInterview,
  paths.generateCVsoftskillsInterview,
];

export const GenerateCV = ({ ...props }) => {
  const classes = useStyles(props);

  const history = useHistory();
  const location = useLocation();

  const [currentTab, setCurrentTab] = useState('0');

  useEffect(() => {
    const tabFromPath = tabPaths.findIndex(
      p => !!matchPath(location.pathname, p),
    );
    setCurrentTab(`${tabFromPath}`);
  }, [location.pathname]);

  const handleTabClick = (key: string) => {
    const allowedPaths = [
      paths.generateCVtechnicalInterview,
      paths.generateCVsoftskillsInterview,
      paths.candidate,
    ];

    if (+key > 0) return;

    if (!allowedPaths.some(p => matchPath(location.pathname, p))) {
      if (key === '0') {
        history.push(paths.generateCVchoosePerson);
        setCurrentTab(key);
      }
      return;
    }

    const candidateId = allowedPaths.reduce((acc, path) => {
      return (
        matchPath<{ id: string }>(location.pathname, path)?.params.id ?? acc
      );
    }, '');

    history.push(
      generatePath(tabPaths[+key], candidateId ? { id: candidateId } : {}),
    );
    setCurrentTab(key);
  };

  return (
    <>
      <Header title={GENERATE_CV} />
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
      {currentTab === '-1' &&
      !matchPath(location.pathname, paths.generateCV)?.isExact ? (
        <PageNotFound />
      ) : null}
    </>
  );
};

GenerateCV.defaultProps = {
  deviceRatio: window.devicePixelRatio,
};
