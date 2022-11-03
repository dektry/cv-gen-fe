import React, { useRef, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { Typography } from 'antd';

import { EmployeesTable } from './components/EmployeesTable';
import { GenerateCvHeader } from 'common-components/GenerateCVHeader';
import { SearchWithAutocomplete } from 'common-components/SearchWithAutocomplete';

import { EMPLOYEES } from '../../utils/constants';
import { defaultCurrentPage, defaultPageSize } from './components/EmployeesTable/utils/constants';
import { Spinner } from 'common-components/Spinner';

import { useAppDispatch } from 'store';
import { employeesSelector } from 'store/reducers/employees';
import { getEmployeesList } from 'store/reducers/employees/thunks';

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

  // if (isLoading) return ;

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
        {isLoading && <Spinner text={'Loading employees...'} />}
        {!isLoading && (
          <EmployeesTable
            employees={employees}
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={totalItems}
            query={query}
            isLoading={isLoading}
            editAction
          />
        )}
      </div>
    </>
  );
};
