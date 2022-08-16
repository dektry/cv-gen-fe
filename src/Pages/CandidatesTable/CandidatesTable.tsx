import { useEffect, useCallback } from 'react';
import { generatePath, useHistory } from 'react-router-dom';
import { isArray } from 'lodash';

import { ICandidateTable } from 'interfaces/candidates.interface';

import { useSelector } from 'react-redux';
import {
  setSoftSkillsInterview,
  setSoftSkillsList,
} from 'store/softskillsInterview';
import {
  chooseInterviewLevel,
  chooseInterviewPosition,
  setInterviewResult,
} from 'store/interview';
import {
  candidatesSelector,
  loadCandidates,
  setCandidatesCurrentPage,
  setCandidatesIsLoading,
  setCandidatesPageSize,
  setCandidate,
} from 'store/candidates';
import { useAppDispatch } from 'store/store';

import { Button, Space, Table } from 'antd';
import { EditOutlined, DiffOutlined } from '@ant-design/icons';
import { TablePaginationConfig } from 'antd/es/table/Table';
import { SorterResult } from 'antd/es/table/interface';

import { ACTIONS, CANDIDATES } from 'constants/titles';
import {
  CANDIDATE_TABLE_KEYS,
  defaultPageSize,
  defaultCandidate,
} from 'constants/candidates';
import { GET_CANDIDATES } from '../../../constants/messages';

import { paths } from 'routes/paths';
import { useIsMobile } from '../../Responsive';
import { CandidateShortCard } from '../CandidateShortCard/CandidateShortCard';
import { ComponentLoader } from 'components/Molecules/ComponentLoader/ComponentLoader';

import { useStyles } from './styles';

const { Column } = Table;

export const CandidatesTable = ({
  hideActions = false,
  editAction = false,
}) => {
  const dispatch = useAppDispatch();
  const {
    currentPage,
    pageSize,
    isLoading,
    candidates,
    totalItems,
    currentCandidate,
  } = useSelector(candidatesSelector);

  useEffect(() => {
    dispatch(setCandidate(defaultCandidate));
  }, []);

  useEffect(() => {
    (async () => {
      dispatch(setCandidatesIsLoading(true));
      await dispatch(loadCandidates({ page: currentPage, limit: pageSize }));
      dispatch(
        setSoftSkillsInterview({
          softSkills: [],
          hobby: '',
          comment: '',
          candidateId: '',
          level: undefined,
          position: undefined,
          positionId: '',
          levelId: '',
        }),
      );
      dispatch(setSoftSkillsList([]));
      dispatch(setInterviewResult(null));
      dispatch(chooseInterviewLevel(undefined));
      dispatch(chooseInterviewPosition(undefined));
      dispatch(setCandidatesIsLoading(false));
    })();
  }, [dispatch, currentCandidate]);

  const classes = useStyles();
  const isMobile = useIsMobile();
  const history = useHistory();

  const handleChange = async (
    pagination: TablePaginationConfig,
    filters: any,
    sorter: SorterResult<ICandidateTable> | SorterResult<ICandidateTable>[],
  ) => {
    dispatch(setCandidatesCurrentPage(pagination.current || 1));
    dispatch(setCandidatesPageSize(pagination.pageSize || defaultPageSize));
    await dispatch(
      loadCandidates({
        page: pagination.current,
        limit: pagination.pageSize,
        ...(isArray(sorter)
          ? {}
          : {
              sorter: { order: sorter.order, field: sorter.field as string },
            }),
      }),
    );
  };

  const renderActions = (record: ICandidateTable) => {
    return (
      <Space>
        <Button
          type="primary"
          onClick={() =>
            history.push(
              generatePath(paths.interview, {
                candidateId: record.id || '',
              }),
            )
          }
          icon={<DiffOutlined />}
        />
        <Button type="primary" onClick={() => false} icon={<EditOutlined />} />
      </Space>
    );
  };

  const renderMobileCandidateCard = (record: ICandidateTable) => {
    return <CandidateShortCard record={record} />;
  };

  const paginationObj = {
    pageSize,
    total: totalItems,
    current: currentPage,
    showTotal: (total: number) => `Total ${total} candidates`,
  };

  const expandableParams = isMobile
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
                history.push(
                  generatePath(paths.candidate, {
                    id: record.id || '',
                  }),
                );
              },
            }
          : {}),
      };
    },
    [editAction, history],
  );

  return (
    <ComponentLoader isLoading={isLoading} loaderStatus={GET_CANDIDATES}>
      <Table
        rowKey={'id'}
        size="small"
        onRow={handleRowClick}
        dataSource={candidates}
        expandable={expandableParams}
        pagination={paginationObj}
        loading={isLoading}
        onChange={handleChange}
      >
        <Column
          title={CANDIDATES.FULLNAME}
          dataIndex={CANDIDATE_TABLE_KEYS.fullName}
          key={CANDIDATE_TABLE_KEYS.fullName}
          sorter
        />
        <Column
          title={CANDIDATES.POSITION}
          dataIndex={CANDIDATE_TABLE_KEYS.position}
          key={CANDIDATE_TABLE_KEYS.position}
          sorter
        />
        <Column
          className={classes.displayNoneMobile}
          title={CANDIDATES.LEVEL}
          dataIndex={CANDIDATE_TABLE_KEYS.level}
          key={CANDIDATE_TABLE_KEYS.level}
          sorter
        />
        <Column
          className={classes.displayNoneMobile}
          title={CANDIDATES.LOCATION}
          dataIndex={CANDIDATE_TABLE_KEYS.location}
          key={CANDIDATE_TABLE_KEYS.location}
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
    </ComponentLoader>
  );
};
