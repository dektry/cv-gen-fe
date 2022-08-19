import React, { useRef } from 'react';

import Typography from 'antd/lib/typography';

import { EmployeesTable } from 'Pages/EmployeesTable';
import { GenerateCvHeader } from 'CommonComponents/GenerateCVHeader';
import { SearchWithAutocomplete } from 'CommonComponents/SearchWithAutocomplete';

import paths from 'config/routes.json';
import { EMPLOYEES } from 'Pages/EmployeesTable/utils/constants';

import { useAppDispatch } from 'store';
import { getEmployeesList } from 'store/reducers/employees';

import { useStyles } from './styles';

export const Employees = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const fullNameRef = useRef<string>('');

  return (
    <>
      <GenerateCvHeader backPath={paths.generateCVchoosePerson}>
        <Typography className={classes.title}>{EMPLOYEES.TITLE}</Typography>
        <SearchWithAutocomplete
          className={classes.search}
          onChange={props => dispatch(getEmployeesList(props))}
          fullNameRef={fullNameRef}
        />
      </GenerateCvHeader>
      <EmployeesTable hideActions editAction />
    </>
  );
};
