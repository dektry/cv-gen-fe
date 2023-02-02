import { useSelector } from 'react-redux';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'antd';

import FormControl from '@mui/material/FormControl';

import { useForm, useWatch, FormProvider } from 'react-hook-form';

import { employeesSelector } from 'store/reducers/employees';
import { saveChangesToEmployee, loadEmployee } from 'store/reducers/employees/thunks';

import { IEmployee } from 'models/IEmployee';
import { IProject } from 'models/IProject';
import { CVPreview } from 'Pages/CVGeneration/components/CVPreview';
import { CVGenerationHeader } from 'Pages/CVGeneration/components/CVGenerationHeader';
import { ProfSkills } from 'Pages/CVGeneration/components/ProfSkiils';
import { Projects } from 'common-components/Projects';
import { CVGenerationInfo } from './components/CVGenerationInfo';
import { useStyles } from './styles';
import { useAppDispatch } from 'store';
import { profSkillsSelector, resetCvGeneration } from 'store/reducers/cvGeneration';
import { fetchProfSkills } from 'store/reducers/cvGeneration/thunks';
import { projectsSelector } from 'store/reducers/projects';
import { createProject, editProject, getProjectsList } from 'store/reducers/projects/thunks';
import { setSoftSkillsToCvOfEmployee, softSkillsToCvSelector } from 'store/reducers/softSkillsToCV';
import { setIsCVGenerationPage } from 'store/reducers/techAssessment';
import { positionsSelector, loadPositions } from 'store/reducers/positions';
import { levelsSelector, loadLevels } from 'store/reducers/levels';
import {
  getSoftSkillsToCvList,
  getSoftSkillsToCvOfEmployee,
  createSoftSkillsToCv,
} from 'store/reducers/softSkillsToCV/thunks';
import { createEducation, editEducation, getEducation } from 'store/reducers/education/thunks';
import { educationSelector } from 'store/reducers/education';
import { createLanguage, editLanguage, getLanguages } from 'store/reducers/languages/thunks';
import { languagesSelector } from 'store/reducers/languages';
import { formatEmployeeBeforeUpdate } from './utils/formatEmployeeBeforeUpdate';
import { formatProfSkillsBeforeUpdate } from './utils/formatProfSkillsBeforeUpdate';
import { IEducation } from 'models/IEducation';
import { ILanguage } from 'models/ILanguage';

import { SaveButton } from 'common-components/SaveButton';

import { Spinner } from 'common-components/Spinner';

import { projectFormatter } from 'Pages/GenerateCV/ChoosePerson/Employee/utils/helpers/projectFormatter';
import { editTechAssessment } from 'store/reducers/techAssessment/thunks';
import { IAssessmentDetailedResult } from 'models/ITechAssessment';

export type TProfSkill = {
  groupName?: string;
  skills: { id: string; name: string; level: string; gradeId: string; gradeValue: string }[];
};

export type CvInfo = Pick<IEmployee, 'level' | 'yearsOfExperience' | 'position' | 'avatarUrl'> & {
  description: string;
  education: IEducation[];
  languages: ILanguage[];
  softSkills: string[];
  profSkills: TProfSkill[];
  projects?: IProject[];
  firstName: string;
  male: boolean;
};

export const CVGenerationPage = React.memo(() => {
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { currentEmployee, isLoadingOneEmployee } = useSelector(employeesSelector);

  const { projects, isLoading: projectsIsLoading } = useSelector(projectsSelector);
  const { data: profSkills, isLoading, lastAssessment } = useSelector(profSkillsSelector);
  const { skills, skillsOfEmployee } = useSelector(softSkillsToCvSelector);
  const { education } = useSelector(educationSelector);
  const { languages } = useSelector(languagesSelector);

  const [cvInfo, setCvInfo] = useState<CvInfo>({} as CvInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const methods = useForm<CvInfo>({
    defaultValues: cvInfo,
  });

  const values = useWatch<CvInfo>({ control: methods.control });

  useEffect(() => {
    if (id) {
      dispatch(loadEmployee(id));
    }
    dispatch(setIsCVGenerationPage(true));
    dispatch(loadPositions());
    dispatch(loadLevels());
  }, []);

  const { allLevels } = useSelector(levelsSelector);
  const { allPositions } = useSelector(positionsSelector);

  const currentLevel = allLevels.find((el) => el.name === currentEmployee.level);
  const currentPosition = allPositions.find((el) => currentEmployee.position?.replace(/-/g, ' ').match(el.name));

  useEffect(() => {
    const { position, yearsOfExperience } = currentEmployee;

    setCvInfo({
      ...currentEmployee,
      position: position?.split(' –– ')[0] || '',
      yearsOfExperience,
      softSkills: skillsOfEmployee,
      description: currentEmployee?.description || '',
      male: currentEmployee.gender === 'male',
      projects,
      languages: languages,
      education,
      profSkills,
    });
  }, [currentEmployee, profSkills, skillsOfEmployee, education, projects]);

  useEffect(() => {
    const defaultValues = cvInfo;
    methods.reset({ ...defaultValues });
  }, [cvInfo]);

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

  const tagsSearch = (value: string) => {
    dispatch(getSoftSkillsToCvList({ query: value }));
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const updateCvSoftSkills = useCallback((tags: string[]) => {
    dispatch(setSoftSkillsToCvOfEmployee(tags));
  }, []);

  const handleSubmit = useCallback(() => {
    if (id && values.softSkills) {
      const formattedEmployee = formatEmployeeBeforeUpdate(currentEmployee, values);

      dispatch(createSoftSkillsToCv({ skills: values.softSkills, employeeId: id }));
      dispatch(saveChangesToEmployee(formattedEmployee));
    }

    if (id && values.projects) {
      for (const project of values.projects) {
        const projectToSave = projectFormatter(project, id);
        projectToSave.id ? dispatch(editProject(projectToSave)) : dispatch(createProject(projectToSave));
      }
    }

    if (values.education && id) {
      for (const ed of values.education) {
        const edToSave = {
          ...ed,
          employeeId: id,
        };
        edToSave.id ? dispatch(editEducation(edToSave)) : dispatch(createEducation(edToSave));
      }
    }

    if (values.languages && id) {
      for (const lang of values.languages) {
        const langToSave = {
          ...lang,
          employeeId: id,
        };
        langToSave.id ? dispatch(editLanguage(langToSave)) : dispatch(createLanguage(langToSave));
      }
    }

    if (values.profSkills && id && lastAssessment) {
      const formattedProfSkills = formatProfSkillsBeforeUpdate({
        profSkills: values.profSkills as TProfSkill[],
        assessmentResult: lastAssessment as IAssessmentDetailedResult,
        employeeId: id as string,
        positionId: currentPosition?.id || '',
        levelId: currentLevel?.id || '',
      });
      dispatch(editTechAssessment({ assessment: formattedProfSkills, id: lastAssessment?.id as string })).then((r) => {
        if (r.type.includes('fulfilled')) {
          navigate('/');
        }
      });
    }
  }, [values]);

  if (isLoadingOneEmployee) return <Spinner text={'Loading employee information...'} />;

  const isLoadingCVGenerateBtn = isLoading || projectsIsLoading;

  return (
    <FormProvider {...methods}>
      <FormControl className={classes.container}>
        <CVGenerationHeader
          avatarUrl={cvInfo.avatarUrl}
          showCvPreview={handleModalOpen}
          isLoadingCVGenerateBtn={isLoadingCVGenerateBtn}
        ></CVGenerationHeader>
        <CVGenerationInfo
          softSkillsOptions={skills}
          softSkillsOfEmployee={skillsOfEmployee}
          softSkillsSearch={tagsSearch}
          updateCvSoftSkills={updateCvSoftSkills}
        />
        <ProfSkills />
        <Projects />
        <div className={classes.genCVbtnBlock}>
          <SaveButton error={false} title={'SAVE CHANGES'} handleClickOkButton={() => handleSubmit()} />
          <Button loading={isLoadingCVGenerateBtn} size="large" type="primary" onClick={handleModalOpen}>
            Generate CV
          </Button>
        </div>
        <CVPreview
          isModalOpen={isModalOpen}
          handleOk={() => setIsModalOpen(false)}
          handleCancel={() => setIsModalOpen(false)}
          cvInfo={values}
        ></CVPreview>
      </FormControl>
    </FormProvider>
  );
});
