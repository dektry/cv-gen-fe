import { useSelector } from 'react-redux';
import { AsyncThunk } from '@reduxjs/toolkit';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'antd';

import { employeesSelector } from 'store/reducers/employees';
import { saveChangesToEmployee, loadEmployee } from 'store/reducers/employees/thunks';

import { IEmployee } from 'models/IEmployee';
import { IProject, IProjectFromDB } from 'models/IProject';
import { CVGenerationInfo } from 'Pages/CVGeneration/components/CVGenerationInfo';
import { CVPreview } from 'Pages/CVGeneration/components/CVPreview';
import { CVGenerationHeader } from 'Pages/CVGeneration/components/CVGenerationHeader';
import { ProfSkills } from 'Pages/CVGeneration/components/ProfSkiils';
import { Projects } from 'common-components/Projects';

import { useStyles } from './styles';
import { useAppDispatch } from 'store';
import { profSkillsSelector, resetCvGeneration } from 'store/reducers/cvGeneration';
import { fetchProfSkills } from 'store/reducers/cvGeneration/thunks';
import { projectsSelector } from 'store/reducers/projects';
import { getProjectsList, TUpdateProjectListPayload } from 'store/reducers/projects/thunks';
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
import { IEducation } from 'models/IEducation';
import { ILanguage } from 'models/ILanguage';

import { Spinner } from 'common-components/Spinner';

export type TProfSkill = {
  groupName?: string;
  skills: { name: string; level: string }[];
};

export type CvInfo = Pick<IEmployee, 'level' | 'yearsOfExperience' | 'position' | 'avatarUrl'> & {
  description: string;
  education: IEducation[];
  languages: string[];
  softSkills: string[];
  profSkills: TProfSkill[];
  projects?: IProject[];
  firstName: string;
  male: boolean;
};

export const CVGenerationPage = React.memo(() => {
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const { id } = useParams<{ id: string }>();

  const { currentEmployee, isLoadingOneEmployee } = useSelector(employeesSelector);

  const { projects } = useSelector(projectsSelector);
  const { data: profSkills, isLoading } = useSelector(profSkillsSelector);
  const { skills, skillsOfEmployee } = useSelector(softSkillsToCvSelector);
  const { education } = useSelector(educationSelector);
  const { languages } = useSelector(languagesSelector);

  const [cvInfo, setCvInfo] = useState<CvInfo>({} as CvInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(loadEmployee(id));
    }
  }, []);

  useEffect(() => {
    const { position, yearsOfExperience } = currentEmployee;

    setCvInfo({
      ...currentEmployee,
      firstName: currentEmployee.fullName.split(' ')[1],
      position: position?.split(' –– ')[0] || '',
      yearsOfExperience,
      softSkills: skillsOfEmployee,
      description: currentEmployee?.description || '',
      male: currentEmployee.gender === 'male',
      projects,
      languages: languages.map((el) => `${el.value} - ${el.level}`),
      education,
      profSkills,
    });
  }, [currentEmployee, profSkills, skillsOfEmployee, education, projects]);

  useEffect(() => {
    if (id) {
      dispatch(fetchProfSkills(id));
      dispatch(getProjectsList(id));
      dispatch(getSoftSkillsToCvList({ query: '' }));
      dispatch(getSoftSkillsToCvOfEmployee(id));
      dispatch(getEducation(id));
      dispatch(getLanguages(id));
    }
    return () => {
      dispatch(resetCvGeneration());
    };
  }, []);

  const updateCvInfo = useCallback((fields: Partial<CvInfo>) => {
    setCvInfo((prev) => ({ ...prev, ...fields }));
  }, []);

  const tagsSearch = (value: string) => {
    dispatch(getSoftSkillsToCvList({ query: value }));
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
    if (id && cvInfo.softSkills) {
      const formattedEmployee = formatEmployeeBeforeUpdate(currentEmployee, cvInfo);

      dispatch(createSoftSkillsToCv({ skills: cvInfo.softSkills, employeeId: id }));
      dispatch(saveChangesToEmployee(formattedEmployee));
    }
  };

  const updateCvSoftSkills = useCallback((tags: string[]) => {
    dispatch(setSoftSkillsToCvOfEmployee(tags));
  }, []);

  const handleUpdateProject = useCallback(
    (dispatcher: AsyncThunk<void, TUpdateProjectListPayload, Record<string, never>>, project: IProject) => {
      if (id) {
        const projectToSave = projectFormatter(project, id);

        dispatch(dispatcher({ project: projectToSave, employeeId: id }));
      }
    },
    [projects]
  );

  const handleUpdateEducation = useCallback(
    (dispatcher: AsyncThunk<void, IEducation, Record<string, never>>, currEducation: IEducation) => {
      if (id) {
        const educationToSave: IEducation = {
          ...currEducation,
          employeeId: id,
        };
        dispatch(dispatcher(educationToSave)).then(() => dispatch(getEducation(id)));
        updateCvInfo({ education });
      }
    },
    [education]
  );

  const handleUpdateLanguage = useCallback(
    (dispatcher: AsyncThunk<void, ILanguage, Record<string, never>>, currentLanguage: ILanguage) => {
      if (id) {
        const languageToSave: ILanguage = {
          ...currentLanguage,
          employeeId: id,
        };
        dispatch(dispatcher(languageToSave)).then(() => dispatch(getLanguages(id)));
        const updatedLanguages = languages.map((el) => `${el.value} - ${el.level}`);
        updateCvInfo({ languages: updatedLanguages });
      }
    },
    [languages]
  );

  if (isLoadingOneEmployee) return <Spinner text={'Loading employee information...'} />;

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
        handleUpdateEducation={handleUpdateEducation}
        handleUpdateLanguage={handleUpdateLanguage}
        languages={languages}
        education={education}
        updateCvInfo={updateCvInfo}
      />
      <ProfSkills profSkills={cvInfo.profSkills} updateCvInfo={updateCvInfo} />
      <Projects employeeId={id} handleUpdateProject={handleUpdateProject} projects={cvInfo.projects || []} />
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
