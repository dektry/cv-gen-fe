import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, generatePath, Link } from 'react-router-dom';

import { message } from 'antd';
import Typography from '@mui/material/Typography';

import CircularProgress from '@mui/material/CircularProgress';

import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { employeesSelector, setChosenEmployee } from 'store/reducers/employees';
import { loadEmployee } from 'store/reducers/employees/thunks';
import { levelsSelector, loadLevels, chooseLevel } from 'store/reducers/levels';
import { getAllSoftSkillsMatrix } from 'store/reducers/softSkillsMatrix/thunks';
import { softSkillsMatrixSelector } from 'store/reducers/softSkillsMatrix';
import { softSkillAssessmentSelector, setSoftAssessmentList } from 'store/reducers/softSkillAssessment';
import {
  getAllSoftSkillAssessments,
  deleteSoftAssessment,
  getSoftAssessmentResults,
} from 'store/reducers/softSkillAssessment/thunks';
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
import { IFormSoftSkillsMatrix, ISoftSkillsMatrix } from 'models/ISoftSkillsMatrix';

export const SoftAssessmentHistory = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [isOpen, setIsOpen] = useState(false);
  const [currentMatrix, setCurrentMatrix] = useState<IFormSoftSkillsMatrix>({} as IFormSoftSkillsMatrix);

  const classes = useStyles({ theme });

  const { assessmentsHistory, isHistoryLoading, assessmentShortResult, isLoading } =
    useSelector(softSkillAssessmentSelector);
  const {
    currentEmployee: { firstName, lastName, position, level, location },
  } = useSelector(employeesSelector);
  const { allLevels, levelsLoading, chosenLevel } = useSelector(levelsSelector);
  const { chosenPosition } = useSelector(positionsSelector);
  const { softSkillMatrixLoading, matrix } = useSelector(softSkillsMatrixSelector);

  useEffect(() => {
    if (id) {
      dispatch(getAllSoftSkillAssessments(id));
      dispatch(loadEmployee(id));
      if (!matrix.length) {
        dispatch(getAllSoftSkillsMatrix());
      }
    }
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
    const foundMatrix = matrix.find((el) => el.position.id === position.id) as ISoftSkillsMatrix;
    setCurrentMatrix(foundMatrix);
  };

  const handleRowClick = (assessmentId: string) => {
    navigate(generatePath(paths.prevTechnicalAssessment, { id, assessmentId }));
  };

  useEffect(() => {
    return function clear() {
      dispatch(setSoftAssessmentList([]));
      setCurrentMatrix({} as IFormSoftSkillsMatrix);
      dispatch(setChosenEmployee(defaultEmployee));
    };
  }, []);

  if (isHistoryLoading || levelsLoading) return <CircularProgress sx={{ margin: 'auto' }} />;

  return (
    <>
      <EmployeeHeader personalData={personalData} backPath={paths.employeesList} />
      <StartInterviewButton text="Start soft skills assessment" handleClick={handleClick} />
      {assessmentsHistory.length ? (
        <>
          <div className={classes.midContainer}>
            <Typography variant="h2" sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
              Soft skills assessment history
            </Typography>
            <Link className={classes.link} to={generatePath(paths.softSkillAssessmentHistory, { id })}>
              Show comparison
            </Link>
          </div>
          <HistoryTable
            handleRowClick={handleRowClick}
            assessments={assessmentsHistory}
            getAssessment={getSoftAssessmentResults}
            assessmentShortResult={assessmentShortResult}
            isLoading={isLoading}
            deleteAssessment={deleteSoftAssessment}
            resultsModalTitle={'SOFT ASSESSMENT'}
          />
        </>
      ) : (
        <div>Soft skills assessments not found</div>
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
        isLoading={softSkillMatrixLoading && levelsLoading}
      />
    </>
  );
};
