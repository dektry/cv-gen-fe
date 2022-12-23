import { useEffect, useMemo, useState } from 'react';
import { generatePath, useParams, useLocation } from 'react-router-dom';

import { Spin } from 'antd';

import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { employeesSelector } from 'store/reducers/employees';
import { loadEmployee } from 'store/reducers/employees/thunks';
import { positionsSelector, loadPositions, loadSkillMatrix } from 'store/reducers/positions';
import { levelsSelector, loadLevels } from 'store/reducers/levels';
import { loadInterviewMatrix } from 'store/reducers/interview';
import { getTechAssessment, techAssessmentSelector } from 'store/reducers/techAssessment';

import paths from 'config/routes.json';

import { AssessmentForm } from './components/AssessmentForm.tsx';
import { EmployeeHeader } from 'Pages/GenerateCV/common-components/EmployeeHeader';
import { Typography } from '@mui/material';

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

  const [position, setPosition] = useState('');
  const [level, setLevel] = useState('');

  const { currentEmployee } = useSelector(employeesSelector);
  const { chosenPosition } = useSelector(positionsSelector);
  const { chosenLevel } = useSelector(levelsSelector);
  const { assessmentResult, isLoading } = useSelector(techAssessmentSelector);

  useEffect(() => {
    if (positionId && levelId) {
      setPosition(positionId);
      setLevel(levelId);
    }

    if (assessmentResult && assessmentResult.position.id && assessmentResult.level.id) {
      setPosition(assessmentResult.position.id);
      setLevel(assessmentResult.level.id);
    }
  }, [positionId, levelId, assessmentResult]);

  useEffect(() => {
    if (id) {
      dispatch(loadEmployee(id));
      dispatch(loadPositions());
      dispatch(loadLevels());
    }

    if (position && level) {
      dispatch(loadInterviewMatrix({ positionId: position, levelId: level }));
      dispatch(loadSkillMatrix(position));
    }

    if (assessmentId) {
      dispatch(getTechAssessment(assessmentId));
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

  if (isLoading) return <Spin size="large" tip={'Loading page content...'} />;

  const interviewDate = location.pathname.includes('new-interview') ? new Date().toLocaleDateString('en-GB') : '';

  return (
    <>
      <EmployeeHeader personalData={personalData} backPath={backPath} />
      <div className={classes.upperContainer}>
        <Typography variant="h3">TECHNICAL ASSESSMENT {interviewDate}</Typography>
        <div className={classes.positionsContainer}>
          <div className={classes.positionLevelContainer}>
            <Typography variant="h3">Position: </Typography>
            <Typography variant="h5" className={classes.tag}>
              {chosenPosition?.name || assessmentResult?.position.name}
            </Typography>
          </div>
          <div className={classes.positionLevelContainer}>
            <Typography variant="h3">Level: </Typography>
            <Typography variant="h5" className={classes.tag}>
              {chosenLevel?.name || assessmentResult?.level.name}
            </Typography>
          </div>
        </div>
      </div>
      <AssessmentForm />
    </>
  );
};
