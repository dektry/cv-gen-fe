import React, { useEffect, useCallback } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { isArray } from 'lodash';
import { SorterResult, SortOrder } from 'antd/es/table/interface';
import { TablePaginationConfig } from 'antd/es/table/Table';

import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { setLoading, setPageSize, setCurrentPage, employeesSelector, getEmployeesList } from 'store/reducers/employees';

import { EmployeeShortCard } from '../EmployeeShortCard';
import { useIsMobile } from 'theme/Responsive';
import { defaultCurrentPage, defaultPageSize, EMPLOYEE_TABLE_KEYS, EMPLOYEES } from './utils/constants';

import { IEmployee } from 'models/IEmployee';
import { ITableParams, IExpandableParams } from 'models/ICommon';
import paths from 'config/routes.json';

import { TableComponent as Table } from 'common-components/Table';

export const EmployeesTable = ({ editAction = false }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { employees, currentPage, pageSize, totalItems, query, isLoading } = useSelector(employeesSelector);

  const isMobile = useIsMobile();

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(
      getEmployeesList({
        page: currentPage || defaultCurrentPage,
        limit: pageSize || defaultPageSize,
      })
    );
    dispatch(setLoading(false));
  }, []);

  const handleChange = async (
    pagination: TablePaginationConfig,
    sorter: SorterResult<IEmployee> | SorterResult<IEmployee>[]
  ) => {
    dispatch(setLoading(true));
    dispatch(setCurrentPage(pagination.current || defaultCurrentPage));
    dispatch(setPageSize(pagination.pageSize || defaultPageSize));
    await dispatch(
      getEmployeesList({
        page: pagination.current || defaultCurrentPage,
        limit: pagination.pageSize || defaultPageSize,
        sorter: isArray(sorter)
          ? { order: 'ascend', field: 'name' }
          :  { order: sorter.order as SortOrder, field: sorter.field },
        fullName: query,
      })
    );
    dispatch(setLoading(false));
  };

  const renderMobileEmployeeCard = (record: IEmployee) => {
    return <EmployeeShortCard record={record} />;
  };

  const expandableParams: IExpandableParams<IEmployee> | undefined = isMobile
    ? {
        columnWidth: '16px',
        expandRowByClick: true,
        expandedRowRender: renderMobileEmployeeCard,
      }
    : undefined;

  const paginationObj = {
    pageSize,
    total: totalItems,
    current: currentPage,
    showTotal: (total: number) => `Total ${total} employees`,
  };

  const createPath = (record: IEmployee) => {
    navigate(
      generatePath(paths.employee, {
        id: record.id || '',
      })
    );
  };

  
  const handleRowClick = useCallback(
    (record: IEmployee) => {
      return {
        ...(editAction
          ? {
            onClick: () => createPath(record),
          }
          : {}),
        };
      },
      [editAction, history]
      );
    
      const params: ITableParams<IEmployee> = {
        handleChange,
        entity: EMPLOYEES,
        tableKeys: EMPLOYEE_TABLE_KEYS,
        dataSource: employees,
        expandableParams,
        handleRowClick,
        paginationObj,
        loading: isLoading,
      }

  return (
    <Table<IEmployee> params={ params } />
  );
};
