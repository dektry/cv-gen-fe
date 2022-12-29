import { useEffect, useMemo, useState } from 'react';
import { generatePath, useParams, useLocation } from 'react-router-dom';

import { Spin } from 'antd';

import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { employeesSelector } from 'store/reducers/employees';
import { loadEmployee } from 'store/reducers/employees/thunks';
import { levelsSelector, loadLevels } from 'store/reducers/levels';
import { getTechAssessment, techAssessmentSelector } from 'store/reducers/techAssessment';
import { hardSkillsMatrixSelector, setIsAssessmentPage } from 'store/reducers/hardSkillsMatrix';
import { getOneHardSkillsMatrix } from 'store/reducers/hardSkillsMatrix/thunks';

import paths from 'config/routes.json';

import { AssessmentForm } from './components/AssessmentForm.tsx';
import { EmployeeHeader } from 'Pages/GenerateCV/common-components/EmployeeHeader';
import { Typography } from '@mui/material';

import { IDBLevels, IDBPosition } from 'models/IUser';

import { useStyles } from './styles';
import theme from 'theme/theme';

export const AssessmentSetUp = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const classes = useStyles({ theme });

  const { id, levelId, positionId, assessmentId, matrixId } = useParams<{
    id: string;
    levelId: string;
    positionId: string;
    assessmentId: string;
    matrixId: string;
  }>();

  const { currentEmployee } = useSelector(employeesSelector);
  const { allLevels, levelsLoading } = useSelector(levelsSelector);
  const { assessmentResult, isLoading } = useSelector(techAssessmentSelector);
  const { currentMatrix } = useSelector(hardSkillsMatrixSelector);

  const [position, setPosition] = useState<IDBPosition>({} as IDBPosition);
  const [level, setLevel] = useState<IDBLevels>({} as IDBLevels);

  useEffect(() => {
    if (matrixId) {
      dispatch(getOneHardSkillsMatrix(matrixId));
    }
    dispatch(setIsAssessmentPage(true));
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(loadEmployee(id));
    }

    if (!allLevels.length) {
      dispatch(loadLevels());
    }

    if (assessmentId) {
      dispatch(getTechAssessment(assessmentId));
    }
  }, []);

  useEffect(() => {
    if (positionId && currentMatrix) {
      const currentLevel = allLevels.find((el) => el.id === levelId) as IDBLevels;

      setPosition(currentMatrix.position as IDBPosition);
      setLevel(currentLevel);
    }

    if (assessmentResult && assessmentResult.position && assessmentResult.level) {
      setPosition(assessmentResult.position);
      setLevel(assessmentResult.level);
    }
  }, [assessmentResult, allLevels.length]);

  useEffect(() => {
    return () => {
      dispatch(setIsAssessmentPage(false));
    };
  }, []);

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

  if (isLoading || levelsLoading) return <Spin size="large" tip={'Loading page content...'} />;

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
