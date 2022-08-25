import React, { useEffect, useCallback } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { isArray } from 'lodash';
import { Table, Button, Space } from 'antd';
import { SorterResult, SortOrder } from 'antd/es/table/interface';
import { TablePaginationConfig } from 'antd/es/table/Table';
import { EditOutlined, DiffOutlined } from '@ant-design/icons';

import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { setLoading, setPageSize, setCurrentPage, employeesSelector, getEmployeesList } from 'store/reducers/employees';

import { EmployeeShortCard } from '../EmployeeShortCard';
import { useStyles } from '../EmployeesTable/styles';
import { useIsMobile } from 'theme/Responsive';
import { defaultCurrentPage, defaultPageSize, EMPLOYEE_TABLE_KEYS, EMPLOYEES, ACTIONS } from './utils/constants';

import { IEmployee } from 'models/IEmployee';
import paths from 'config/routes.json';

const { Column } = Table;

export const EmployeesTable = ({ hideActions = false, editAction = false }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { employees, currentPage, pageSize, totalItems, query, isLoading } = useSelector(employeesSelector);

  const classes = useStyles();
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
    navigate(
      generatePath(paths.employee, {
        id: record.id || '',
      })
    );
  };

  const renderActions = (record: IEmployee) => {
    return (
      <Space>
        <Button type="primary" onClick={() => createPath(record)} icon={<DiffOutlined />} />
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
    [editAction, history]
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
      onRow={(record) => handleRowClick(record)}
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
      {!hideActions && <Column className={classes.tableActions} title={ACTIONS} render={renderActions} />}
    </Table>
  );
};
