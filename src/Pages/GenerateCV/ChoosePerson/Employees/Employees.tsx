import React, { useRef } from 'react';

import Typography from 'antd/lib/typography';

import { EmployeesTable } from './components/EmployeesTable';
import { GenerateCV } from '../../common-components/GenerateCv';
import { GenerateCvHeader } from 'common-components/GenerateCVHeader';
import { SearchWithAutocomplete } from 'common-components/SearchWithAutocomplete';

import paths from 'config/routes.json';
import { EMPLOYEES } from '../../utils/constants';

import { useAppDispatch } from 'store';
import { getEmployeesList } from 'store/reducers/employees';

import { useStyles } from './styles';

export const Employees = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const fullNameRef = useRef<string>('');

  return (
    <>
      <GenerateCV />
      <div className={classes.container}>
        <GenerateCvHeader backPath={paths.home}>
          <Typography className={classes.title}>{EMPLOYEES.TITLE}</Typography>
          <SearchWithAutocomplete
            className={classes.search}
            onChange={(props) => dispatch(getEmployeesList(props))}
            fullNameRef={fullNameRef}
          />
        </GenerateCvHeader>
        <EmployeesTable editAction />
      </div>
    </>
  );
};
