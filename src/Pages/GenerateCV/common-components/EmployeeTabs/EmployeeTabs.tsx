import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, generatePath, useParams } from 'react-router-dom';

import { Tabs } from 'antd';

import { EmployeeSteps } from './utils/constants';
import paths from 'config/routes.json';

import { useStyles } from './styles';

const { TabPane } = Tabs;

export const EmployeeTabs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();

  const { id } = useParams<{ id: string }>();

  const [currentTab, setCurrentTab] = useState('0');
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (location.pathname.includes('employee-list')) {
      setCurrentTab('0');
    } else if (location.pathname.includes('tech-interview')) {
      setCurrentTab('1');
    } else if (location.pathname.includes('soft-interview')) {
      setCurrentTab('2');
    } else if (location.pathname.includes('english-interview')) {
      setCurrentTab('3');
    } else if (location.pathname.includes('summary')) {
      setCurrentTab('4');
    }
  }, [location]);

  useEffect(() => {
    if (!id) {
      setDisabled(true);
    }
  }, [id]);

  const handleTabClick = (key: string) => {
    switch (key) {
      case '0': {
        navigate(generatePath(paths.generateCVemployeesList, { id }));
        break;
      }
      case '1': {
        navigate(generatePath(paths.generateCVtechnicalAssessmentHistory, { id }));
        break;
      }
      case '2': {
        navigate(generatePath(paths.generateCVsoftSkillAssessmentHistory, { id }));
        break;
      }
      // TODO: fix paths for tabs with EI and Summary
      case '3': {
        navigate(generatePath(paths.generateCVemployeesList, { id }));
        break;
      }
      case '4': {
        navigate(generatePath(paths.generateCVemployeesList, { id }));
        break;
      }
    }
  };

  return (
    <div className={classes.tabsContainer}>
      <Tabs activeKey={currentTab} size="large" type="line" onTabClick={handleTabClick}>
        <TabPane tab={EmployeeSteps.EMPLOYEES_INFO} key="0" />
        <TabPane tab={EmployeeSteps.TECHNICAL_INTERVIEW} key="1" disabled={disabled} />
        <TabPane tab={EmployeeSteps.SOFT_INTERVIEW} key="2" disabled={disabled} />
        <TabPane tab={EmployeeSteps.ENGLISH_INTERVIEW} key="3" disabled={disabled} />
        <TabPane tab={EmployeeSteps.SUMMARY} key="4" disabled={disabled} />
      </Tabs>
    </div>
  );
};
