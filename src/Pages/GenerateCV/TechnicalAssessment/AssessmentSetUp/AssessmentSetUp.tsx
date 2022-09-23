import { useEffect, useMemo, useState } from 'react';
import { generatePath, useParams } from 'react-router-dom';

import { Spin } from 'antd';

import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { employeesSelector, loadEmployee } from 'store/reducers/employees';
import { positionsSelector, loadPositions, loadSkillMatrix } from 'store/reducers/positions';
import { levelsSelector, loadLevels } from 'store/reducers/levels';
import { loadInterviewMatrix } from 'store/reducers/interview';
import { getTechAssessment, techAssessmentSelector } from 'store/reducers/techAssessment';

import paths from 'config/routes.json';

import { AssessmentForm } from './components/AssessmentForm.tsx';
import { EmployeeHeader } from 'Pages/GenerateCV/common-components/EmployeeHeader';
import { AssessmentPositions } from './components/AssessmentPositions';

export const AssessmentSetUp = () => {
  const dispatch = useAppDispatch();

  const { id, levelId, positionId, assessmentId } = useParams<{
    id: string;
    levelId: string;
    positionId: string;
    assessmentId: string;
  }>();

  const [position, setPosition] = useState('');
  const [level, setLevel] = useState('');

  const { currentEmployee } = useSelector(employeesSelector);
  const { allPositions, skillMatrix, positionsLoading } = useSelector(positionsSelector);
  const { allLevels, levelsSchema, levelsLoading } = useSelector(levelsSelector);
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
      fullName: currentEmployee.fullName,
      location: currentEmployee.location,
      position: currentEmployee.position,
      level: currentEmployee.level,
    };
  }, [currentEmployee]);

  const backPath = generatePath(paths.generateCVtechnicalAssessmentHistory, { id });

  const currentPosition = useMemo(
    () => allPositions.filter((el) => el.id === positionId)[0],
    [allPositions, positionId]
  );
  const currentLevel = useMemo(() => allLevels.filter((el) => el.id === levelId)[0], [allLevels, levelId]);

  if (isLoading || levelsLoading || positionsLoading) return <Spin size="large" tip={'Loading page content...'} />;

  return (
    <>
      <EmployeeHeader personalData={personalData} backPath={backPath} />
      <AssessmentPositions
        position={currentPosition || assessmentResult?.position}
        level={currentLevel || assessmentResult?.level}
      />
      <AssessmentForm
        currentEmployee={currentEmployee}
        allPositions={allPositions}
        allLevels={allLevels}
        levelsSchema={levelsSchema}
        skillMatrix={skillMatrix}
        isLoadingInterviewMatrix={false}
      />
    </>
  );
};
