import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { CVGenerationHeader } from './components/CVGenerationHeader/CVGenerationHeader';
import { employeesSelector } from '../../store/reducers/employees';
import routes from 'config/routes.json';

export const CVGenerationPage = () => {
  const navigate = useNavigate();

  const { currentEmployee } = useSelector(employeesSelector);
  const { avatarUrl } = currentEmployee;

  // todo: not the best way to check if employee is loaded
  // todo: after routing refactoring replace with more robust solution
  useEffect(() => {
    if (currentEmployee.id == '101010') {
      navigate(routes.generateCVemployeesList);
    }
  });

  return (
    <div>
      <CVGenerationHeader avatarUrl={avatarUrl}></CVGenerationHeader>
    </div>
  );
};
