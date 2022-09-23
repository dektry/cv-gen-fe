import { useSelector } from 'react-redux';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

import { CVGenerationHeader } from './components/CVGenerationHeader/CVGenerationHeader';
import { employeesSelector } from '../../store/reducers/employees';
import routes from 'config/routes.json';
import CVGenerationInfo from './components/CVGenerationInfo';
import { IEmployee } from '../../models/IEmployee';
import { calcExperienceInYears } from './utils/calculateExperienceInYears';
import { NullableField } from '../../models/TNullableField';
import { SoftSkills } from './components/CVGenerationInfo/CVGenerationInfo';
import { useStyles } from './styles';
import { CVPreview } from './components/CVPreview/CVPreview';

type CvInfo = Pick<IEmployee, 'fullName' | 'level' | 'position' | 'avatarUrl'> & {
  experience: number;
  description: string;
  education: NullableField<string>;
  softSkills: SoftSkills[];
};

export const CVGenerationPage = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  const { currentEmployee } = useSelector(employeesSelector);

  const [cvInfo, setCvInfo] = useState<CvInfo>({} as CvInfo);
  const { avatarUrl, fullName, level, position, experience, education, description, softSkills } = cvInfo;

  const [isModalOpen, setIsModalOpen] = useState(false);

  // todo: not the best way to check if employee is loaded
  // todo: after routing refactoring replace with more robust solution
  useEffect(() => {
    if (currentEmployee.id == '101010') {
      navigate(routes.generateCVemployeesList);
    } else {
      const { avatarUrl, fullName, level, position, startingPoint, hiredOn, formalEducation } = currentEmployee;

      setCvInfo({
        avatarUrl,
        fullName,
        level,
        position,
        experience: calcExperienceInYears(startingPoint || hiredOn),
        education: formalEducation,
        softSkills: ['Responsibility', 'Teamwork', 'Communication'],
        // todo: add this field on BE side
        description: '',
      });
    }
  }, []);

  const updateCvInfo = useCallback((fields: Partial<CvInfo>) => {
    setCvInfo((prev) => ({ ...prev, ...fields }));
  }, []);

  return (
    <div>
      <CVGenerationHeader avatarUrl={avatarUrl} showCvPreview={() => setIsModalOpen(true)}></CVGenerationHeader>
      <CVGenerationInfo
        fullName={fullName}
        level={level}
        position={position}
        experience={experience}
        education={education}
        description={description}
        softSkills={softSkills}
        updateCvInfo={updateCvInfo}
      ></CVGenerationInfo>
      {/* coming later */}
      {/*  <ProfessionalSkills></ProfessionalSkills> */}
      {/*  <Projects></Projects> */}
      <div className={classes.genCVbtnBlock}>
        <Button size="large" type="primary" onClick={() => setIsModalOpen(true)}>
          Generate CV
        </Button>
      </div>
      <CVPreview
        isModalOpen={isModalOpen}
        handleOk={() => setIsModalOpen(false)}
        handleCancel={() => setIsModalOpen(false)}
      ></CVPreview>
    </div>
  );
};
