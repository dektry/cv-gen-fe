import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { employeesSelector, loadEmployee } from 'store/reducers/employees';
import { positionsSelector, loadPositions } from 'store/reducers/positions';
import { levelsSelector, loadLevels } from 'store/reducers/levels';


import { InterviewForm } from 'Pages/GenerateCV/TechnicalInterview/InterviewSetUP/components/InterviewForm';


export const AssessmentSetUp = () => {
  const dispatch = useAppDispatch();
  
  const { id } = useParams<{ id: string }>();
  
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
  
  return (
    <InterviewForm
      currentEmployee={currentEmployee}
      allPositions={allPositions}
      allLevels={allLevels}
      levelsSchema={levelsSchema}
      skillMatrix={skillMatrix}
      isLoadingInterviewMatrix={false}
    />
  );
}