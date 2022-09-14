import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Tabs } from 'antd';

import { EmployeeSteps } from './utils/constants';

import { useStyles } from './styles';

const { TabPane } = Tabs;

export const EmployeeTabs = () => {
  const [currentTab, setCurrentTab] = useState('0');

  const location = useLocation();

  const classes = useStyles();

  useEffect(() => {
    if (location.pathname.includes('employee-list')) {
      setCurrentTab('0');
    } else if (location.pathname.includes('tech-interview')) {
      setCurrentTab('1')
    } else if (location.pathname.includes('soft-interview')) {
      setCurrentTab('2')
    } else if (location.pathname.includes('english-interview')) {
      setCurrentTab('3')
    } else if (location.pathname.includes('summary')) {
      setCurrentTab('4')
    }
  }, [location]);


  return (
    <div className={classes.tabsContainer}>
      <Tabs
        activeKey={currentTab}
        size='large'
        type='line'
    >
        <TabPane tab={EmployeeSteps.EMPLOYEES_INFO} key='0' disabled={true} />
        <TabPane tab={EmployeeSteps.TECHNICAL_INTERVIEW} key='1' disabled={true} />
        <TabPane tab={EmployeeSteps.SOFT_INTERVIEW} key='2' disabled={true} />
        <TabPane tab={EmployeeSteps.ENGLISH_INTERVIEW} key='3' disabled={true} />
        <TabPane tab={EmployeeSteps.SUMMARY} key='4' disabled={true} />
      </Tabs>
    </div>
  )

}