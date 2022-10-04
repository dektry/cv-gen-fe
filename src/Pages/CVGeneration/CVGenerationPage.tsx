import { useSelector } from 'react-redux';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

import { employeesSelector } from 'store/reducers/employees';
import routes from 'config/routes.json';
import { IEmployee } from 'models/IEmployee';
import { NullableField } from 'models/TNullableField';
import { CVGenerationInfo, SoftSkills } from 'Pages/CVGeneration/components/CVGenerationInfo';
import { useStyles } from 'Pages/CVGeneration/styles';
import { calcExperienceInYears } from 'Pages/CVGeneration/utils/calculateExperienceInYears';
import { CVPreview } from 'Pages/CVGeneration/components/CVPreview';
import { CVGenerationHeader } from 'Pages/CVGeneration/components/CVGenerationHeader';
import { mockDescription, mockSoftSkillsOptions } from './mocks';

export type TProfSkill = {
  groupName: string;
  skills: { name: string; level: string }[];
};

export type TProject = {
  name: string;
  description: string;
  duration: string;
  position: string;
  teamSize: number;
  responsibilities: string[];
  tools: string[];
};

export type CvInfo = Pick<IEmployee, 'fullName' | 'level' | 'position' | 'avatarUrl'> & {
  experience: number;
  description: string;
  education: NullableField<string>;
  softSkills: SoftSkills[];
  profSkills?: TProfSkill[];
  projects?: TProject[];
};

export const CVGenerationPage = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  const { currentEmployee } = useSelector(employeesSelector);

  const [cvInfo, setCvInfo] = useState<CvInfo>({} as CvInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // todo: not the best way to check if employee is loaded
  // todo: after routing refactoring replace with more robust solution
  useEffect(() => {
    if (currentEmployee.id == '101010') {
      navigate(routes.generateCVemployeesList);
    } else {
      const { startingPoint, hiredOn, formalEducation, position } = currentEmployee;

      setCvInfo({
        ...currentEmployee,
        position: position?.split(' –– ')[0] || '',
        experience: calcExperienceInYears(startingPoint || hiredOn),
        education: formalEducation,
        softSkills: ['Responsibility', 'Teamwork', 'Communication'],
        // todo: add this field on BE side
        description: mockDescription,
      });
    }
  }, []);

  const updateCvInfo = useCallback((fields: Partial<CvInfo>) => {
    setCvInfo((prev) => ({ ...prev, ...fields }));
  }, []);

  return (
    <div>
      <CVGenerationHeader avatarUrl={cvInfo.avatarUrl} showCvPreview={() => setIsModalOpen(true)}></CVGenerationHeader>
      <CVGenerationInfo
        cvInfo={cvInfo}
        updateCvInfo={updateCvInfo}
        softSkillsOptions={mockSoftSkillsOptions}
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
        cvInfo={cvInfo}
      ></CVPreview>
    </div>
  );
};
