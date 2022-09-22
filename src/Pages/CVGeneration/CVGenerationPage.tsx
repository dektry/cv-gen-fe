import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CVGenerationHeader } from './components/CVGenerationHeader/CVGenerationHeader';
import { employeesSelector } from '../../store/reducers/employees';
import routes from 'config/routes.json';
import CVGenerationInfo from './components/CVGenerationInfo';
import { IEmployee } from '../../models/IEmployee';
import { calcExperienceInYears } from './utils/calculateExperienceInYears';

type CvInfo = Pick<IEmployee, 'fullName' | 'level' | 'position' | 'formalEducation' | 'avatarUrl'> & {
  experience: number;
};

export const CVGenerationPage = () => {
  const navigate = useNavigate();

  const { currentEmployee } = useSelector(employeesSelector);

  const [cvInfo, setCvInfo] = useState<CvInfo>({} as CvInfo);
  const { avatarUrl, fullName, level, position, experience, formalEducation } = cvInfo;

  // todo: not the best way to check if employee is loaded
  // todo: after routing refactoring replace with more robust solution
  useEffect(() => {
    if (currentEmployee.id == '101010') {
      navigate(routes.generateCVemployeesList);
    } else {
      const { avatarUrl, fullName, level, position, formalEducation, startingPoint, hiredOn } = currentEmployee;

      setCvInfo({
        avatarUrl,
        fullName,
        level,
        position,
        experience: calcExperienceInYears(startingPoint || hiredOn),
        formalEducation,
      });
    }
  }, []);

  return (
    <div>
      <CVGenerationHeader avatarUrl={avatarUrl}></CVGenerationHeader>
      <CVGenerationInfo
        fullName={fullName}
        level={level}
        position={position}
        experience={experience}
        education={formalEducation}
      ></CVGenerationInfo>
    </div>
  );
};
