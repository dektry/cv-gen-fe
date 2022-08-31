import React from 'react';

import { Link } from 'react-router-dom';

import { Menu, Typography } from 'antd';

import { GenerateCV } from 'Pages/GenerateCV/common-components/GenerateCv';

import paths from 'config/routes.json';
import { CANDIDATES, EMPLOYEES, ASSESSMENT } from './utils/constants';

import { useStyles } from './styles';

export const HomePage = () => {
  const classes = useStyles();

  return (
    <>
      <GenerateCV />
      <div className={classes.container}>
        <Typography.Title level={5}>Select candidate, employee or assessment</Typography.Title>
        <Menu className={classes.candidatesMenu}>
          <Menu.Item>
            <Link to={paths.generateCVcandidateList}>{CANDIDATES}</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={paths.generateCVemployeesList}>{EMPLOYEES}</Link>
          </Menu.Item>
          <Menu.Item>
            <p>{ASSESSMENT}</p>
          </Menu.Item>
        </Menu>
      </div>
    </>
  );
};
