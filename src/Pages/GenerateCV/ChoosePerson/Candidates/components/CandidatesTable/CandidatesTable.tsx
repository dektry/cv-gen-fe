import { useEffect, useCallback } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { isArray } from 'lodash';

import { ICandidateTable } from 'models/ICandidate';
import { ITableParams, IExpandableParams } from 'models/ICommon';

import { loadCandidates, setCandidatesCurrentPage, setCandidatesPageSize } from 'store/reducers/candidates';
import { useAppDispatch } from 'store';

import { TablePaginationConfig } from 'antd/es/table/Table';
import { SorterResult } from 'antd/es/table/interface';

import { CANDIDATES, CANDIDATE_TABLE_KEYS, defaultPageSize, defaultCurrentPage } from './utils/constants';

import paths from 'config/routes.json';
import { useIsMobile } from 'theme/Responsive';
import { CandidateShortCard } from '../CandidateShortCard';
import { TableComponent as Table } from 'common-components/Table';
// TODO: implement loader logic

interface ICandidateTableProps {
  editAction: boolean;
  pageSize: number;
  currentPage: number;
  totalItems: number;
  isLoading: boolean;
  candidates: ICandidateTable[];
}

export const CandidatesTable = ({
  editAction = false,
  pageSize,
  currentPage,
  totalItems,
  isLoading,
  candidates,
}: ICandidateTableProps) => {
  const dispatch = useAppDispatch();

  const handleChange = async (
    pagination: TablePaginationConfig,
    sorter: SorterResult<ICandidateTable> | SorterResult<ICandidateTable>[]
  ) => {
    dispatch(setCandidatesCurrentPage(pagination.current || defaultCurrentPage));
    dispatch(setCandidatesPageSize(pagination.pageSize || defaultPageSize));
    await dispatch(
      loadCandidates({
        page: pagination.current || defaultCurrentPage,
        limit: pagination.pageSize || defaultPageSize,
        sorter: isArray(sorter) ? { order: 'ascend', field: 'name' } : { order: sorter.order, field: sorter.field },
      })
    );
  };

  const isMobile = useIsMobile();
  const navigation = useNavigate();

  const renderMobileCandidateCard = (record: ICandidateTable) => {
    return <CandidateShortCard record={record} />;
  };

  const paginationObj = {
    pageSize,
    total: totalItems,
    current: currentPage,
    showTotal: (total: number) => `Total ${total} candidates`,
  };

  const expandableParams: IExpandableParams<ICandidateTable> | undefined = isMobile
    ? {
        columnWidth: '16px',
        expandRowByClick: true,
        expandedRowRender: renderMobileCandidateCard,
      }
    : undefined;

  const handleRowClick = useCallback(
    (record: ICandidateTable) => {
      return {
        ...(editAction
          ? {
              onClick: () => {
                navigation(
                  generatePath(paths.candidate, {
                    id: record.id || '',
                  })
                );
              },
            }
          : {}),
      };
    },
    [editAction, history]
  );

  const params: ITableParams<ICandidateTable> = {
    handleChange,
    entity: CANDIDATES,
    tableKeys: CANDIDATE_TABLE_KEYS,
    dataSource: candidates,
    expandableParams,
    handleRowClick,
    paginationObj,
    loading: isLoading,
  };

  return <Table<ICandidateTable> params={params} />;
};
