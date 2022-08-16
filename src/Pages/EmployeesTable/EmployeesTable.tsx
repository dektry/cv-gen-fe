import React, { useEffect, useCallback, useState } from 'react';
import { generatePath, useHistory } from 'react-router-dom';
import { isArray } from 'lodash';
import { Table, Button, Space } from 'antd';
import { SorterResult } from 'antd/es/table/interface';
import { TablePaginationConfig } from 'antd/es/table/Table';
import { EditOutlined, DiffOutlined } from '@ant-design/icons';

import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store/store';
import {
  setEmployee,
  setLoading,
  setNameFilter,
  setPageSize,
  setSearchQuery,
  setCurrentPage,
  employeesSelector,
  getEmployeesList,
} from 'store/employees';

import { EmployeeShortCard } from 'components/Atoms/EmployeeShortCard/EmployeeShortCard';
import { useStyles } from 'components/Molecules/EmployeesTable/styles';
import { useIsMobile } from 'components/Responsive';
import {
  defaultCurrentPage,
  defaultPageSize,
  EMPLOYEE_TABLE_KEYS,
} from 'constants/employees';
import { EMPLOYEES, ACTIONS } from 'constants/titles';
import { IEmployee } from 'interfaces/employees.interface';
import { paths } from 'routes/paths';

const { Column } = Table;

export const EmployeesTable = ({ hideActions = false, editAction = false }) => {
  const history = useHistory();
  const [load, setLoad] = useState(false)
  const dispatch = useAppDispatch();
  const {
    employees,
    currentPage,
    pageSize,
    totalItems,
    query,
    isLoading,
  } = useSelector(employeesSelector);

  const classes = useStyles();
  const isMobile = useIsMobile();

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(
      getEmployeesList({
        page: currentPage || 1,
        limit: pageSize || 10,
      }),
    );
    dispatch(setLoading(false));
  }, []);

  const handleChange = async (
    pagination: TablePaginationConfig,
    sorter: SorterResult<IEmployee> | SorterResult<IEmployee>[],
  ) => {
    dispatch(setLoading(true));
    dispatch(setCurrentPage(pagination.current ?? defaultCurrentPage));
    dispatch(setPageSize(pagination.pageSize ?? defaultPageSize));
    await dispatch(
      getEmployeesList({
        page: pagination.current,
        limit: pagination.pageSize,
        ...(isArray(sorter)
          ? {}
          : {
            sorter: { order: sorter.order, field: sorter.field as string },
          }),
        fullName: query,
      }),
    );
    dispatch(setLoading(false));
  };

  const renderMobileEmployeeCard = (record: IEmployee) => {
    return <EmployeeShortCard record={record} />;
  };

  const expandbleParams = isMobile
    ? {
      columnWidth: '16px',
      expandRowByClick: true,
      expandedRowRender: renderMobileEmployeeCard,
    }
    : undefined;

  const paginationParams = {
    pageSize,
    total: totalItems,
    current: currentPage,
    showTotal: (total: number) => `Total ${total} employees`,
  };

  const createPath = (record: IEmployee) => {
    history.push(
      generatePath(paths.employee, {
        id: record.id || '',
      }),
    );
  };

  const renderActions = (record: IEmployee) => {
    return (
      <Space>
        <Button
          type="primary"
          onClick={() => createPath(record)}
          icon={<DiffOutlined />}
        />
        <Button type="primary" onClick={() => false} icon={<EditOutlined />} />
      </Space>
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
    [editAction, history],
  );

  return (
    <Table
      rowKey={'id'}
      size="small"
      dataSource={employees}
      expandable={expandbleParams}
      pagination={paginationParams}
      loading={isLoading}
      onChange={handleChange}
      onRow={record => handleRowClick(record)}
    >
      <Column
        title={EMPLOYEES.FULLNAME}
        dataIndex={EMPLOYEE_TABLE_KEYS.fullName}
        key={EMPLOYEE_TABLE_KEYS.fullName}
        sorter
      />
      <Column
        title={EMPLOYEES.POSITION}
        dataIndex={EMPLOYEE_TABLE_KEYS.position}
        key={EMPLOYEE_TABLE_KEYS.position}
        sorter
      />
      <Column
        className={classes.displayNoneMobile}
        title={EMPLOYEES.LEVEL}
        dataIndex={EMPLOYEE_TABLE_KEYS.level}
        key={EMPLOYEE_TABLE_KEYS.level}
        sorter
      />
      <Column
        className={classes.displayNoneMobile}
        title={EMPLOYEES.LOCATION}
        dataIndex={EMPLOYEE_TABLE_KEYS.location}
        key={EMPLOYEE_TABLE_KEYS.location}
        sorter
      />
      {!hideActions && (
        <Column
          className={classes.tableActions}
          title={ACTIONS}
          render={renderActions}
        />
      )}
    </Table>
  );
};
