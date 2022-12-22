import { useEffect, useState } from 'react';
import { useParams, useNavigate, generatePath, Link } from 'react-router-dom';

import { message, Spin } from 'antd';

import Typography from '@mui/material/Typography';

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

import { EmployeeHeader } from 'Pages/GenerateCV/common-components/EmployeeHeader';
import { StartInterviewButton } from 'Pages/GenerateCV/common-components/StartInterviewButton';
import { InterviewModal } from 'Pages/GenerateCV/common-components/InterviewModal';

import paths from 'config/routes.json';
import { defaultEmployee } from 'store/constants';
import { HistoryTable } from 'common-components/HistoryTable';

import { useStyles } from './styles';
import theme from 'theme/theme';

export const AssessmentHistory = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const classes = useStyles({ theme });

  const [isOpen, setIsOpen] = useState(false);

  const { isLoading, chosenLevel, chosenPosition, assessmentsHistory } = useSelector(techAssessmentSelector);
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
      <div className={classes.midContainer}>
        <Typography variant="h2">TECHNICAL ASSESSMENTS HISTORY</Typography>
        <Link className={classes.link} to="/">
          Show comparison
        </Link>
      </div>
      {assessmentsHistory.length ? (
        <HistoryTable assessments={assessmentsHistory} />
      ) : (
        <div>Technical assessments not found</div>
      )}
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
