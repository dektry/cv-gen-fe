import { useEffect, useMemo, useState } from 'react';
import { generatePath, useParams, useLocation } from 'react-router-dom';

import { Spin } from 'antd';

import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { employeesSelector } from 'store/reducers/employees';
import { loadEmployee } from 'store/reducers/employees/thunks';
import { positionsSelector, loadPositions } from 'store/reducers/positions';
import { levelsSelector, loadLevels } from 'store/reducers/levels';
import { techAssessmentSelector } from 'store/reducers/techAssessment';
import { hardSkillsMatrixSelector } from 'store/reducers/hardSkillsMatrix';
import { getAllHardSkillsMatrix, getOneHardSkillsMatrix } from 'store/reducers/hardSkillsMatrix/thunks';

import paths from 'config/routes.json';

import { AssessmentForm } from './components/AssessmentForm.tsx';
import { EmployeeHeader } from 'Pages/GenerateCV/common-components/EmployeeHeader';
import { Typography } from '@mui/material';

import { IDBLevels, IDBPosition } from 'models/IUser';
import { IHardSkillsMatrix } from 'models/IHardSkillsMatrix';

import { useStyles } from './styles';
import theme from 'theme/theme';

export const AssessmentSetUp = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const classes = useStyles({ theme });

  const { id, levelId, positionId, assessmentId } = useParams<{
    id: string;
    levelId: string;
    positionId: string;
    assessmentId: string;
  }>();

  const { currentEmployee } = useSelector(employeesSelector);
  const { allPositions, positionsLoading } = useSelector(positionsSelector);
  const { allLevels, levelsLoading } = useSelector(levelsSelector);
  const { assessmentResult, isLoading } = useSelector(techAssessmentSelector);
  const { matrix } = useSelector(hardSkillsMatrixSelector);

  const [position, setPosition] = useState<IDBPosition>({} as IDBPosition);
  const [level, setLevel] = useState<IDBLevels>({} as IDBLevels);

  useEffect(() => {
    dispatch(getAllHardSkillsMatrix());

    if (matrix.length && position.name) {
      const matrixId = (matrix.find((el) => el.position.name === position.name) as IHardSkillsMatrix).id;
      dispatch(getOneHardSkillsMatrix(matrixId || ''));
    }
  }, [position]);

  useEffect(() => {
    if (allPositions.length && allLevels.length) {
      const currentPosition = allPositions.find((el) => el.id === positionId) as IDBPosition;
      const currentLevel = allLevels.find((el) => el.id === levelId) as IDBLevels;

      setPosition(currentPosition);
      setLevel(currentLevel);
    }
  }, [allPositions.length, allLevels.length]);

  useEffect(() => {
    if (assessmentResult && assessmentResult.position.id && assessmentResult.level.id) {
      setPosition(assessmentResult.position);
      setLevel(assessmentResult.level);
    }
  }, [assessmentResult]);

  useEffect(() => {
    if (id) {
      dispatch(loadEmployee(id));
      dispatch(loadPositions());
      dispatch(loadLevels());
    }
  }, [id, level, position, assessmentId]);

  const personalData = useMemo(() => {
    return {
      firstName: currentEmployee.firstName,
      lastName: currentEmployee.lastName,
      location: currentEmployee.location,
      position: currentEmployee.position,
      level: currentEmployee.level,
    };
  }, [currentEmployee]);

  const backPath = generatePath(paths.technicalAssessmentHistory, { id });

  if (isLoading || positionsLoading || levelsLoading) return <Spin size="large" tip={'Loading page content...'} />;

  const interviewDate = location.pathname.includes('new-interview') ? new Date().toLocaleDateString('en-GB') : '';

  return (
    <>
      <EmployeeHeader personalData={personalData} backPath={backPath} />
      <div className={classes.upperContainer}>
        <Typography variant="h3">TECHNICAL ASSESSMENT {interviewDate}</Typography>
        <div className={classes.positionsContainer}>
          <div className={classes.positionLevelContainer}>
            <Typography variant="h3">Position: </Typography>
            {position?.name && (
              <Typography variant="h5" className={classes.tag}>
                {position?.name}
              </Typography>
            )}
          </div>
          <div className={classes.positionLevelContainer}>
            <Typography variant="h3">Level: </Typography>
            {level?.name && (
              <Typography variant="h5" className={classes.tag}>
                {level?.name}
              </Typography>
            )}
          </div>
        </div>
      </div>
      <AssessmentForm />
    </>
  );
};
