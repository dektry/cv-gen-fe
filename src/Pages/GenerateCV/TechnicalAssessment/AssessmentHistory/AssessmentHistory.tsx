import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, generatePath, Link } from 'react-router-dom';

import { message } from 'antd';
import Typography from '@mui/material/Typography';

import CircularProgress from '@mui/material/CircularProgress';

import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { techAssessmentSelector, setTechAssessments } from 'store/reducers/techAssessment';
import {
  loadTechAssessments,
  getTechAssessmentResults,
  deleteTechAssessment,
} from 'store/reducers/techAssessment/thunks';
import { employeesSelector, setChosenEmployee } from 'store/reducers/employees';
import { loadEmployee } from 'store/reducers/employees/thunks';
import { levelsSelector, loadLevels, chooseLevel } from 'store/reducers/levels';
import { getAllHardSkillsMatrix } from 'store/reducers/hardSkillsMatrix/thunks';
import { hardSkillsMatrixSelector } from 'store/reducers/hardSkillsMatrix';
import { choosePosition, positionsSelector } from 'store/reducers/positions';

import { EmployeeHeader } from 'Pages/GenerateCV/common-components/EmployeeHeader';
import { StartInterviewButton } from 'Pages/GenerateCV/common-components/StartInterviewButton';
import { PositionsLevelsModal } from 'Pages/GenerateCV/common-components/PositionsLevelsModal';
import { HistoryTable } from 'common-components/HistoryTable';

import paths from 'config/routes.json';
import { defaultEmployee } from 'store/constants';
import { IDBLevels, IDBPosition } from 'models/IUser';

import { useStyles } from './styles';
import theme from 'theme/theme';
import { IFormHardSkillsMatrix, IHardSkillsMatrix } from 'models/IHardSkillsMatrix';

export const AssessmentHistory = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [isOpen, setIsOpen] = useState(false);
  const [currentMatrix, setCurrentMatrix] = useState<IFormHardSkillsMatrix>({} as IFormHardSkillsMatrix);

  const classes = useStyles({ theme });

  const { assessmentsHistory, isHistoryLoading, assessmentShortResult, isLoading } =
    useSelector(techAssessmentSelector);
  const {
    currentEmployee: { firstName, lastName, position, level, location },
  } = useSelector(employeesSelector);
  const { allLevels, levelsLoading, chosenLevel } = useSelector(levelsSelector);
  const { chosenPosition } = useSelector(positionsSelector);
  const { hardSkillMatrixLoading, matrix } = useSelector(hardSkillsMatrixSelector);

  useEffect(() => {
    if (id) {
      dispatch(loadTechAssessments(id));
      dispatch(loadEmployee(id));
      if (!matrix.length) {
        dispatch(getAllHardSkillsMatrix());
      }
    }
  }, []);

  useEffect(() => {
    return function clear() {
      dispatch(setChosenEmployee(defaultEmployee));
    };
  }, []);

  const handleClick = () => {
    setIsOpen(true);
    if (!allLevels.length) {
      dispatch(loadLevels());
    }
  };

  const handleSubmit = () => {
    if (chosenLevel && chosenPosition && currentMatrix.id) {
      navigate(
        generatePath(paths.technicalAssessment, {
          id: id,
          positionId: chosenPosition.id,
          levelId: chosenLevel.id,
          matrixId: currentMatrix.id,
        })
      );
    } else {
      message.warn('You should choose level and position');
    }
  };

  const handleCloseModal = () => {
    setInterviewLevel({} as IDBLevels);
    setInterviewPosition({} as IDBPosition);
    setIsOpen(false);
  };

  const personalData = { firstName, lastName, location, position, level };
  const allPositions = useMemo(() => matrix.map((el) => el.position), [matrix]);
  const state = {
    positions: allPositions,
    levels: allLevels,
    currentLevel: chosenLevel,
    currentPosition: chosenPosition,
  };

  const setInterviewLevel = (level: IDBLevels) => {
    dispatch(chooseLevel(level));
  };

  const setInterviewPosition = (position: IDBPosition) => {
    dispatch(choosePosition(position));
    const foundMatrix = matrix.find((el) => el.position.id === position.id) as IHardSkillsMatrix;
    setCurrentMatrix(foundMatrix);
  };

  const handleRowClick = (assessmentId: string) => {
    navigate(generatePath(paths.prevTechnicalAssessment, { id, assessmentId }));
  };

  useEffect(() => {
    return function clear() {
      dispatch(setTechAssessments([]));
      setCurrentMatrix({} as IFormHardSkillsMatrix);
    };
  }, []);

  if (isHistoryLoading || levelsLoading) return <CircularProgress sx={{ margin: 'auto' }} />;

  return (
    <>
      <EmployeeHeader personalData={personalData} backPath={paths.employeesList} />
      <StartInterviewButton text="Start technical assessment" handleClick={handleClick} />
      {assessmentsHistory.length ? (
        <>
          <div className={classes.midContainer}>
            <Typography variant="h2" sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
              Technical assessment history
            </Typography>
            <Link className={classes.link} to={generatePath(paths.techAssessmentsComparison, { id })}>
              Show comparison
            </Link>
          </div>
          <HistoryTable
            handleRowClick={handleRowClick}
            assessments={assessmentsHistory}
            getAssessment={getTechAssessmentResults}
            assessmentShortResult={assessmentShortResult}
            isLoading={isLoading}
            deleteAssessment={deleteTechAssessment}
          />
        </>
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
