import { useEffect, useCallback, useState } from 'react';
import { useParams, useNavigate, generatePath } from 'react-router-dom';

import { message, Spin } from 'antd';

import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import {
  softSkillInterviewSelector,
  chooseInterviewLevel,
  chooseInterviewPosition,
} from 'store/reducers/softSkillAssessment';
import { getAllSoftSkillAssessments } from 'store/reducers/softSkillAssessment/thunks';
import { employeesSelector, loadEmployee, setChosenEmployee } from 'store/reducers/employees';
import { positionsSelector, loadPositions } from 'store/reducers/positions';
import { levelsSelector, loadLevels } from 'store/reducers/levels';

import { ITableParams } from 'models/ICommon';
import { ISoftAssessment } from 'models/ISoftAssessment';

import { EmployeeHeader } from 'Pages/GenerateCV/common-components/EmployeeHeader';
import { TableComponent as Table } from 'common-components/Table';
import { StartInterviewButton } from 'Pages/GenerateCV/common-components/StartInterviewButton';
import { InterviewModal } from 'Pages/GenerateCV/common-components/InterviewModal';

import paths from 'config/routes.json';
import { ASSESSMENT_HISTORY_TABLE_KEYS, ASSESSMENT } from './utils/constants';
import { defaultEmployee } from 'store/constants';

export const SoftAssessmentHistory = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [isOpen, setIsOpen] = useState(false);

  const { assessments, isLoading, pageSize, currentPage, chosenLevel, chosenPosition } =
    useSelector(softSkillInterviewSelector);
  const {
    currentEmployee: { fullName, position, level, location },
  } = useSelector(employeesSelector);
  const { allPositions, positionsLoading } = useSelector(positionsSelector);
  const { allLevels, levelsLoading } = useSelector(levelsSelector);

  useEffect(() => {
    if (id) {
      dispatch(getAllSoftSkillAssessments(id));
      dispatch(loadEmployee(id));
    }
  }, [id]);

  useEffect(() => {
    return function clear() {
      dispatch(setChosenEmployee(defaultEmployee));
    };
  }, []);

  const paginationObj = {
    pageSize,
    total: assessments.length,
    current: currentPage,
    showTotal: (total: number) => `Total ${total} soft skills assessments passed`,
  };

  const createPath = (record: ISoftAssessment) => {
    navigate(
      generatePath(paths.generateCVprevSoftSkillsAssessment, {
        id: id || '',
        assessmentId: record.id,
      })
    );
  };

  const handleRowClick = useCallback(
    (record: ISoftAssessment) => {
      return {
        onClick: () => createPath(record),
      };
    },
    [history]
  );

  const params: ITableParams<ISoftAssessment> = {
    entity: ASSESSMENT,
    tableKeys: ASSESSMENT_HISTORY_TABLE_KEYS,
    dataSource: assessments,
    handleRowClick,
    paginationObj,
    loading: isLoading,
  };

  const handleClick = () => {
    setIsOpen(true);
    dispatch(loadPositions());
    dispatch(loadLevels());
  };

  const handleSubmit = () => {
    if (chosenLevel && chosenPosition) {
      navigate(
        generatePath(paths.generateCVsoftAssessment, { id: id, positionId: chosenPosition, levelId: chosenLevel })
      );
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

  const personalData = { fullName, location, position, level };
  const state = { positions: allPositions, levels: allLevels };

  if (isLoading) return <Spin size="large" tip={'Loading soft skill assessment...'} />;

  return (
    <>
      <EmployeeHeader personalData={personalData} backPath={paths.generateCVemployeesList} />
      <StartInterviewButton text="Start soft skills assessment" handleClick={handleClick} />
      {assessments.length ? <Table params={params} /> : <div>soft skill assessments not found</div>}
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
