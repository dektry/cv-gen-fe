import React, { useRef } from 'react';

import Typography from 'antd/lib/typography';

import { EmployeesTable } from 'components/Molecules/EmployeesTable/EmployeesTable';
import { GenerateCvHeader } from 'components/Molecules/GenerateCVHeader/CvHeader';
import { SearchWithAutocomplete } from 'components/Atoms/SearchWithAutocomplete/SearchWithAutocomplete';

import { paths } from 'routes/paths';
import { EMPLOYEES } from 'constants/titles';

import { useAppDispatch } from 'store/store';
import { getEmployeesList } from 'store/employees';

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
