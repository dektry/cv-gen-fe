import { useEffect, useMemo, useState } from 'react';
import { generatePath, useParams } from 'react-router-dom';

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

import { DatePositionLevelInfo } from 'common-components/DatePositionLevelInfo';

import { IDBLevels, IDBPosition } from 'models/IUser';

export const AssessmentSetUp = () => {
  const dispatch = useAppDispatch();

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

    if (!allLevels.length && !assessmentId) {
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
  }, [assessmentResult, allLevels.length, currentMatrix]);

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

  return (
    <>
      <EmployeeHeader personalData={personalData} backPath={backPath} />
      <DatePositionLevelInfo
        title={'TECHNICAL ASSESSMENT'}
        date={assessmentResult?.created}
        position={position?.name}
        level={level?.name}
      />
      <AssessmentForm />
    </>
  );
};
