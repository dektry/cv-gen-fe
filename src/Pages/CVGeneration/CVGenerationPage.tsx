import { useSelector } from 'react-redux';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

import { employeesSelector } from 'store/reducers/employees';
import routes from 'config/routes.json';
import { IEmployee } from 'models/IEmployee';
import { NullableField } from 'models/TNullableField';
import { CVGenerationInfo, SoftSkills } from 'Pages/CVGeneration/components/CVGenerationInfo';
import { calcExperienceInYears } from 'Pages/CVGeneration/utils/calculateExperienceInYears';
import { CVPreview } from 'Pages/CVGeneration/components/CVPreview';
import { CVGenerationHeader } from 'Pages/CVGeneration/components/CVGenerationHeader';
import { ProfSkills } from 'Pages/CVGeneration/components/ProfSkiils';

import { useStyles } from './styles';
import { mockDescription, mockProjects, mockSoftSkillsOptions, profSkillsMock } from './mocks';

export type TProfSkill = {
  groupName?: string;
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

export type CvInfo = Pick<IEmployee, 'level' | 'position' | 'avatarUrl'> & {
  experience: number;
  description: string;
  education: NullableField<string>;
  softSkills: SoftSkills[];
  profSkills: TProfSkill[];
  projects?: TProject[];
  firstName: string;
  male: boolean;
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
      const { startingPoint, hiredOn, position } = currentEmployee;

      setCvInfo({
        ...currentEmployee,
        firstName: currentEmployee.fullName.split(' ')[1],
        position: position?.split(' –– ')[0] || '',
        experience: calcExperienceInYears(startingPoint || hiredOn),
        softSkills: ['Responsibility', 'Teamwork', 'Communication'],
        // todo: add this field on BE side
        description: mockDescription,
        male: currentEmployee.gender === 'male',
        projects: mockProjects,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        languages: ['English - B2', 'Russian - native'],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        education: [
          ['Belarusian State University of Informatics and Radioelectronics', 'Software Engineering', '2015-2019'],
          ['Belarusian National Technical University', 'Civil Engineering', '2010-2015'],
        ],
        profSkills: profSkillsMock,
      });
    }
  }, []);

  const updateCvInfo = useCallback((fields: Partial<CvInfo>) => {
    setCvInfo((prev) => ({ ...prev, ...fields }));
  }, []);

  return (
    <div>
      <CVGenerationHeader avatarUrl={cvInfo.avatarUrl} showCvPreview={() => setIsModalOpen(true)}></CVGenerationHeader>
      <CVGenerationInfo cvInfo={cvInfo} updateCvInfo={updateCvInfo} softSkillsOptions={mockSoftSkillsOptions} />
      <ProfSkills profSkills={cvInfo.profSkills} updateCvInfo={updateCvInfo} />
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
