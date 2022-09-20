import { useEffect } from 'react';
import { generatePath, useParams } from 'react-router-dom';


import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { employeesSelector, loadEmployee } from 'store/reducers/employees';
import { positionsSelector, loadPositions } from 'store/reducers/positions';
import { levelsSelector, loadLevels } from 'store/reducers/levels';

import paths from 'config/routes.json';

import { AssessmentForm } from './components/AssessmentForm.tsx';
import { EmployeeHeader } from 'Pages/GenerateCV/common-components/EmployeeHeader';
import { AssessmentPositions } from './components/AssessmentPositions';

export const AssessmentSetUp = () => {
  const dispatch = useAppDispatch();
  
  const { id, positionId, levelId } = useParams<{ id: string, positionId: string, levelId: string }>();
  
  useEffect(() => {
    if (id) {
      dispatch(loadEmployee(id))
      dispatch(loadPositions());
      dispatch(loadLevels());
    }
  
  }, [id])
  
  const { currentEmployee } = useSelector(employeesSelector);
  const { allPositions, skillMatrix } = useSelector(positionsSelector);
  const { allLevels, levelsSchema } = useSelector(levelsSelector);

  const personalData = { 
    fullName: currentEmployee.fullName, 
    location: currentEmployee.location, 
    position: currentEmployee.position, 
    level: currentEmployee.level 
  };

  const backPath = generatePath(paths.generateCVtechnicalAssessmentHistory, { id });

  const currentPosition = allPositions.filter(el => el.id === positionId)[0];
  const currentLevel = allLevels.filter(el => el.id === levelId)[0];
  
  return (
    <>
      <EmployeeHeader 
        personalData={personalData}
        backPath={backPath}
      />
      <AssessmentPositions 
        position={currentPosition}
        level={currentLevel}
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
}