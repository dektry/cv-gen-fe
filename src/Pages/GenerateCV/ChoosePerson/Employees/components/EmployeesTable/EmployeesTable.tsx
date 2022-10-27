import React, { useCallback, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { isArray } from 'lodash';
import { SorterResult, SortOrder } from 'antd/es/table/interface';
import { TablePaginationConfig } from 'antd/es/table/Table';

import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { setLoading, setPageSize, setCurrentPage, setEmployee, employeesSelector } from 'store/reducers/employees';
import { getEmployeesList, deleteEmployee } from 'store/reducers/employees/thunks';

import { EmployeeShortCard } from '../EmployeeShortCard';
import { useIsMobile } from 'theme/Responsive';
import { defaultCurrentPage, defaultPageSize, EMPLOYEE_TABLE_KEYS, EMPLOYEES } from './utils/constants';

import { IEmployee } from 'models/IEmployee';
import { ITableParams, IExpandableParams } from 'models/ICommon';
import paths from 'config/routes.json';

import { TableComponent as Table } from 'common-components/Table';
import { DeleteModal } from 'common-components/DeleteModal';

import theme from 'theme/theme';
import { useStyles } from './styles';

interface IEmployeeTableProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  query: string | undefined;
  isLoading: boolean;
  editAction: boolean;
  employees: IEmployee[];
}

export const EmployeesTable = ({
  editAction = false,
  currentPage,
  pageSize,
  totalItems,
  query,
  isLoading,
  employees,
}: IEmployeeTableProps) => {
  const classes = useStyles({ theme });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { currentEmployee } = useSelector(employeesSelector);

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
          : { order: sorter.order as SortOrder, field: sorter.field },
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

  const handleOpenDeleteModal = (e: React.MouseEvent<HTMLElement>, record: IEmployee) => {
    e.stopPropagation();
    dispatch(setEmployee(record));
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    dispatch(setEmployee({} as IEmployee));
    setIsDeleteModalOpen(false);
  };

  const handleDeleteEmployeeConfirm = () => {
    if (currentEmployee.id) {
      dispatch(deleteEmployee(currentEmployee)).then(() => {
        dispatch(
          getEmployeesList({
            page: defaultCurrentPage,
            limit: defaultPageSize,
            sorter: { order: 'ascend', field: 'fullName' },
          })
        );
      });
      handleDeleteModalClose();
    }
  };

  const renderActions = useCallback((record: IEmployee) => {
    return (
      <Button
        className={classes.button}
        endIcon={<DeleteIcon />}
        onClick={(e: React.MouseEvent<HTMLElement>) => handleOpenDeleteModal(e, record)}
      />
    );
  }, []);

  const params: ITableParams<IEmployee> = {
    handleChange,
    entity: EMPLOYEES,
    tableKeys: EMPLOYEE_TABLE_KEYS,
    dataSource: employees,
    expandableParams,
    handleRowClick,
    paginationObj,
    loading: isLoading,
    renderActions,
  };

  return (
    <>
      <Table<IEmployee> params={params} />
      <DeleteModal
        onSubmit={handleDeleteEmployeeConfirm}
        onClose={handleDeleteModalClose}
        isOpen={isDeleteModalOpen}
        modalTitle={'DELETE EDUCATION'}
        modalText={'Are you sure you want to delete this education? All data will be lost'}
      />
    </>
  );
};
