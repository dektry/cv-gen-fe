import { useSelector } from 'react-redux';
import { AsyncThunk } from '@reduxjs/toolkit';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { throttle } from 'lodash';

import { employeesSelector, saveChangesToEmployee, setEmployee } from 'store/reducers/employees';
import routes from 'config/routes.json';
import { IEmployee } from 'models/IEmployee';
import { IProject, IProjectFromDB } from 'models/IProject';
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
import { getProjectsList } from 'store/reducers/projects/thunks';
import { projectFormatter } from 'Pages/GenerateCV/ChoosePerson/Employee/utils/helpers/projectFormatter';
import { setSoftSkillsToCvOfEmployee, softSkillsToCvSelector } from 'store/reducers/softSkillsToCV';
import {
  getSoftSkillsToCvList,
  getSoftSkillsToCvOfEmployee,
  createSoftSkillsToCv,
} from 'store/reducers/softSkillsToCV/thunks';
import { getEducation } from 'store/reducers/education/thunks';
import { educationSelector } from 'store/reducers/education';
import { getLanguages } from 'store/reducers/languages/thunks';
import { languagesSelector } from 'store/reducers/languages';
import { formatEmployeeBeforeUpdate } from './utils/formatEmployeeBeforeUpdate';
import { formatEducationBeforeCvGen } from './utils/formatEducationBeforeCvGen';
import { IEducation } from 'models/IEducation';
import { ILanguage } from 'models/ILanguage';

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
  education: IEducation[];
  languages: string[];
  softSkills: string[];
  profSkills: TProfSkill[];
  projects?: TProject[];
  firstName: string;
  male: boolean;
};

export type TextFieldOptions = 'firstName' | 'experience' | 'position' | 'level' | 'description';

export const CVGenerationPage = React.memo(() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const { currentEmployee } = useSelector(employeesSelector);

  const { projects } = useSelector(projectsSelector);
  const { data: profSkills, isLoading } = useSelector(profSkillsSelector);
  const { skills, skillsOfEmployee } = useSelector(softSkillsToCvSelector);
  const { education } = useSelector(educationSelector);
  const { languages } = useSelector(languagesSelector);

  const [cvInfo, setCvInfo] = useState<CvInfo>({} as CvInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // todo: not the best way to check if employee is loaded
  // todo: after routing refactoring replace with more robust solution
  useEffect(() => {
    if (!currentEmployee.id) {
      navigate(routes.generateCVemployeesList);
    } else {
      const { startingPoint, hiredOn, position } = currentEmployee;

      setCvInfo({
        ...currentEmployee,
        firstName: currentEmployee.fullName.split(' ')[1],
        position: position?.split(' –– ')[0] || '',
        experience: calcExperienceInYears(startingPoint || hiredOn),
        softSkills: skillsOfEmployee,
        // todo: add this field on BE side
        description: currentEmployee?.description || '',
        male: currentEmployee.gender === 'male',
        projects,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        languages: languages.map((el) => `${el.value} - ${el.level}`),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        education: formatEducationBeforeCvGen(education),
        profSkills,
      });
    }
  }, [profSkills, skillsOfEmployee, education]);

  useEffect(() => {
    if (currentEmployee.id) {
      dispatch(fetchProfSkills(currentEmployee.id));
      dispatch(getProjectsList(currentEmployee.id));
      dispatch(getSoftSkillsToCvList({ query: '' }));
      dispatch(getSoftSkillsToCvOfEmployee(currentEmployee.id));
      dispatch(getEducation(currentEmployee.id));
      dispatch(getLanguages(currentEmployee.id));
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

  const updateCvFields = useCallback((fields: Partial<CvInfo>) => {
    const key: TextFieldOptions = Object.keys(fields)[0] as TextFieldOptions;

    if (key === 'firstName') {
      const updatedEmployee: IEmployee = {
        ...currentEmployee,
        fullName: `${currentEmployee.fullName.split(' ')[0]} ${fields['firstName']}`,
      };

      dispatch(setEmployee(updatedEmployee));
    } else {
      const updatedEmployee: IEmployee = {
        ...currentEmployee,
        [`${Object.keys(fields)[0]}`]: fields[key],
      };

      dispatch(setEmployee(updatedEmployee));
    }
  }, []);

  const tagsSearch = (value: string) => {
    dispatch(getSoftSkillsToCvList({ query: value }));
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
    if (currentEmployee.id && cvInfo.softSkills) {
      const formattedEmployee = formatEmployeeBeforeUpdate(currentEmployee, cvInfo);

      dispatch(createSoftSkillsToCv({ skills: cvInfo.softSkills, employeeId: currentEmployee.id }));
      dispatch(saveChangesToEmployee(formattedEmployee));
    }
  };

  const updateCvSoftSkills = useCallback((tags: string[]) => {
    dispatch(setSoftSkillsToCvOfEmployee(tags));
  }, []);

  const handleUpdateProject = useCallback(
    (dispatcher: AsyncThunk<void, IProjectFromDB, Record<string, never>>, project: IProject) => {
      if (currentEmployee.id) {
        const projectToSave = projectFormatter(project, currentEmployee.id);

        dispatch(dispatcher(projectToSave)).then(() => dispatch(getProjectsList(String(currentEmployee.id))));
      }
    },
    [projects]
  );

  const handleUpdateEducation = useCallback(
    (dispatcher: AsyncThunk<void, IEducation, Record<string, never>>, currEducation: IEducation) => {
      if (currentEmployee?.id) {
        const educationToSave: IEducation = {
          ...currEducation,
          employeeId: currentEmployee?.id,
        };
        dispatch(dispatcher(educationToSave)).then(() => dispatch(getEducation(String(currentEmployee?.id))));
        updateCvInfo({ education });
      }
    },
    [education]
  );

  const handleUpdateLanguage = useCallback(
    (dispatcher: AsyncThunk<void, ILanguage, Record<string, never>>, currentLanguage: ILanguage) => {
      if (currentEmployee?.id) {
        const languageToSave: ILanguage = {
          ...currentLanguage,
          employeeId: currentEmployee?.id,
        };
        dispatch(dispatcher(languageToSave)).then(() => dispatch(getLanguages(String(currentEmployee?.id))));
        const updatedLanguages = languages.map((el) => `${el.value} - ${el.level}`);
        updateCvInfo({ languages: updatedLanguages });
      }
    },
    [languages]
  );

  return (
    <div>
      <CVGenerationHeader
        avatarUrl={cvInfo.avatarUrl}
        showCvPreview={handleModalOpen}
        disableCvGenBtn={isLoading}
      ></CVGenerationHeader>
      <CVGenerationInfo
        cvInfo={cvInfo}
        softSkillsOptions={skills}
        softSkillsOfEmployee={skillsOfEmployee}
        softSkillsSearch={tagsSearch}
        updateCvSoftSkills={updateCvSoftSkills}
        updateCvFields={updateCvFields}
        handleUpdateEducation={handleUpdateEducation}
        handleUpdateLanguage={handleUpdateLanguage}
        languages={languages}
        education={education}
      />
      <ProfSkills profSkills={cvInfo.profSkills} updateCvInfo={updateCvInfo} />
      <Projects employeeId={currentEmployee.id || ''} handleUpdateProject={handleUpdateProject} />
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
