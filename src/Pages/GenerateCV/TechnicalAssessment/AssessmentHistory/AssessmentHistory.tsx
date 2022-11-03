import { useEffect, useCallback, useState, useMemo } from 'react';
import { useParams, useNavigate, generatePath } from 'react-router-dom';

import { message, Spin } from 'antd';

import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import {
  loadTechAssessments,
  techAssessmentSelector,
  chooseInterviewLevel,
  chooseInterviewPosition,
  setTechAssessments,
} from 'store/reducers/techAssessment';
import { employeesSelector, setChosenEmployee } from 'store/reducers/employees';
import { loadEmployee } from 'store/reducers/employees/thunks';
import { positionsSelector, loadPositions } from 'store/reducers/positions';
import { levelsSelector, loadLevels } from 'store/reducers/levels';

import { ITableParams } from 'models/ICommon';
import { IAssessmentFromDB } from 'models/ITechAssessment';

import { EmployeeHeader } from 'Pages/GenerateCV/common-components/EmployeeHeader';
import { TableComponent as Table } from 'common-components/Table';
import { StartInterviewButton } from 'Pages/GenerateCV/common-components/StartInterviewButton';
import { InterviewModal } from 'Pages/GenerateCV/common-components/InterviewModal';

import paths from 'config/routes.json';
import { ASSESSMENT_HISTORY_TABLE_KEYS, ASSESSMENT } from './utils/constants';
import { defaultEmployee } from 'store/constants';

export const AssessmentHistory = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [isOpen, setIsOpen] = useState(false);

  const { assessments, isLoading, pageSize, currentPage, chosenLevel, chosenPosition } =
    useSelector(techAssessmentSelector);
  const {
    currentEmployee: { firstName, lastName, position, level, location },
  } = useSelector(employeesSelector);
  const { allPositions, positionsLoading } = useSelector(positionsSelector);
  const { allLevels, levelsLoading } = useSelector(levelsSelector);

  useEffect(() => {
    if (id) {
      dispatch(loadTechAssessments(id));
      dispatch(loadEmployee(id));
    }
  }, []);

  useEffect(() => {
    return function clear() {
      dispatch(setChosenEmployee(defaultEmployee));
    };
  }, []);

  const paginationObj = useMemo(() => {
    return {
      pageSize,
      total: assessments.length,
      current: currentPage,
      showTotal: (total: number) => `Total ${total} technical assessments passed`,
    };
  }, [assessments, currentPage]);

  const createPath = (record: IAssessmentFromDB) => {
    navigate(
      generatePath(paths.prevTechnicalAssessment, {
        id: id || '',
        assessmentId: record.id,
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

  const params: ITableParams<IAssessmentFromDB> = useMemo(() => {
    return {
      entity: ASSESSMENT,
      tableKeys: ASSESSMENT_HISTORY_TABLE_KEYS,
      dataSource: assessments,
      handleRowClick,
      paginationObj,
      loading: isLoading,
    };
  }, [assessments]);

  const handleClick = () => {
    setIsOpen(true);
    dispatch(loadPositions());
    dispatch(loadLevels());
  };

  const handleSubmit = () => {
    if (chosenLevel && chosenPosition) {
      navigate(generatePath(paths.technicalAssessment, { id: id, positionId: chosenPosition, levelId: chosenLevel }));
    } else {
      message.warn('You should choose level and position');
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const setInterviewLevel = (level: string) => {
    dispatch(chooseInterviewLevel(level));
  };

  const setInterviewPosition = (position: string) => {
    dispatch(chooseInterviewPosition(position));
  };

  const personalData = { firstName, lastName, location, position, level };
  const state = { positions: allPositions, levels: allLevels };

  useEffect(() => {
    return function clear() {
      dispatch(setTechAssessments([]));
    };
  }, []);

  if (isLoading) return <Spin size="large" tip={'Loading technical assessment...'} />;

  return (
    <>
      <EmployeeHeader personalData={personalData} backPath={paths.employeesList} />
      <StartInterviewButton text="Start technical assessment" handleClick={handleClick} />
      {assessments.length ? <Table params={params} /> : <div>Technical assessments not found</div>}
      <InterviewModal
        isOpen={isOpen}
        modalTitle="Level & Position"
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        state={state}
        personalData={personalData}
        setCurrentLevel={setInterviewLevel}
        setCurrentPosition={setInterviewPosition}
        isLoading={positionsLoading && levelsLoading}
      />
    </>
  );
};
