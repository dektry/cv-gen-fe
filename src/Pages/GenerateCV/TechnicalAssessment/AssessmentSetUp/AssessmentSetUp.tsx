import { useEffect, useMemo, useState } from 'react';
import { generatePath, useParams, useLocation } from 'react-router-dom';

import { Spin } from 'antd';

import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { employeesSelector } from 'store/reducers/employees';
import { loadEmployee } from 'store/reducers/employees/thunks';
import { positionsSelector, loadPositions } from 'store/reducers/positions';
import { levelsSelector, loadLevels } from 'store/reducers/levels';
import { getTechAssessment, techAssessmentSelector } from 'store/reducers/techAssessment';
import { getOneHardSkillsMatrix } from 'store/reducers/hardSkillsMatrix/thunks';

import paths from 'config/routes.json';

import { AssessmentForm } from './components/AssessmentForm.tsx';
import { EmployeeHeader } from 'Pages/GenerateCV/common-components/EmployeeHeader';
import { Typography } from '@mui/material';

import { DatePositionLevelInfo } from 'common-components/DatePositionLevelInfo';

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
  const { allPositions, positionsLoading } = useSelector(positionsSelector);
  const { allLevels, levelsLoading } = useSelector(levelsSelector);
  const { assessmentResult, isLoading } = useSelector(techAssessmentSelector);

  const [position, setPosition] = useState<IDBPosition>({} as IDBPosition);
  const [level, setLevel] = useState<IDBLevels>({} as IDBLevels);

  useEffect(() => {
    if (matrixId) {
      dispatch(getOneHardSkillsMatrix(matrixId));
    }
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(loadEmployee(id));
      dispatch(loadPositions());
      dispatch(loadLevels());
    }

    if (assessmentId) {
      dispatch(getTechAssessment(assessmentId));
    }
  }, []);

  useEffect(() => {
    if (positionId && levelId) {
      const currentPosition = allPositions.find((el) => el.id === positionId) as IDBPosition;
      const currentLevel = allLevels.find((el) => el.id === levelId) as IDBLevels;

      setPosition(currentPosition);
      setLevel(currentLevel);
    }

    if (assessmentResult && assessmentResult.position && assessmentResult.level) {
      const currentPosition = allPositions.find((el) => el.name === assessmentResult.position) as IDBPosition;
      const currentLevel = allLevels.find((el) => el.name === assessmentResult.level) as IDBLevels;

      setPosition(currentPosition);
      setLevel(currentLevel);
    }
  }, [assessmentResult, allPositions.length, allLevels.length]);

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

  return (
    <>
      <EmployeeHeader personalData={personalData} backPath={backPath} />
      <DatePositionLevelInfo title={'TECHNICAL ASSESSMENT'} position={position.name} level={level.name} />
      <AssessmentForm />
    </>
  );
};
