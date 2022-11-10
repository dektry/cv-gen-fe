import { AsyncThunk } from '@reduxjs/toolkit';
import { Typography } from 'antd';
import { TextField } from '@mui/material';

import { Form, Formik } from 'formik';

import { CvInfo } from 'Pages/CVGeneration/CVGenerationPage';
import { useStyles } from 'Pages/CVGeneration/components/CVGenerationInfo/styles';
import { TagsInput } from 'common-components/TagsInput';
import { Education } from 'common-components/Education';
import { Languages } from 'common-components/Languages';
import { ProfSkills } from 'Pages/CVGeneration/components/ProfSkiils';
import { Projects } from 'common-components/Projects';

import { IEducation } from 'models/IEducation';
import { ILanguage } from 'models/ILanguage';

const { Title } = Typography;

interface CVGenerationInfoProps {
  cvInfo: Partial<CvInfo>;
  softSkillsOptions: string[];
  softSkillsSearch: (value: string) => void;
  updateCvSoftSkills: (tags: string[]) => void;
  softSkillsOfEmployee: string[];
  handleUpdateEducation: (
    dispatcher: AsyncThunk<void, IEducation, Record<string, never>>,
    currEducation: IEducation
  ) => void;
  handleUpdateLanguage: (
    dispatcher: AsyncThunk<void, ILanguage, Record<string, never>>,
    currentLanguage: ILanguage
  ) => void;
  languages: ILanguage[] | [];
  education: IEducation[] | [];
  updateCvInfo: (fields: Partial<CvInfo>) => void;
  employeeId: string;
}

export const CVGenerationInfo = (props: CVGenerationInfoProps) => {
  const {
    cvInfo,
    softSkillsOptions,
    softSkillsSearch,
    updateCvSoftSkills,
    softSkillsOfEmployee,
    handleUpdateEducation,
    handleUpdateLanguage,
    languages,
    education,
    updateCvInfo,
    employeeId,
  } = props;
  const { firstName, level, position, yearsOfExperience, description } = cvInfo;

  const classes = useStyles();

  return (
    <Formik initialValues={cvInfo} onSubmit={(values) => console.log(values)}>
      {({ values, handleChange }) => {
        return (
          <Form>
            <div className={classes.row}>
              <TextField
                name="firstName"
                label={'Name'}
                placeholder={'Name'}
                onChange={(e) => updateCvInfo({ firstName: e.target.value })}
                value={values.firstName || ''}
              />
              <TextField
                name="yearsOfExperience"
                label={'Experience'}
                placeholder={'years'}
                type="number"
                onChange={(e) => updateCvInfo({ yearsOfExperience: Number(e.target.value) })}
                value={!!values.yearsOfExperience ? yearsOfExperience : ''}
              />
            </div>
            <div className={classes.row}>
              <TextField
                name="position"
                label={'Position'}
                placeholder={'Position'}
                onChange={(e) => updateCvInfo({ position: e.target.value })}
                value={values.position || ''}
              />
              <TextField
                name="level"
                placeholder={'Level'}
                label={'Level'}
                onChange={(e) => updateCvInfo({ level: e.target.value })}
                value={values.level || ''}
              />
            </div>
            <div className={classes.row}>
              <TextField
                name="description"
                multiline={true}
                label={'Description'}
                placeholder={'Description'}
                onChange={(e) => updateCvInfo({ description: e.target.value })}
                value={values.description}
              />
            </div>{' '}
            <div className={classes.row}>
              <Languages handleUpdateLanguage={handleUpdateLanguage} languages={values.languages || []} />
            </div>
            <div className={classes.row}>
              <Education education={values.education} handleUpdateEducation={handleUpdateEducation} />
            </div>
            <div className={classes.row}>
              <div className={classes.softSkillsSelect}>
                <Title level={5}>Soft skills</Title>
                {/* <TagsInput
            updateTags={updateCvSoftSkills}
            value={softSkillsOptions}
            skills={softSkillsOfEmployee}
            onSearch={softSkillsSearch}
            key={JSON.stringify(softSkillsOfEmployee)}
          /> */}
              </div>
            </div>
            <ProfSkills profSkills={cvInfo.profSkills || []} />
            <Projects employeeId={employeeId} projects={cvInfo.projects || []} />
          </Form>
        );
      }}
    </Formik>
  );
};
