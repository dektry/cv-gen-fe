import React, { useRef, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { Typography, Spin } from 'antd';

import { EmployeesTable } from './components/EmployeesTable';
import { GenerateCvHeader } from 'common-components/GenerateCVHeader';
import { SearchWithAutocomplete } from 'common-components/SearchWithAutocomplete';

import { EMPLOYEES } from '../../utils/constants';
import { defaultCurrentPage, defaultPageSize } from './components/EmployeesTable/utils/constants';

import { useAppDispatch } from 'store';
import { getEmployeesList, employeesSelector } from 'store/reducers/employees';

import { useStyles } from './styles';

export const Employees = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const fullNameRef = useRef<string>('');

  const { employees, currentPage, pageSize, totalItems, query, isLoading } = useSelector(employeesSelector);

  useEffect(() => {
    dispatch(
      getEmployeesList({
        page: currentPage || defaultCurrentPage,
        limit: pageSize || defaultPageSize,
      })
    );
  }, []);

  if (isLoading) return <Spin size="large" tip={'Loading employees...'} />;

  return (
    <>
      <div className={classes.container}>
        <GenerateCvHeader noBackBtn>
          <Typography className={classes.title}>{EMPLOYEES.TITLE}</Typography>
          <SearchWithAutocomplete
            className={classes.search}
            onChange={(props) => dispatch(getEmployeesList(props))}
            fullNameRef={fullNameRef}
          />
        </GenerateCvHeader>
        <EmployeesTable
          employees={employees}
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={totalItems}
          query={query}
          isLoading={isLoading}
          editAction
        />
      </div>
    </>
  );
};
