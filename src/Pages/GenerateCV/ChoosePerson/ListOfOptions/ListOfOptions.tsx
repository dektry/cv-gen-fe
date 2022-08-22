import React from 'react';
import { Menu, Typography } from 'antd';
import { Link } from 'react-router-dom';
import paths from 'config/routes.json';
import { CANDIDATES, EMPLOYEES, ASSESSMENT } from 'pages/GenerateCV/utils/constants';
import { useStyles } from './styles';

export const ListOfOptions = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography.Title level={5}>
        Select candidate, employee or assessment
      </Typography.Title>
      <Menu className={classes.candidatesMenu}>
        <Menu.Item>
          <Link to={paths.generateCVcandidateList}>{CANDIDATES.TITLE}</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={paths.generateCVemployeesList}>{EMPLOYEES.TITLE}</Link>
        </Menu.Item>
        <Menu.Item>
          <p>{ASSESSMENT}</p>
        </Menu.Item>
      </Menu>
    </div>
  );
};
