import { useEffect, useCallback } from 'react';
import { useParams, useNavigate, generatePath } from 'react-router-dom';

import { Spin } from 'antd';

import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { loadTechAssessments, techAssessmentSelector } from 'store/reducers/techAssessment';
import { employeesSelector, loadEmployee } from 'store/reducers/employees';

import { ITableParams } from 'models/ICommon';
import { IAssessmentFromDB } from 'models/ITechAssessment';

import { EmployeeHeader } from 'Pages/GenerateCV/common-components/EmployeeHeader';
import { TableComponent as Table } from 'common-components/Table';

import paths from 'config/routes.json';
import { ASSESSMENT_HISTORY_TABLE_KEYS, ASSESSMENT } from './utils/constants';

export const AssessmentHistory = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { assessments, isLoading, pageSize, currentPage } = useSelector(techAssessmentSelector);
  const { currentEmployee: { fullName, position, level, location }} = useSelector(employeesSelector);

  useEffect(() => {
    if (id) {
      dispatch(loadTechAssessments(id));
      dispatch(loadEmployee(id));
    }
  }, [id]);


const paginationObj = {
  pageSize,
  total: assessments.length,
  current: currentPage,
  showTotal: (total: number) => `Total ${total} technical assessments passed`,
};

const createPath = (record: IAssessmentFromDB) => {
  navigate(
    generatePath(paths.generateCVtechnicalAssessmentHistory, {
      id: record.id || ''
    })
  );
};

const handleRowClick = useCallback(
  (record: IAssessmentFromDB) => {
    return {
      onClick: () => createPath(record),
    };
  },
  [history]
);

  const params: ITableParams<IAssessmentFromDB> = {
    entity: ASSESSMENT,
    tableKeys: ASSESSMENT_HISTORY_TABLE_KEYS,
    dataSource: assessments,
    handleRowClick,
    paginationObj,
    loading: isLoading,
  };

  if (isLoading) return <Spin size="large" tip={'Loading technical assessment...'} />;

  const personalData = { fullName, location, position, level };

  return (
    <>
      <EmployeeHeader
        personalData={personalData}
        backPath={paths.generateCVemployeesList} 
      />
      <Table params={params} />
    </>
  )
}