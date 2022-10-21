import { useSelector } from 'react-redux';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { throttle } from 'lodash';

import { employeesSelector, saveChangesToEmployee } from 'store/reducers/employees';
import routes from 'config/routes.json';
import { IEmployee } from 'models/IEmployee';
import { NullableField } from 'models/TNullableField';
import { IProject } from 'models/IProject';
import { CVGenerationInfo } from 'Pages/CVGeneration/components/CVGenerationInfo';
import { calcExperienceInYears } from 'Pages/CVGeneration/utils/calculateExperienceInYears';
import { CVPreview } from 'Pages/CVGeneration/components/CVPreview';
import { CVGenerationHeader } from 'Pages/CVGeneration/components/CVGenerationHeader';
import { ProfSkills } from 'Pages/CVGeneration/components/ProfSkiils';
import { Projects } from 'common-components/Projects';

import { useStyles } from './styles';
import { useAppDispatch } from 'store';
import { profSkillsSelector, resetCvGeneration } from 'store/reducers/cvGeneration';
import { fetchProfSkills } from 'store/reducers/cvGeneration/thunks';
import { projectsSelector } from 'store/reducers/projects';
import { getProjectsList, createProject, editProject } from 'store/reducers/projects/thunks';
import { projectFormatter } from 'Pages/GenerateCV/ChoosePerson/Employee/utils/helpers/projectFormatter';
import { softSkillsToCvSelector } from 'store/reducers/softSkillsToCV';
import {
  getSoftSkillsToCvList,
  getSoftSkillsToCvOfEmployee,
  createSoftSkillsToCv,
} from 'store/reducers/softSkillsToCV/thunks';

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
  softSkills: string[];
  profSkills: TProfSkill[];
  projects?: TProject[];
  firstName: string;
  male: boolean;
};

export const CVGenerationPage = React.memo(() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const { currentEmployee } = useSelector(employeesSelector);

  const { projects } = useSelector(projectsSelector);
  const { data: profSkills, isLoading } = useSelector(profSkillsSelector);
  const { skills, skillsOfEmployee } = useSelector(softSkillsToCvSelector);

  const [cvInfo, setCvInfo] = useState<CvInfo>({} as CvInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [softSkills, setSoftSkills] = useState(skillsOfEmployee);
  const [employeeDescription, setEmployeeDescription] = useState(currentEmployee?.description || '');

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
        softSkills: softSkills,
        // todo: add this field on BE side
        description: employeeDescription,
        male: currentEmployee.gender === 'male',
        projects,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        languages: ['English - B2', 'Russian - native'],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        education: [
          ['Belarusian State University of Informatics and Radioelectronics', 'Software Engineering', '2015-2019'],
          ['Belarusian National Technical University', 'Civil Engineering', '2010-2015'],
        ],
        profSkills,
      });
    }
  }, [profSkills, skillsOfEmployee]);

  useEffect(() => {
    if (currentEmployee.id) {
      dispatch(fetchProfSkills(currentEmployee.id));
      dispatch(getProjectsList(currentEmployee.id));
      dispatch(getSoftSkillsToCvList({ query: '' }));
      dispatch(getSoftSkillsToCvOfEmployee(currentEmployee.id));
    }
    return () => {
      dispatch(resetCvGeneration());
    };
  }, []);

  const updateCvInfo = useCallback(
    throttle((fields: Partial<CvInfo>) => {
      setCvInfo((prev) => ({ ...prev, ...fields }));
    }, 700),
    []
  );

  const handleSaveProject = useCallback(
    (project: IProject) => {
      if (currentEmployee.id) {
        const projectToSave = projectFormatter(project, currentEmployee.id);

        dispatch(createProject(projectToSave)).then(() => dispatch(getProjectsList(String(currentEmployee.id))));
      }
    },
    [projects]
  );

  const handleEditProject = useCallback(
    (project: IProject) => {
      if (currentEmployee.id) {
        const projectToSave = projectFormatter(project, currentEmployee.id);

        dispatch(editProject(projectToSave)).then(() => dispatch(getProjectsList(String(currentEmployee.id))));
      }
    },
    [projects]
  );

  const tagsSearch = (value: string) => {
    dispatch(getSoftSkillsToCvList({ query: value }));
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
    if (currentEmployee.id && cvInfo.softSkills) {
      dispatch(createSoftSkillsToCv({ skills: cvInfo.softSkills, employeeId: currentEmployee.id }));
      dispatch(
        saveChangesToEmployee({
          ...currentEmployee,
          fullName: `${currentEmployee.fullName.split(' ')[0]} ${cvInfo.firstName}`,
          position: `${cvInfo.position} –– ${currentEmployee.position?.split(' –– ')[0] || ''}`,
          description: cvInfo.description,
        })
      );
    }
  };

  const updateCvSoftSkills = useCallback((tags: string[]) => {
    setSoftSkills(tags);
  }, []);

  const updateCvDescription = useCallback((value: string) => {
    setEmployeeDescription(value);
  }, []);

  return (
    <div>
      <CVGenerationHeader
        avatarUrl={cvInfo.avatarUrl}
        showCvPreview={handleModalOpen}
        disableCvGenBtn={isLoading}
      ></CVGenerationHeader>
      <CVGenerationInfo
        cvInfo={cvInfo}
        updateCvInfo={updateCvInfo}
        softSkillsOptions={skills}
        softSkillsOfEmployee={skillsOfEmployee}
        softSkillsSearch={tagsSearch}
        updateCvSoftSkills={updateCvSoftSkills}
        updateCvDescription={updateCvDescription}
        employeeDescription={employeeDescription}
      />
      <ProfSkills profSkills={cvInfo.profSkills} updateCvInfo={updateCvInfo} />
      <Projects
        employeeId={currentEmployee.id || ''}
        handleEditProject={handleEditProject}
        handleSaveProject={handleSaveProject}
      />
      <div className={classes.genCVbtnBlock}>
        <Button disabled={isLoading} size="large" type="primary" onClick={handleModalOpen}>
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
});
