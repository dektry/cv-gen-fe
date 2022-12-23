import { useEffect, useState, useMemo } from 'react';
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
import { levelsSelector, loadLevels } from 'store/reducers/levels';
import { getAllHardSkillsMatrix } from 'store/reducers/hardSkillsMatrix/thunks';
import { hardSkillsMatrixSelector } from 'store/reducers/hardSkillsMatrix';

import { EmployeeHeader } from 'Pages/GenerateCV/common-components/EmployeeHeader';
import { StartInterviewButton } from 'Pages/GenerateCV/common-components/StartInterviewButton';
import { PositionsLevelsModal } from 'Pages/GenerateCV/common-components/PositionsLevelsModal';
import { HistoryTable } from 'common-components/HistoryTable';

import paths from 'config/routes.json';
import { defaultEmployee } from 'store/constants';

export const AssessmentHistory = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [isOpen, setIsOpen] = useState(false);

  const { assessmentsHistory, isLoading, chosenLevel, chosenPosition } = useSelector(techAssessmentSelector);
  const {
    currentEmployee: { firstName, lastName, position, level, location },
  } = useSelector(employeesSelector);
  const { allLevels, levelsLoading } = useSelector(levelsSelector);
  const { hardSkillMatrixLoading, matrix } = useSelector(hardSkillsMatrixSelector);

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

  const handleClick = () => {
    setIsOpen(true);
    dispatch(getAllHardSkillsMatrix());
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
  const allPositions = useMemo(() => matrix.map((el) => el.position), [matrix]);
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
      {assessmentsHistory.length ? (
        <HistoryTable assessments={assessmentsHistory} />
      ) : (
        <div>Technical assessments not found</div>
      )}
      <PositionsLevelsModal
        isOpen={isOpen}
        modalTitle="LEVEL & POSITION"
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        state={state}
        personalData={personalData}
        setCurrentLevel={setInterviewLevel}
        setCurrentPosition={setInterviewPosition}
        isLoading={hardSkillMatrixLoading && levelsLoading}
      />
    </>
  );
};
