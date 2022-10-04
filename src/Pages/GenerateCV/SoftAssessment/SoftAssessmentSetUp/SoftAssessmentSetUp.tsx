import { useEffect, useMemo, useState } from 'react';
import { generatePath, useParams } from 'react-router-dom';

import { Spin } from 'antd';

import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { employeesSelector, loadEmployee } from 'store/reducers/employees';
import { softSkillAssessmentSelector } from 'store/reducers/softSkillAssessment';
import { getOneSoftAssessment } from 'store/reducers/softSkillAssessment/thunks';
import { positionsSelector, loadPositions } from 'store/reducers/positions';
import { levelsSelector, loadLevels } from 'store/reducers/levels';

import paths from 'config/routes.json';

import { EmployeeHeader } from 'Pages/GenerateCV/common-components/EmployeeHeader';
import { AssessmentPositions } from 'Pages/GenerateCV/common-components/AssessmentPositions';

export const SoftAssessmentSetUp = () => {
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
  const { allPositions, positionsLoading } = useSelector(positionsSelector);
  const { allLevels, levelsLoading } = useSelector(levelsSelector);
  const { assessmentResult, isLoading } = useSelector(softSkillAssessmentSelector);

  useEffect(() => {
    if (positionId && levelId) {
      setPosition(positionId);
      setLevel(levelId);
    }

    if (assessmentResult?.position?.id && assessmentResult?.level?.id) {
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

    if (assessmentId) {
      dispatch(getOneSoftAssessment(assessmentId));
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

  const backPath = generatePath(paths.generateCVsoftSkillAssessmentHistory, { id });

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
    </>
  );
};
